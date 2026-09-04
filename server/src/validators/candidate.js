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
});