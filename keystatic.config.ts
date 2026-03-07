import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: import.meta.env.MODE === 'production' ? {
        kind: 'github',
        repo: 'sarimhasan/Astro-Blog-Antigravity', // update this to your GitHub repo
    } : {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                excerpt: fields.text({ label: 'Excerpt', multiline: true }),
                category: fields.select({
                    label: 'Category',
                    options: [
                        { label: 'Philosophy', value: 'philosophy' },
                        { label: 'Science', value: 'science' },
                        { label: 'Nature', value: 'nature' },
                        { label: 'Travel', value: 'travel' },
                    ],
                    defaultValue: 'philosophy',
                }),
                readTime: fields.text({ label: 'Read Time', defaultValue: '5 MIN READ' }),
                featured: fields.checkbox({ label: 'Featured Post', defaultValue: false }),
                authorName: fields.text({ label: 'Author Name' }),
                coverImage: fields.image({
                    label: 'Cover Image',
                    directory: 'public/images',
                    publicPath: '/images/',
                }),
                content: fields.markdoc({
                    label: 'Content',
                    options: {
                        image: {
                            directory: 'public/images/posts',
                            publicPath: '/images/posts/',
                        },
                    },
                }),
            },
        }),
    },
});
