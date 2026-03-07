import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
    const posts = await getCollection('posts');

    const data = posts.map((p) => ({
        slug: p.slug,
        title: p.data.title,
        excerpt: p.data.excerpt ?? '',
        category: p.data.category ?? '',
        coverImage: p.data.coverImage ?? '',
        readTime: p.data.readTime ?? '',
    }));

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
};
