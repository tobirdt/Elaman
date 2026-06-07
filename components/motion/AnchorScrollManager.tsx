"use client";

import { useEffect } from "react";

function scrollToHash(hash: string, replace = false) {
  const id = hash.replace("#", "");
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });

  if (replace) {
    history.replaceState(null, "", hash);
  } else {
    history.pushState(null, "", hash);
  }
}

export function AnchorScrollManager() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"], a[href^="/#"]',
      );

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      const hash = href?.startsWith("/#") ? href.slice(1) : href;

      if (!hash || hash === "#") {
        return;
      }

      event.preventDefault();
      scrollToHash(hash);

      anchor.closest("details")?.removeAttribute("open");
    }

    document.addEventListener("click", handleClick);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, true);
      });
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
