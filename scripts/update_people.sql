-- Soft delete all existing people
UPDATE people SET deleted_at = NOW() WHERE deleted_at IS NULL;

-- Insert new team members
INSERT INTO people (id, user_id, name, initials, color, created_at, updated_at) VALUES
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Colby', 'CB', 'bg-blue-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Carrie', 'CA', 'bg-emerald-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Chris', 'CH', 'bg-violet-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Sam', 'SM', 'bg-amber-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Jared', 'JD', 'bg-pink-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Awais', 'AW', 'bg-cyan-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Asim', 'AS', 'bg-rose-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Fahad', 'FH', 'bg-indigo-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Fabricio', 'FB', 'bg-teal-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Adnan', 'AD', 'bg-purple-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Flint', 'FL', 'bg-orange-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Pete', 'PT', 'bg-lime-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Dan', 'DN', 'bg-fuchsia-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Russell', 'RS', 'bg-sky-500', NOW(), NOW()),
  (gen_random_uuid(), '1538cb1e-c6fe-4c46-b1a8-f097b412c608', 'Ivana', 'IV', 'bg-red-500', NOW(), NOW());
