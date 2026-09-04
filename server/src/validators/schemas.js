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
  companyName: z.string({ required_error: 'Business name is required' }).trim().min(1, 'Business name is required').max(120, 'Business name is too long'),
  businessCategory: z.string().optional(),
  description: z.string().trim().max(2000, 'Description is too long').optional(),
  location: z.string().trim().max(120, 'Location is too long').optional(),
  contactEmail: z.union([z.string().trim().email('Please enter a valid email'), z.literal('')]).optional(),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^[\d\s+\-()]{7,20}$/.test(value), {
      message: 'Please enter a valid phone number',
    }),
});

export const jobSchema = z.object({
  title: z.string().trim().min(1, 'Job title is required').max(120, 'Job title is too long'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters').max(5000, 'Description is too long'),
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

export const applySchema = z.object({

  message: z.string().trim().max(1000, 'Message is too long').optional(),
});
