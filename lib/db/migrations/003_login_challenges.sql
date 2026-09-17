-- The gap between "the password was right" and "the authenticator was right".
--
-- This is a separate table rather than a flag on `sessions` on purpose. A
-- half-authenticated row in the session table is a row that some later query
-- will treat as a session, and the cost of that mistake is a signed-in user
-- who never proved their second factor. Here the mistake is not available:
-- nothing that reads sessions can see these rows, and nothing that reads these
-- rows can mistake one for a session.
--
-- Same token discipline as everywhere else: the browser holds random bytes,
-- the table holds their hash. Two minutes to type six digits is generous; the
-- row is consumed on success and useless afterwards either way.
create table login_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  consumed_at timestamptz,
  ip inet,
  user_agent text
);

create index login_challenges_user_idx on login_challenges (user_id);
create index login_challenges_expiry_idx on login_challenges (expires_at);
