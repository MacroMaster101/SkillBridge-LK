-- Create a super admin account
-- 1. Register a user via Supabase Auth (Dashboard → Authentication → Users → Add user)
--    Or sign up normally, then run step 2.
-- 2. Promote that user to admin:

UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'admin@example.com'
);

-- Verify:
-- SELECT p.full_name, p.role, u.email
-- FROM profiles p
-- JOIN auth.users u ON u.id = p.id
-- WHERE p.role = 'admin';
