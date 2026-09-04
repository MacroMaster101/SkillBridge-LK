-- SkillBridge LK — Seed Data
-- Run after schema.sql

INSERT INTO skills (name) VALUES
    ('React'),
    ('JavaScript'),
    ('TypeScript'),
    ('HTML'),
    ('CSS'),
    ('Node.js'),
    ('Express'),
    ('Git'),
    ('SQL'),
    ('PostgreSQL'),
    ('Supabase'),
    ('Figma'),
    ('Canva'),
    ('Microsoft Excel'),
    ('Communication'),
    ('Customer Service'),
    ('Social Media Marketing'),
    ('Content Writing'),
    ('Accounting'),
    ('Data Entry'),
    ('Sales')
ON CONFLICT (name) DO NOTHING;
