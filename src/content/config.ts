import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const blog = defineCollection({ type: 'content', schema: blogSchema });
const blogZh = defineCollection({ type: 'content', schema: blogSchema });

export const collections = { blog, blogZh };
