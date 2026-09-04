-- Store candidate job-type preferences on the profile
ALTER TABLE candidate_profiles
ADD COLUMN IF NOT EXISTS preferred_job_types TEXT[] DEFAULT ARRAY[]::TEXT[];
