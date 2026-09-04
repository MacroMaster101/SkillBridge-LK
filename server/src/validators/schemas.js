import { z } from 'zod';

export const onboardingSchema = z.object({
  userType: z.string().min(1, 'User type is required'),
  educationLevel: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  preferredWorkMode: z.string().optional(),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  preferredJobTypes: z.array(z.string()).min(1, 'Please select at least one job preference'),
  preferredCategories: z.array(z.string()).optional(),
});

export const employerSchema = z.object({
  companyName: z.string({ required_error: 'Business name is required' }).min(1, 'Business name is required'),
  businessCategory: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  contactEmail: z.union([z.string().email('Please enter a valid email'), z.literal('')]).optional(),
  phone: z.string().optional(),
});

export const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  jobType: z.string().min(1, 'Job type is required'),
  location: z.string().optional(),
  workMode: z.string().optional(),
  skills: z.array(z.string()).min(1, 'At least one required skill is needed'),
  minimumEducation: z.string().optional(),
  deadline: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.deadline) {
    const deadlineDate = new Date(data.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(deadlineDate.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Deadline must be a valid date',
        path: ['deadline'],
      });
    } else if (deadlineDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Deadline cannot be in the past',
        path: ['deadline'],
      });
    }
  }
});

export const applicationStatusSchema = z.object({
  status: z.enum(['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'HIRED']),
});
