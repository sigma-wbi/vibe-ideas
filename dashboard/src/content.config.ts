import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  progress: z.number().min(0).max(100).default(0),
  tags: z.array(z.string()).default([]),
  order: z.number().default(999),
});

const claudeCode = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: '../docs/01-claude-code-refine',
  }),
  schema: docSchema,
});

const arsenal = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: '../docs/03-ai-arsenal',
  }),
  schema: docSchema,
});

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: '../docs/04-side-projects',
  }),
  schema: docSchema,
});

export const collections = { claudeCode, arsenal, projects };
