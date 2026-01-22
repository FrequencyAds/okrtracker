-- This script reassigns all demo data to a real authenticated user
-- Replace 'YOUR_ACTUAL_USER_EMAIL' with your authenticated email
-- Replace 'YOUR_AUTH_USER_ID' with your Supabase auth user ID

-- First, get your user ID by running this query:
-- SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- Then update this variable with your actual user ID:
-- \set auth_user_id 'paste-your-actual-uuid-here'

-- Update the user in the users table
UPDATE users
SET id = :'auth_user_id', email = 'your-email@example.com'
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Update all objectives to the new user
UPDATE objectives
SET user_id = :'auth_user_id'
WHERE user_id = '00000000-0000-0000-0000-000000000001';

-- Update all people to the new user
UPDATE people
SET user_id = :'auth_user_id'
WHERE user_id = '00000000-0000-0000-0000-000000000001';
