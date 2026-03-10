import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Search API Route
 * Provides a JSON endpoint at /api/search.json containing all blog posts.
 * This is used by the client-side search component to perform searches without 
 * reloading the page or needing a full backend search engine.
 */
export const GET: APIRoute = async () => {
    // Fetch all posts from the collection
    const posts = await getCollection('posts');

    /**
     * Data Mapping:
     * Simplify the post objects to only include necessary fields for search results.
     * This reduces the payload size sent to the client.
     */
    const data = posts.map((p) => ({
        slug: p.slug,
        title: p.data.title,
        excerpt: p.data.excerpt ?? '',
        category: p.data.category ?? '',
        coverImage: p.data.coverImage ?? '',
        readTime: p.data.readTime ?? '',
    }));

    // Return the JSON response with appropriate headers
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            // Optional: Cache-Control could be added here for production
        },
    });
};

