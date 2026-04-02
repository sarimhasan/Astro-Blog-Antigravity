import { config, fields, collection } from "@keystatic/core";

/**
 * Keystatic configuration for the blog project.
 * This file defines the CMS structure, storage strategy, and content schemas.
 */
export default config({
  /**
   * Storage configuration:
   * - In production: Uses GitHub for content storage, enabling cloud-based CMS.
   * - In development: Uses local filesystem for faster iteration.
   */
  storage:
    import.meta.env.MODE === "production"
      ? {
          kind: "github",
          repo: "sarimhasan/Astro-Blog-Antigravity", // Reference to the GitHub repository where content is stored
        }
      : {
          kind: "local",
        },

  /**
   * Content Collections:
   * Defines the groups of content (e.g., blog posts) managed by Keystatic.
   */
  collections: {
    // 'posts' collection for blog entries
    posts: collection({
      label: "Posts",
      slugField: "title", // Uses the title as the base for the file name/URL slug
      path: "src/content/posts/*", // Where the post files are saved
      format: { contentField: "content" }, // Specifies which field holds the main body content
      schema: {
        // Title of the post, also used for the slug
        title: fields.slug({ name: { label: "Title" } }),

        // Short summary shown in previews
        excerpt: fields.text({
          label: "Excerpt / Description",
          multiline: true,
        }),

        // Categorization for filtering and organization
        category: fields.select({
          label: "Category",
          options: [
            { label: "Philosophy", value: "philosophy" },
            { label: "Science", value: "science" },
            { label: "Thoughts", value: "thoughts" },
            { label: "Miscellaneous", value: "miscellaneous" },
          ],
          defaultValue: "philosophy",
        }),

        // Manual input for estimated reading time
        readTime: fields.text({
          label: "Read Time",
          defaultValue: "5 MIN READ",
        }),

        // Flag to highlight this post in the UI (e.g., hero section)
        featured: fields.checkbox({
          label: "Featured Post",
          defaultValue: false,
        }),

        // Name of the author
        authorName: fields.text({ label: "Author Name" }),

        // Main visual for the post preview/header
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images",
          publicPath: "/images/",
        }),

        // Rich text content using Markdoc for flexible formatting
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
        }),
      },
    }),

    intel: collection({
      label: "Intel: Reading & Watching",
      slugField: "title",
      path: "src/content/intel/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),

        excerpt: fields.text({ label: "Excerpt", multiline: true }),

        itemType: fields.select({
          label: "Type",
          options: [
            { label: "Book", value: "book" },
            { label: "Movie", value: "movie" },
          ],
          defaultValue: "book",
        }),

        status: fields.select({
          label: "Status",
          options: [
            { label: "In Progress", value: "in-progress" },
            { label: "Complete", value: "complete" },
          ],
          defaultValue: "in-progress",
        }),

        creator: fields.text({ label: "Creator (Author/Director)" }),

        rating: fields.text({ label: "Rating", defaultValue: "N/A" }),

        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images",
          publicPath: "/images/",
        }),

        content: fields.markdoc({
          label: "Notes",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
        }),
      },
    }),
  },
});
