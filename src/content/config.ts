import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    category: z.string(),
    date: z.string(),
    readTime: z.string().default("5 MIN READ"),
    featured: z.boolean().default(false),
    authorName: z.string(),
    coverImage: z.string().optional(),
  }),
});

const intelCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    itemType: z.enum(["book", "movie"]),
    status: z.enum(["in-progress", "complete"]),
    creator: z.string().optional(),
    rating: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  intel: intelCollection,
};
