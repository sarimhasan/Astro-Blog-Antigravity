import { g as getCollection } from '../../chunks/_astro_content_CoqnmaX-.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const posts = await getCollection("posts");
  const data = posts.map((p) => ({
    slug: p.slug,
    title: p.data.title,
    excerpt: p.data.excerpt ?? "",
    category: p.data.category ?? "",
    coverImage: p.data.coverImage ?? "",
    readTime: p.data.readTime ?? ""
  }));
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
