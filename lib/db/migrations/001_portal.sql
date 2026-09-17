-- The portal: accounts, sessions, released documents, and the record of who
-- did what. Everything a visitor of the public site can reach lives outside
-- this schema; nothing here is readable without a session.

create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create unique index companies_name_key on companies (lower(name));

-- An admin is an Elaman employee and belongs to no company; a customer always
-- belongs to exactly one, because a released document is released to a firm
-- rather than to a person. People change employer, the release should not
-- follow them.
create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  role text not null check (role in ('admin', 'customer')),
  company_id uuid references companies (id) on delete restrict,
  -- Null until the invitation is redeemed. Nobody, including an admin, ever
  -- sets another person's password.
  password_hash text,
  totp_secret text,
  totp_enrolled_at timestamptz,
  -- The last time step accepted for this user. A code stays valid for up to
  -- ninety seconds, so without this one could be presented twice.
  totp_last_step bigint,
  status text not null default 'invited' check (status in ('invited', 'active', 'disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz,
  constraint users_company_matches_role check (
    (role = 'admin' and company_id is null)
    or (role = 'customer' and company_id is not null)
  ),
  constraint users_active_has_credentials check (
    status <> 'active'
    or (password_hash is not null and totp_secret is not null and totp_enrolled_at is not null)
  )
);

create unique index users_email_key on users (lower(email));
create index users_company_idx on users (company_id);

-- One-time link that lets a person set their own password and enrol their
-- authenticator. Only the hash is stored, so a database copy does not hand
-- anyone a working invitation.
create table invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  redeemed_at timestamptz,
  created_at timestamptz not null default now(),
  created_by uuid references users (id) on delete set null
);

create index invitations_user_idx on invitations (user_id);

-- Sessions are opaque: the cookie carries random bytes, the table carries
-- their hash. Reading the table gets you nothing you could present.
create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  expires_at timestamptz not null,
  ip inet,
  user_agent text
);

create index sessions_user_idx on sessions (user_id);
create index sessions_expiry_idx on sessions (expires_at);

-- A request from the public site. Rejection is silent by decision, so an
-- outcome of 'rejected' sends no mail; the row stays as the record that the
-- request was seen and handled.
create table account_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now(),
  handled_at timestamptz,
  handled_by uuid references users (id) on delete set null,
  outcome text check (outcome in ('approved', 'rejected')),
  constraint account_requests_outcome_needs_handling check (
    (handled_at is null and outcome is null)
    or (handled_at is not null and outcome is not null)
  )
);

create index account_requests_open_idx on account_requests (created_at) where handled_at is null;

-- The file itself lives in private blob storage and is only ever handed out
-- through a short-lived signed link. `blob_path` is not a URL.
create table documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  language text not null check (language in ('de', 'en')),
  version text,
  document_date date,
  blob_path text not null unique,
  byte_size bigint not null check (byte_size > 0),
  content_type text not null,
  uploaded_by uuid references users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index documents_category_idx on documents (category);

-- Nothing is visible to a customer that is not released to their company.
-- There is no "visible to everyone" state on purpose.
create table document_releases (
  document_id uuid not null references documents (id) on delete cascade,
  company_id uuid not null references companies (id) on delete cascade,
  released_at timestamptz not null default now(),
  released_by uuid references users (id) on delete set null,
  primary key (document_id, company_id)
);

create index document_releases_company_idx on document_releases (company_id);

-- Append-only. Who signed in, who released what, who downloaded which file.
-- The actor may be deleted later; the entry stays and loses only the link.
create table audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor_user_id uuid references users (id) on delete set null,
  actor_email text,
  action text not null,
  subject_type text,
  subject_id text,
  ip inet,
  detail jsonb
);

create index audit_log_at_idx on audit_log (at desc);
create index audit_log_actor_idx on audit_log (actor_user_id, at desc);

-- Feeds the lockout. Kept separate from the audit log because it is noisy,
-- short-lived and queried on a hot path.
create table login_attempts (
  id bigint generated always as identity primary key,
  email text not null,
  at timestamptz not null default now(),
  ip inet,
  success boolean not null
);

create index login_attempts_email_idx on login_attempts (lower(email), at desc);
create index login_attempts_ip_idx on login_attempts (ip, at desc);
