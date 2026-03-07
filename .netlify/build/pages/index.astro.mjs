import { c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, b as createAstro, r as renderComponent } from '../chunks/astro/server_BcKQPrgQ.mjs';
import 'piccolore';
import { b as $$CategoryBadge, d as getCollection, $ as $$MainLayout, a as $$Header, c as $$Footer } from '../chunks/_astro_content_B1hRpF3z.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { title, slug, coverImage, categoryName, categorySlug, authorName, publishedAt } = Astro2.props;
  const dateStr = publishedAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).toUpperCase();
  const initials = authorName.split(" ").map((w) => w[0]).join("");
  return renderTemplate`${maybeRenderHead()}<section class="hero"> <img${addAttribute(coverImage, "src")}${addAttribute(title, "alt")} class="hero__image" loading="eager"> <div class="hero__overlay"></div> <div class="hero__content"> <div class="hero__badge"> <span class="category-badge" style="background: var(--accent);">FEATURED STORY</span> </div> <a${addAttribute(`/blog/${slug}`, "href")}> <h1 class="hero__title">${title}</h1> </a> <div class="hero__author"> <div class="hero__author-avatar">${initials}</div> <div class="hero__author-info"> <span class="hero__author-name">${authorName}</span> <span class="hero__author-date">${dateStr}</span> </div> </div> </div> </section>`;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/components/HeroSection.astro", void 0);

const $$Astro$1 = createAstro();
const $$TrendingCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TrendingCard;
  const { title, slug, excerpt, coverImage, categoryName, categorySlug } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="trending-card"> <a${addAttribute(`/blog/${slug}`, "href")}> <div class="trending-card__image-wrapper"> ${renderComponent($$result, "CategoryBadge", $$CategoryBadge, { "name": categoryName, "slug": categorySlug })} <img${addAttribute(coverImage, "src")}${addAttribute(title, "alt")} class="trending-card__image" loading="lazy"> </div> </a> <div class="trending-card__body"> <a${addAttribute(`/blog/${slug}`, "href")}> <h3 class="trending-card__title">${title}</h3> </a> <p class="trending-card__excerpt">${excerpt}</p> <a${addAttribute(`/blog/${slug}`, "href")} class="trending-card__link">
Read More
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M5 12h14M12 5l7 7-7 7"></path> </svg> </a> </div> </article>`;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/components/TrendingCard.astro", void 0);

const $$Astro = createAstro();
const $$RecentPostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RecentPostCard;
  const { title, slug, excerpt, coverImage, categoryName, categorySlug, authorName, readTime } = Astro2.props;
  const initials = authorName.split(" ").map((w) => w[0]).join("");
  return renderTemplate`${maybeRenderHead()}<article class="recent-card"> <a${addAttribute(`/blog/${slug}`, "href")} class="recent-card__image-wrapper"> <img${addAttribute(coverImage, "src")}${addAttribute(title, "alt")} class="recent-card__image" loading="lazy"> </a> <div class="recent-card__body"> <div class="recent-card__meta"> ${renderComponent($$result, "CategoryBadge", $$CategoryBadge, { "name": categoryName, "slug": categorySlug })} <span class="recent-card__read-time">${readTime}</span> </div> <a${addAttribute(`/blog/${slug}`, "href")}> <h3 class="recent-card__title">${title}</h3> </a> <p class="recent-card__excerpt">${excerpt}</p> <div class="recent-card__author"> <div class="recent-card__author-avatar">${initials}</div> <span class="recent-card__author-name">${authorName}</span> </div> </div> </article>`;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/components/RecentPostCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const _allPosts = await getCollection("posts");
  const allPosts = _allPosts.map((p) => ({ slug: p.slug, ...p.data }));
  const CATEGORIES = {
    productivity: "Productivity",
    finance: "Finance",
    climate: "Climate",
    design: "Design",
    development: "Development",
    strategy: "Strategy"
  };
  const featuredPost = allPosts.find((p) => p.featured);
  const trendingPosts = allPosts.filter((p) => !p.featured).slice(0, 3);
  const recentPosts = allPosts.filter((p) => !p.featured).slice(3);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Sarim's Pensieve \u2014 A Thinking Space" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="container" style="padding-top: 32px; padding-bottom: 32px;"> ${featuredPost && (() => {
    const catName = CATEGORIES[featuredPost.category] || "General";
    return renderTemplate`${renderComponent($$result2, "HeroSection", $$HeroSection, { "title": featuredPost.title, "slug": featuredPost.slug, "coverImage": featuredPost.coverImage, "categoryName": catName, "categorySlug": featuredPost.category, "authorName": featuredPost.authorName, "publishedAt": /* @__PURE__ */ new Date() })}`;
  })()} <section> <h2 class="section-title">Trending Now</h2> <div class="trending-grid"> ${trendingPosts.map((post) => {
    const catName = CATEGORIES[post.category] || "General";
    return renderTemplate`${renderComponent($$result2, "TrendingCard", $$TrendingCard, { "title": post.title, "slug": post.slug, "excerpt": post.excerpt, "coverImage": post.coverImage, "categoryName": catName, "categorySlug": post.category })}`;
  })} </div> </section> <section> <h2 class="section-title">Recent Posts</h2> <div class="recent-posts"> ${recentPosts.map((post) => {
    const catName = CATEGORIES[post.category] || "General";
    return renderTemplate`${renderComponent($$result2, "RecentPostCard", $$RecentPostCard, { "title": post.title, "slug": post.slug, "excerpt": post.excerpt, "coverImage": post.coverImage, "categoryName": catName, "categorySlug": post.category, "authorName": post.authorName, "readTime": post.readTime })}`;
  })} </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/pages/index.astro", void 0);

const $$file = "D:/Main/04 Archive/Astro Blog Antigravity/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
