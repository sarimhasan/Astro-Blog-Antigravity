import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_pxGUv0Nq.mjs';
import 'piccolore';
import { g as getEntry, $ as $$MainLayout, a as $$Header, b as $$CategoryBadge, c as $$Footer } from '../../chunks/_astro_content_BnGm0M_8.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/");
  }
  const post = await getEntry("posts", slug);
  if (!post) {
    return Astro2.redirect("/");
  }
  const { Content } = await post.render();
  const CATEGORIES = {
    productivity: "Productivity",
    finance: "Finance",
    climate: "Climate",
    design: "Design",
    development: "Development",
    strategy: "Strategy"
  };
  const categoryName = CATEGORIES[post.data.category] || "General";
  const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const initials = post.data.authorName.split(" ").map((w) => w[0]).join("");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `${post.data.title} \u2014 Sarim's Pensieve` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<article class="post-page"> <a href="/" class="post-page__back"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M19 12H5M12 19l-7-7 7-7"></path> </svg>
Back to Home
</a> <div class="post-page__meta"> ${renderComponent($$result2, "CategoryBadge", $$CategoryBadge, { "name": categoryName, "slug": post.data.category })} <span class="recent-card__read-time">${post.data.readTime}</span> </div> <h1 class="post-page__title">${post.data.title}</h1> <p class="post-page__excerpt">${post.data.excerpt}</p> ${post.data.coverImage && renderTemplate`<img${addAttribute(post.data.coverImage, "src")}${addAttribute(post.data.title, "alt")} class="post-page__cover">`} <div class="post-page__author"> <div class="post-page__author-avatar">${initials}</div> <div class="post-page__author-info"> <span class="post-page__author-name">${post.data.authorName}</span> <span class="post-page__author-date">${dateStr} · ${post.data.readTime}</span> </div> </div> <div class="post-content"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/pages/blog/[slug].astro", void 0);

const $$file = "D:/Main/04 Archive/Astro Blog Antigravity/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
