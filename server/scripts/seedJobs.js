import '../src/config/env.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const PASSWORD = 'SkillBridge123!';

const EMPLOYERS = [
  { id: '11111111-1111-1111-1111-111111111101', email: 'seed-pixel-lanka@skillbridge.lk', company: 'Pixel Lanka', category: 'Software / IT', location: 'Colombo' },
  { id: '11111111-1111-1111-1111-111111111102', email: 'seed-creative-hub@skillbridge.lk', company: 'Creative Hub', category: 'Graphic Design', location: 'Kandy' },
  { id: '11111111-1111-1111-1111-111111111103', email: 'seed-grow-digital@skillbridge.lk', company: 'Grow Digital', category: 'Marketing', location: 'Colombo' },
  { id: '11111111-1111-1111-1111-111111111104', email: 'seed-abc-traders@skillbridge.lk', company: 'ABC Traders', category: 'Data Entry', location: 'Galle' },
  { id: '11111111-1111-1111-1111-111111111105', email: 'seed-island-connect@skillbridge.lk', company: 'Island Connect', category: 'Customer Service', location: 'Jaffna' },
  { id: '11111111-1111-1111-1111-111111111106', email: 'seed-ceylon-ledger@skillbridge.lk', company: 'Ceylon Ledger', category: 'Accounting / Finance', location: 'Kurunegala' },
];

const JOBS = [
  {
    company: 'Pixel Lanka',
    title: 'Frontend Development Intern',
    description: 'Build thoughtful web experiences with a small Sri Lankan software team. Put your frontend skills into practice, learn from code reviews, and contribute to real product features.\n\nWhat you would be doing:\n• Build responsive interfaces with React and CSS.\n• Work with designers to turn ideas into usable features.\n• Use Git to collaborate and participate in code reviews.',
    category: 'Software / IT',
    job_type: 'Internship',
    location: 'Colombo',
    work_mode: 'Hybrid',
    skills: ['React', 'JavaScript', 'CSS', 'Git', 'TypeScript'],
  },
  {
    company: 'Creative Hub',
    title: 'Junior Graphic Design Assistant',
    description: 'Help a local creative studio bring brand stories to life. Explore social content, layouts, and visual design alongside a collaborative team.\n\nWhat you would be doing:\n• Create social media graphics and campaign layouts.\n• Prepare design variations and incorporate feedback.\n• Keep brand assets organized and consistent.',
    category: 'Graphic Design',
    job_type: 'Part-time',
    location: 'Kandy',
    work_mode: 'On-site',
    skills: ['Figma', 'Canva', 'Communication'],
  },
  {
    company: 'Grow Digital',
    title: 'Digital Marketing Trainee',
    description: 'Turn your interest in social media into practical marketing experience. Support small-business campaigns and learn how content reaches the right audience.\n\nWhat you would be doing:\n• Draft engaging content for social channels.\n• Help plan and schedule campaign posts.\n• Summarize engagement results with the team.',
    category: 'Marketing',
    job_type: 'Trainee',
    location: 'Colombo',
    work_mode: 'Remote',
    skills: ['Content Writing', 'Canva', 'Social Media Marketing'],
  },
  {
    company: 'ABC Traders',
    title: 'Data Entry Assistant',
    description: 'Support the daily operations of a growing local trading business. This role suits an organized beginner who enjoys working with information.\n\nWhat you would be doing:\n• Update product and inventory spreadsheets.\n• Check records for accuracy and missing information.\n• Coordinate with the operations team on daily updates.',
    category: 'Data Entry',
    job_type: 'Part-time',
    location: 'Galle',
    work_mode: 'On-site',
    skills: ['Microsoft Excel', 'Data Entry', 'Communication'],
  },
  {
    company: 'Island Connect',
    title: 'Customer Support Associate',
    description: 'Be a helpful first point of contact for customers. Develop your communication skills and learn how a local service business supports its community.\n\nWhat you would be doing:\n• Respond to customer questions clearly and respectfully.\n• Maintain accurate records of support requests.\n• Share recurring customer feedback with the team.',
    category: 'Customer Service',
    job_type: 'Entry-level',
    location: 'Jaffna',
    work_mode: 'Hybrid',
    skills: ['Communication', 'Customer Service', 'Microsoft Excel'],
  },
  {
    company: 'Ceylon Ledger',
    title: 'Accounts Assistant',
    description: 'Take your first step into finance with a small accounting team. Apply your classroom knowledge to bookkeeping and everyday business records.\n\nWhat you would be doing:\n• Assist with invoices and expense records.\n• Organize financial documents and spreadsheets.\n• Support the team with basic reconciliations.',
    category: 'Accounting / Finance',
    job_type: 'Full-time',
    location: 'Kurunegala',
    work_mode: 'On-site',
    skills: ['Accounting', 'Microsoft Excel', 'Attention to Detail'],
  },
];

async function ensureSkill(name) {
  const { data: existing } = await supabase.from('skills').select('id').eq('name', name).maybeSingle();
  if (existing) return existing.id;

  const { data, error } = await supabase.from('skills').insert({ name }).select('id').single();
  if (error) throw error;
  return data.id;
}

async function ensureEmployer(employer) {
  const { data: existingEmployer } = await supabase
    .from('employers')
    .select('id')
    .eq('company_name', employer.company)
    .maybeSingle();

  if (existingEmployer) return existingEmployer.id;

  const { error: userError } = await supabase.auth.admin.createUser({
    id: employer.id,
    email: employer.email,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: employer.company, role: 'employer' },
  });

  if (userError && !userError.message.includes('already been registered')) {
    throw userError;
  }

  await supabase.from('profiles').upsert({
    id: employer.id,
    full_name: employer.company,
    role: 'employer',
  });

  const { data, error } = await supabase
    .from('employers')
    .insert({
      owner_id: employer.id,
      company_name: employer.company,
      business_category: employer.category,
      location: employer.location,
      contact_email: employer.email,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

async function seed() {
  const { count } = await supabase.from('jobs').select('*', { count: 'exact', head: true });
  const seededTitles = new Set(
    (await supabase.from('jobs').select('title')).data?.map((row) => row.title) || [],
  );

  const missingJobs = JOBS.filter((job) => !seededTitles.has(job.title));
  if (missingJobs.length === 0) {
    console.log(`Nothing to seed — ${count} jobs already in database.`);
    return;
  }

  const employerIds = {};
  for (const employer of EMPLOYERS) {
    employerIds[employer.company] = await ensureEmployer(employer);
  }

  for (const job of missingJobs) {
    const employerId = employerIds[job.company];
    const { data: createdJob, error: jobError } = await supabase
      .from('jobs')
      .insert({
        employer_id: employerId,
        title: job.title,
        description: job.description,
        category: job.category,
        job_type: job.job_type,
        location: job.location,
        work_mode: job.work_mode,
        status: 'ACTIVE',
      })
      .select('id')
      .single();

    if (jobError) throw jobError;

    const skillIds = await Promise.all(job.skills.map(ensureSkill));
    const { error: skillsError } = await supabase
      .from('job_skills')
      .insert(skillIds.map((skillId) => ({ job_id: createdJob.id, skill_id: skillId })));

    if (skillsError) throw skillsError;
    console.log(`Seeded: ${job.title}`);
  }

  const { count: finalCount } = await supabase.from('jobs').select('*', { count: 'exact', head: true });
  console.log(`Done. ${finalCount} jobs in database.`);
}

seed().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
