-- Seed sample employers and jobs (migrated from client demo data)
-- Run after schema.sql and seed.sql
-- Demo employer password (all accounts): SkillBridge123!

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  instance uuid := '00000000-0000-0000-0000-000000000000';
BEGIN
  IF EXISTS (SELECT 1 FROM jobs LIMIT 1) THEN
    RETURN;
  END IF;

  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES
    (instance, '11111111-1111-1111-1111-111111111101', 'authenticated', 'authenticated',
     'seed-pixel-lanka@skillbridge.lk', crypt('SkillBridge123!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}', '{"full_name":"Pixel Lanka","role":"employer"}', NOW(), NOW()),
    (instance, '11111111-1111-1111-1111-111111111102', 'authenticated', 'authenticated',
     'seed-creative-hub@skillbridge.lk', crypt('SkillBridge123!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}', '{"full_name":"Creative Hub","role":"employer"}', NOW(), NOW()),
    (instance, '11111111-1111-1111-1111-111111111103', 'authenticated', 'authenticated',
     'seed-grow-digital@skillbridge.lk', crypt('SkillBridge123!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}', '{"full_name":"Grow Digital","role":"employer"}', NOW(), NOW()),
    (instance, '11111111-1111-1111-1111-111111111104', 'authenticated', 'authenticated',
     'seed-abc-traders@skillbridge.lk', crypt('SkillBridge123!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}', '{"full_name":"ABC Traders","role":"employer"}', NOW(), NOW()),
    (instance, '11111111-1111-1111-1111-111111111105', 'authenticated', 'authenticated',
     'seed-island-connect@skillbridge.lk', crypt('SkillBridge123!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}', '{"full_name":"Island Connect","role":"employer"}', NOW(), NOW()),
    (instance, '11111111-1111-1111-1111-111111111106', 'authenticated', 'authenticated',
     'seed-ceylon-ledger@skillbridge.lk', crypt('SkillBridge123!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}', '{"full_name":"Ceylon Ledger","role":"employer"}', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO profiles (id, full_name, role)
  VALUES
    ('11111111-1111-1111-1111-111111111101', 'Pixel Lanka', 'employer'),
    ('11111111-1111-1111-1111-111111111102', 'Creative Hub', 'employer'),
    ('11111111-1111-1111-1111-111111111103', 'Grow Digital', 'employer'),
    ('11111111-1111-1111-1111-111111111104', 'ABC Traders', 'employer'),
    ('11111111-1111-1111-1111-111111111105', 'Island Connect', 'employer'),
    ('11111111-1111-1111-1111-111111111106', 'Ceylon Ledger', 'employer')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO employers (owner_id, company_name, business_category, location, contact_email)
  SELECT v.owner_id, v.company_name, v.business_category, v.location, v.contact_email
  FROM (VALUES
    ('11111111-1111-1111-1111-111111111101'::uuid, 'Pixel Lanka', 'Software / IT', 'Colombo', 'seed-pixel-lanka@skillbridge.lk'),
    ('11111111-1111-1111-1111-111111111102'::uuid, 'Creative Hub', 'Graphic Design', 'Kandy', 'seed-creative-hub@skillbridge.lk'),
    ('11111111-1111-1111-1111-111111111103'::uuid, 'Grow Digital', 'Marketing', 'Colombo', 'seed-grow-digital@skillbridge.lk'),
    ('11111111-1111-1111-1111-111111111104'::uuid, 'ABC Traders', 'Data Entry', 'Galle', 'seed-abc-traders@skillbridge.lk'),
    ('11111111-1111-1111-1111-111111111105'::uuid, 'Island Connect', 'Customer Service', 'Jaffna', 'seed-island-connect@skillbridge.lk'),
    ('11111111-1111-1111-1111-111111111106'::uuid, 'Ceylon Ledger', 'Accounting / Finance', 'Kurunegala', 'seed-ceylon-ledger@skillbridge.lk')
  ) AS v(owner_id, company_name, business_category, location, contact_email)
  WHERE NOT EXISTS (
    SELECT 1 FROM employers e WHERE e.owner_id = v.owner_id
  );

  INSERT INTO jobs (employer_id, title, description, category, job_type, location, work_mode, status)
  SELECT e.id, j.title, j.description, j.category, j.job_type, j.location, j.work_mode, 'ACTIVE'
  FROM (VALUES
    ('Pixel Lanka', 'Frontend Development Intern',
     'Build thoughtful web experiences with a small Sri Lankan software team. Put your frontend skills into practice, learn from code reviews, and contribute to real product features.

What you would be doing:
• Build responsive interfaces with React and CSS.
• Work with designers to turn ideas into usable features.
• Use Git to collaborate and participate in code reviews.',
     'Software / IT', 'Internship', 'Colombo', 'Hybrid'),
    ('Creative Hub', 'Junior Graphic Design Assistant',
     'Help a local creative studio bring brand stories to life. Explore social content, layouts, and visual design alongside a collaborative team.

What you would be doing:
• Create social media graphics and campaign layouts.
• Prepare design variations and incorporate feedback.
• Keep brand assets organized and consistent.',
     'Graphic Design', 'Part-time', 'Kandy', 'On-site'),
    ('Grow Digital', 'Digital Marketing Trainee',
     'Turn your interest in social media into practical marketing experience. Support small-business campaigns and learn how content reaches the right audience.

What you would be doing:
• Draft engaging content for social channels.
• Help plan and schedule campaign posts.
• Summarize engagement results with the team.',
     'Marketing', 'Trainee', 'Colombo', 'Remote'),
    ('ABC Traders', 'Data Entry Assistant',
     'Support the daily operations of a growing local trading business. This role suits an organized beginner who enjoys working with information.

What you would be doing:
• Update product and inventory spreadsheets.
• Check records for accuracy and missing information.
• Coordinate with the operations team on daily updates.',
     'Data Entry', 'Part-time', 'Galle', 'On-site'),
    ('Island Connect', 'Customer Support Associate',
     'Be a helpful first point of contact for customers. Develop your communication skills and learn how a local service business supports its community.

What you would be doing:
• Respond to customer questions clearly and respectfully.
• Maintain accurate records of support requests.
• Share recurring customer feedback with the team.',
     'Customer Service', 'Entry-level', 'Jaffna', 'Hybrid'),
    ('Ceylon Ledger', 'Accounts Assistant',
     'Take your first step into finance with a small accounting team. Apply your classroom knowledge to bookkeeping and everyday business records.

What you would be doing:
• Assist with invoices and expense records.
• Organize financial documents and spreadsheets.
• Support the team with basic reconciliations.',
     'Accounting / Finance', 'Full-time', 'Kurunegala', 'On-site')
  ) AS j(company_name, title, description, category, job_type, location, work_mode)
  JOIN employers e ON e.company_name = j.company_name
  WHERE NOT EXISTS (
    SELECT 1 FROM jobs existing
    WHERE existing.employer_id = e.id AND existing.title = j.title
  );

  INSERT INTO job_skills (job_id, skill_id)
  SELECT j.id, s.id
  FROM jobs j
  JOIN employers e ON e.id = j.employer_id
  JOIN (VALUES
    ('Pixel Lanka', 'Frontend Development Intern', 'React'),
    ('Pixel Lanka', 'Frontend Development Intern', 'JavaScript'),
    ('Pixel Lanka', 'Frontend Development Intern', 'CSS'),
    ('Pixel Lanka', 'Frontend Development Intern', 'Git'),
    ('Pixel Lanka', 'Frontend Development Intern', 'TypeScript'),
    ('Creative Hub', 'Junior Graphic Design Assistant', 'Figma'),
    ('Creative Hub', 'Junior Graphic Design Assistant', 'Canva'),
    ('Creative Hub', 'Junior Graphic Design Assistant', 'Communication'),
    ('Grow Digital', 'Digital Marketing Trainee', 'Content Writing'),
    ('Grow Digital', 'Digital Marketing Trainee', 'Canva'),
    ('Grow Digital', 'Digital Marketing Trainee', 'Social Media Marketing'),
    ('ABC Traders', 'Data Entry Assistant', 'Microsoft Excel'),
    ('ABC Traders', 'Data Entry Assistant', 'Data Entry'),
    ('ABC Traders', 'Data Entry Assistant', 'Communication'),
    ('Island Connect', 'Customer Support Associate', 'Communication'),
    ('Island Connect', 'Customer Support Associate', 'Customer Service'),
    ('Island Connect', 'Customer Support Associate', 'Microsoft Excel'),
    ('Ceylon Ledger', 'Accounts Assistant', 'Accounting'),
    ('Ceylon Ledger', 'Accounts Assistant', 'Microsoft Excel'),
    ('Ceylon Ledger', 'Accounts Assistant', 'Attention to Detail')
  ) AS map(company_name, title, skill_name) ON map.company_name = e.company_name AND map.title = j.title
  JOIN skills s ON s.name = map.skill_name
  ON CONFLICT DO NOTHING;
END $$;
