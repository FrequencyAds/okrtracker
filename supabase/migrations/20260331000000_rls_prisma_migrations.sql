-- Enable RLS on _prisma_migrations to prevent PostgREST exposure.
-- No policies are added, so anon/authenticated roles cannot access it.
-- Prisma connects via the postgres role which bypasses RLS.
ALTER TABLE IF EXISTS public._prisma_migrations ENABLE ROW LEVEL SECURITY;
