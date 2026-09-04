-- Run this if profiles table already exists without the admin role

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('candidate', 'employer', 'admin'));

-- Promote an existing user to super admin (replace email)
-- UPDATE profiles SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@example.com');
