import { z } from 'zod';
import {
  USER_TYPES,
  JOB_CATEGORIES,
  JOB_TYPES,
  WORK_MODES,
} from '../constants';

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || z.string().email().safeParse(value).success, {
    message: 'Please enter a valid email address',
  });

const optionalPhone = z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => !value || /^[\d\s+\-()]{7,20}$/.test(value),
    { message: 'Please enter a valid phone number' },
  );

export const PASSWORD_MIN_LENGTH = 8;

export const CANDIDATE_PASSWORD_RULES = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (password) => password.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    label: 'One number',
    test: (password) => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'One special character',
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export function isCandidatePasswordValid(password) {
  return CANDIDATE_PASSWORD_RULES.every((rule) => rule.test(password));
}

const candidatePasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, 'At least 8 characters required')
  .refine((value) => /[A-Z]/.test(value), 'Must include an uppercase letter')
  .refine((value) => /[a-z]/.test(value), 'Must include a lowercase letter')
  .refine((value) => /\d/.test(value), 'Must include a number')
  .refine((value) => /[^A-Za-z0-9]/.test(value), 'Must include a special character');

export const authRegisterSchema = z.object({
  fullName: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(PASSWORD_MIN_LENGTH, '8 characters required'),
});

export const authCandidateRegisterSchema = authRegisterSchema.extend({
  password: candidatePasswordSchema,
});

export const authLoginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const employerSetupSchema = z.object({
  companyName: z.string().trim().min(1, 'Business name is required').max(120, 'Business name is too long'),
  businessCategory: z.string().optional(),
  description: z.string().trim().max(2000, 'Description is too long').optional(),
  location: z.string().trim().max(120, 'Location is too long').optional(),
  contactEmail: optionalEmail,
  phone: optionalPhone,
});

export const jobPostSchema = z.object({
  title: z.string().trim().min(1, 'Job title is required').max(120, 'Job title is too long'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters').max(5000, 'Description is too long'),
  category: z.enum(JOB_CATEGORIES, { errorMap: () => ({ message: 'Please select a category' }) }),
  jobType: z.enum(JOB_TYPES, { errorMap: () => ({ message: 'Please select an opportunity type' }) }),
  location: z.string().trim().max(120, 'Location is too long').optional(),
  workMode: z.enum(WORK_MODES).optional().or(z.literal('')),
  deadline: z.string().optional(),
  skills: z.array(z.string()).min(1, 'Select at least one required skill'),
}).superRefine((data, ctx) => {
  if (data.deadline) {
    const deadlineDate = new Date(data.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(deadlineDate.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Deadline must be a valid date', path: ['deadline'] });
    } else if (deadlineDate < today) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Deadline cannot be in the past', path: ['deadline'] });
    }
  }
});

export const candidateOnboardingSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100, 'Name is too long'),
  userType: z.enum(USER_TYPES, { errorMap: () => ({ message: 'Please select who you are' }) }),
  educationLevel: z.string().trim().max(120, 'Education level is too long').optional().or(z.literal('')),
  fieldOfStudy: z.string().trim().max(120, 'Field of study is too long').optional().or(z.literal('')),
  location: z.string().trim().max(120, 'Location is too long').optional(),
  preferredWorkMode: z.enum(WORK_MODES).optional().or(z.literal('')),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  preferredJobTypes: z.array(z.string()).min(1, 'Select at least one opportunity type'),
});

export function fieldErrorsFromZod(error) {
  const map = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (key && !map[key]) map[key] = issue.message;
  }
  return map;
}
