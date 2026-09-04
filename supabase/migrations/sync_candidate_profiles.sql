-- Backfill candidate_profiles for users who only have a profiles row.
-- Also updates the signup trigger for new registrations.

-- 1. Backfill existing candidates
INSERT INTO candidate_profiles (user_id, user_type, onboarding_completed)
SELECT p.id, 'Pending onboarding', FALSE
FROM profiles p
WHERE p.role = 'candidate'
  AND NOT EXISTS (
    SELECT 1 FROM candidate_profiles cp WHERE cp.user_id = p.id
  );

-- 2. Update trigger so new signups get candidate_profiles automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
BEGIN
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'candidate');

  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    user_role
  );

  IF user_role = 'candidate' THEN
    INSERT INTO public.candidate_profiles (user_id, user_type, onboarding_completed)
    VALUES (NEW.id, 'Pending onboarding', FALSE);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. RLS so candidates can read/update their own candidate_profiles row
ALTER TABLE candidate_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Candidates can read own profile" ON candidate_profiles;
DROP POLICY IF EXISTS "Candidates can insert own profile" ON candidate_profiles;
DROP POLICY IF EXISTS "Candidates can update own profile" ON candidate_profiles;

CREATE POLICY "Candidates can read own profile"
  ON candidate_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Candidates can insert own profile"
  ON candidate_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Candidates can update own profile"
  ON candidate_profiles FOR UPDATE
  USING (auth.uid() = user_id);
