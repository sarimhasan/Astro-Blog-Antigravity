import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_pxGUv0Nq.mjs';
import 'piccolore';
import { d as getCollection, $ as $$MainLayout, a as $$Header, c as $$Footer } from '../../chunks/_astro_content_C4AkJEAJ.mjs';
import { $ as $$RecentPostCard } from '../../chunks/RecentPostCard_C32-PRnG.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const { category } = Astro2.params;
  const CATEGORIES = {
    philosophy: "Philosophy",
    science: "Science",
    thoughts: "Thoughts",
    miscellaneous: "Miscellaneous"
  };
  const title = category ? CATEGORIES[category] || category : "Category";
  const _allPosts = await getCollection("posts");
  const posts = _allPosts.filter((post) => post.data.category === category).map((p) => ({ slug: p.slug, ...p.data }));
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `${title} - The Wandering Mind`, "data-astro-cid-l6gs42ny": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-l6gs42ny": true })} ${maybeRenderHead()}<main class="container" style="padding-top: 60px; padding-bottom: 80px; min-height: 60vh;" data-astro-cid-l6gs42ny> <h1 class="category-page-title" data-astro-cid-l6gs42ny> <span class="muted" data-astro-cid-l6gs42ny>Category:</span> ${title} </h1> ${posts.length > 0 ? renderTemplate`<div class="cards-grid" data-astro-cid-l6gs42ny> ${posts.map((post) => {
    const catName = CATEGORIES[post.category] || "General";
    return renderTemplate`${renderComponent($$result2, "RecentPostCard", $$RecentPostCard, { "title": post.title, "slug": post.slug, "excerpt": post.excerpt, "coverImage": post.coverImage, "categoryName": catName, "categorySlug": post.category, "authorName": post.authorName, "readTime": post.readTime, "data-astro-cid-l6gs42ny": true })}`;
  })} </div>` : renderTemplate`<div class="no-posts" data-astro-cid-l6gs42ny> <p data-astro-cid-l6gs42ny>No posts found in this category yet. Check back soon!</p> </div>`} </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-l6gs42ny": true })} ` })} `;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/pages/category/[category].astro", void 0);

const $$file = "D:/Main/04 Archive/Astro Blog Antigravity/src/pages/category/[category].astro";
const $$url = "/category/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$category,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
