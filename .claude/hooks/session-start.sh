#!/bin/bash
# SessionStart hook for Claude Code on the web.
# Installs dependencies and makes the pre-installed Chromium usable for the
# pinned Playwright version so lint, typecheck, build and e2e work immediately.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

npm ci --no-audit --no-fund

# Local env file for the dev server. The contact API fails safely without
# mail credentials; NEXT_PUBLIC_SITE_URL keeps canonical URLs correct.
if [ ! -f .env.local ]; then
  cp .env.example .env.local
fi

# Playwright: the container ships one Chromium build under
# PLAYWRIGHT_BROWSERS_PATH, and downloads are blocked. If the pinned
# Playwright version expects a different build number, expose the installed
# build under the expected directory layout instead of downloading.
browsers_dir="${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}"
if [ -d "$browsers_dir" ] && [ -f node_modules/playwright-core/browsers.json ]; then
  wanted="$(node -e 'const b=require("./node_modules/playwright-core/browsers.json").browsers;process.stdout.write(b.find(x=>x.name==="chromium").revision)')"
  # Only a real install has chrome-linux; mapped builds use chrome-linux64.
  have="$(ls -d "$browsers_dir"/chromium-[0-9]*/chrome-linux 2>/dev/null | sed 's|.*chromium-\([0-9]*\)/.*|\1|' | sort -n | tail -1 || true)"

  if [ -n "$wanted" ] && [ -n "$have" ] && [ "$wanted" != "$have" ]; then
    full_src="$browsers_dir/chromium-$have/chrome-linux"
    full_dst="$browsers_dir/chromium-$wanted/chrome-linux64"
    shell_src="$browsers_dir/chromium_headless_shell-$have/chrome-linux"
    shell_dst="$browsers_dir/chromium_headless_shell-$wanted/chrome-headless-shell-linux64"

    if [ -d "$full_src" ] && [ ! -e "$full_dst/chrome" ]; then
      mkdir -p "$full_dst"
      ln -sfn "$full_src"/* "$full_dst"/
    fi
    if [ -d "$shell_src" ] && [ ! -e "$shell_dst/chrome-headless-shell" ]; then
      mkdir -p "$shell_dst"
      ln -sfn "$shell_src"/* "$shell_dst"/
      ln -sfn "$shell_src/headless_shell" "$shell_dst/chrome-headless-shell"
    fi
    echo "Playwright: mapped installed Chromium $have to expected build $wanted"
  fi
fi

# Chromium's certificate trust. Outbound HTTPS goes through an intercepting
# proxy, and the container's CA bundle covers curl and Node but not Chromium:
# it reads user-added roots from the NSS database at ~/.pki/nssdb, which ships
# empty. Without this, any Playwright navigation to an external site fails with
# ERR_CERT_AUTHORITY_INVALID, so the live site and preview deployments cannot be
# checked in a browser, only localhost. Only the proxy's own CAs are added, and
# only as TLS server roots; the public roots in the bundle are Chromium's own
# business.
ca_bundle="${CLAUDE_CODE_CA_BUNDLE:-/root/.ccr/ca-bundle.crt}"
nssdb="$HOME/.pki/nssdb"

if [ -f "$ca_bundle" ] && ! certutil -L -d "sql:$nssdb" 2>/dev/null | grep -q "^Anthropic "; then
  if ! command -v certutil >/dev/null 2>&1; then
    apt-get install -y -q libnss3-tools >/dev/null 2>&1 ||
      { apt-get update -q >/dev/null 2>&1 &&
        apt-get install -y -q libnss3-tools >/dev/null 2>&1; } ||
      true
  fi

  if command -v certutil >/dev/null 2>&1; then
    mkdir -p "$nssdb"
    certutil -L -d "sql:$nssdb" >/dev/null 2>&1 ||
      certutil -N --empty-password -d "sql:$nssdb" >/dev/null 2>&1 || true

    added=0
    workdir="$(mktemp -d)"
    (cd "$workdir" &&
      csplit -z -s -f part- -b '%03d.pem' "$ca_bundle" '/BEGIN CERTIFICATE/' '{*}') 2>/dev/null || true

    for part in "$workdir"/part-*.pem; do
      [ -f "$part" ] || continue
      subject="$(openssl x509 -in "$part" -noout -subject 2>/dev/null || true)"
      case "$subject" in
        *"O = Anthropic"* | *"O=Anthropic"*) ;;
        *) continue ;;
      esac
      name="Anthropic ${subject##*CN = }"
      name="${name%%,*}"
      # "C,," trusts it for TLS server certificates and nothing else.
      certutil -A -n "$name" -t "C,," -i "$part" -d "sql:$nssdb" 2>/dev/null &&
        added=$((added + 1)) || true
    done

    rm -rf "$workdir"
    [ "$added" -gt 0 ] && echo "Chromium: trusted $added proxy CA(s) for external HTTPS"
  fi
fi
