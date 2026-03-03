import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        excerpt: z.string().optional(),
        category: z.string(),
        readTime: z.string().default('5 MIN READ'),
        featured: z.boolean().default(false),
        authorName: z.string(),
        coverImage: z.string().optional(),
    }),
});

export const collections = {
    posts: postsCollection,
};
