-- SkillBridge LK — Database Schema
-- Run this in the Supabase SQL Editor

-- Profiles (linked to Supabase Auth)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('candidate', 'employer', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Candidate profiles
CREATE TABLE candidate_profiles (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    user_type TEXT NOT NULL,
    education_level TEXT,
    field_of_study TEXT,
    location TEXT,
    preferred_work_mode TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE
);

-- Employers
CREATE TABLE employers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    business_category TEXT,
    description TEXT,
    location TEXT,
    contact_email TEXT,
    phone TEXT
);

-- Skills
CREATE TABLE skills (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Candidate skills (M:N)
CREATE TABLE candidate_skills (
    user_id UUID REFERENCES candidate_profiles(user_id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, skill_id)
);

-- Jobs
CREATE TABLE jobs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employer_id BIGINT NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    job_type TEXT NOT NULL,
    location TEXT,
    work_mode TEXT,
    minimum_education TEXT,
    deadline DATE,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Job skills (M:N)
CREATE TABLE job_skills (
    job_id BIGINT REFERENCES jobs(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (job_id, skill_id)
);

-- Applications
CREATE TABLE applications (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id BIGINT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES candidate_profiles(user_id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'APPLIED',
    message TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(job_id, candidate_id)
);

-- Auto-create profile on signup (run after enabling auth)
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

  -- Create role-specific profile row
  IF user_role = 'candidate' THEN
    INSERT INTO public.candidate_profiles (user_id, user_type, onboarding_completed)
    VALUES (NEW.id, 'Pending onboarding', FALSE);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
