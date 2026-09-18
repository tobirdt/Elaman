-- The documents table was written expecting Vercel Blob, and the column was
-- named after it. The store is Neon Object Storage instead: same region as the
-- database, private buckets, S3-compatible, so the value is an S3 object key
-- and `object_key` is what it should be called. Nothing reads the column yet,
-- so this is the cheap moment to fix the name rather than leaving every future
-- reader to wonder which storage product it refers to.
--
-- Still not a URL: the file is handed out only through a short-lived presigned
-- link, generated per download.
alter table documents rename column blob_path to object_key;
