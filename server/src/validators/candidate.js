import { z } from "zod";

export const updateProfileSchema = z.object({
  full_name: z.string().min(1, "Full name is required."),
  user_type: z.enum([
    "Undergraduate Student",
    "Diploma / HND Student",
    "Recent Graduate",
    "Non-Student Job Seeker",
  ]),
  education_level: z.string().optional(),
  field_of_study: z.string().optional(),
  location: z.string().optional(),
  preferred_work_mode: z.enum(["On-site", "Hybrid", "Remote"]).optional(),
  preferred_job_types: z.array(z.string()).optional(),
});

export const updateSkillsSchema = z.object({
  skillIds: z.array(z.number().int()).min(1, 'Please select at least one skill.').optional(),
  skillNames: z.array(z.string().trim().min(1).max(80)).min(1, 'Please select at least one skill.').optional(),
}).refine(
  (data) => (data.skillIds?.length ?? 0) > 0 || (data.skillNames?.length ?? 0) > 0,
  { message: 'Please select at least one skill.' },
);