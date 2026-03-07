import { c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, b as createAstro, r as renderComponent } from '../chunks/astro/server_pxGUv0Nq.mjs';
import 'piccolore';
import { d as getCollection, $ as $$MainLayout, a as $$Header, c as $$Footer } from '../chunks/_astro_content_BnGm0M_8.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$RecentPostCard } from '../chunks/RecentPostCard_CPIJHLd3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { coverImage = "/images/posts/default.jpg", slug } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero-section" data-astro-cid-nlow4r3u> <div class="hero-bg" data-astro-cid-nlow4r3u> <img${addAttribute(coverImage, "src")} alt="Hero background" class="hero-img" loading="eager" data-astro-cid-nlow4r3u> <div class="hero-overlay" data-astro-cid-nlow4r3u></div> </div> <div class="hero-content" data-astro-cid-nlow4r3u> <h1 class="hero-quote" data-astro-cid-nlow4r3u>"Exploring the cosmos without<br data-astro-cid-nlow4r3u>and the universe within."</h1> <!-- If we have a featured post slug, use it, else # --> <a${addAttribute(slug ? `/${slug}` : "#", "href")} class="hero-btn" data-astro-cid-nlow4r3u>Begin the Journey</a> </div> </section> `;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/components/HeroSection.astro", void 0);

const $$ThemeIcons = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="theme-section" data-astro-cid-5bjhvnjs> <h3 class="theme-title" data-astro-cid-5bjhvnjs>Browse by Theme</h3> <div class="theme-grid" data-astro-cid-5bjhvnjs> <a href="/category/philosophy" class="theme-item" data-astro-cid-5bjhvnjs> <div class="theme-circle c-philosophy" data-astro-cid-5bjhvnjs> <!-- Lightbulb / idea --> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5bjhvnjs> <path d="M15 14c.2-1 .7-1.7 1.5-2.5A7 7 0 1 0 6.1 8.5C5 10 4.6 11 4.6 13a6 6 0 0 0 3.4 5.4V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1.6c.9-.4 1.7-1.2 2-2.4" data-astro-cid-5bjhvnjs></path> <line x1="12" y1="2" x2="12" y2="4" data-astro-cid-5bjhvnjs></line> </svg> </div> <span class="theme-label" data-astro-cid-5bjhvnjs>Philosophy</span> </a> <a href="/category/science" class="theme-item" data-astro-cid-5bjhvnjs> <div class="theme-circle c-science" data-astro-cid-5bjhvnjs> <!-- Atom --> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5bjhvnjs> <circle cx="12" cy="12" r="3" data-astro-cid-5bjhvnjs></circle> <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" data-astro-cid-5bjhvnjs></ellipse> <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" data-astro-cid-5bjhvnjs></ellipse> </svg> </div> <span class="theme-label" data-astro-cid-5bjhvnjs>Science</span> </a> <a href="/category/thoughts" class="theme-item" data-astro-cid-5bjhvnjs> <div class="theme-circle c-thoughts" data-astro-cid-5bjhvnjs> <!-- Speech bubble / thought --> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5bjhvnjs> <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" data-astro-cid-5bjhvnjs></path> </svg> </div> <span class="theme-label" data-astro-cid-5bjhvnjs>Thoughts</span> </a> <a href="/category/miscellaneous" class="theme-item" data-astro-cid-5bjhvnjs> <div class="theme-circle c-miscellaneous" data-astro-cid-5bjhvnjs> <!-- Grid / misc --> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5bjhvnjs> <rect x="3" y="3" width="7" height="7" rx="1" data-astro-cid-5bjhvnjs></rect> <rect x="14" y="3" width="7" height="7" rx="1" data-astro-cid-5bjhvnjs></rect> <rect x="3" y="14" width="7" height="7" rx="1" data-astro-cid-5bjhvnjs></rect> <rect x="14" y="14" width="7" height="7" rx="1" data-astro-cid-5bjhvnjs></rect> </svg> </div> <span class="theme-label" data-astro-cid-5bjhvnjs>Miscellaneous</span> </a> </div> </div> `;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/components/ThemeIcons.astro", void 0);

const $$AboutAuthor = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="about-author" data-astro-cid-jy2ec4tz> <div class="author-image-wrapper" data-astro-cid-jy2ec4tz> <img src="/images/posts/default.jpg" alt="Author" class="author-image" loading="lazy" data-astro-cid-jy2ec4tz> </div> <div class="author-info" data-astro-cid-jy2ec4tz> <h2 class="author-heading" data-astro-cid-jy2ec4tz>About the Author</h2> <p class="author-bio" data-astro-cid-jy2ec4tz>
Welcome to my digital space. I'm a writer, thinker, and lifelong learner exploring the intersection of philosophy, science, and the human experience.
<br data-astro-cid-jy2ec4tz><br data-astro-cid-jy2ec4tz>
Through these essays, I hope to spark curiosity and inspire others to wander through the landscape of ideas with an open mind.
</p> <div class="author-socials" data-astro-cid-jy2ec4tz> <a href="#" aria-label="Twitter" data-astro-cid-jy2ec4tz> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jy2ec4tz><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" data-astro-cid-jy2ec4tz></path></svg> </a> <a href="#" aria-label="LinkedIn" data-astro-cid-jy2ec4tz> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jy2ec4tz><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" data-astro-cid-jy2ec4tz></path><rect width="4" height="12" x="2" y="9" data-astro-cid-jy2ec4tz></rect><circle cx="4" cy="4" r="2" data-astro-cid-jy2ec4tz></circle></svg> </a> <a href="#" aria-label="Instagram" data-astro-cid-jy2ec4tz> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jy2ec4tz><rect width="20" height="20" x="2" y="2" rx="5" ry="5" data-astro-cid-jy2ec4tz></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" data-astro-cid-jy2ec4tz></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" data-astro-cid-jy2ec4tz></line></svg> </a> </div> </div> </section> `;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/components/AboutAuthor.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const _allPosts = await getCollection("posts");
  const allPosts = _allPosts.map((p) => ({ slug: p.slug, ...p.data })).reverse();
  const CATEGORIES = {
    philosophy: "Philosophy",
    science: "Science",
    thoughts: "Thoughts",
    miscellaneous: "Miscellaneous"
  };
  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];
  const featuredSlug = featuredPost?.slug;
  const recentPosts = allPosts.filter((p) => p.slug !== featuredSlug).slice(0, 4);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "The Wandering Mind", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="container" style="padding-top: 32px; padding-bottom: 32px;" data-astro-cid-j7pv25f6> ${featuredPost && renderTemplate`${renderComponent($$result2, "HeroSection", $$HeroSection, { "slug": featuredPost.slug, "coverImage": featuredPost.coverImage, "data-astro-cid-j7pv25f6": true })}`} <section class="latest-reflections" data-astro-cid-j7pv25f6> <h2 class="section-title" data-astro-cid-j7pv25f6>Latest Reflections</h2> <div class="cards-grid" data-astro-cid-j7pv25f6> ${recentPosts.map((post) => {
    const catName = CATEGORIES[post.category] || "General";
    return renderTemplate`${renderComponent($$result2, "RecentPostCard", $$RecentPostCard, { "title": post.title, "slug": post.slug, "excerpt": post.excerpt, "coverImage": post.coverImage, "categoryName": catName, "categorySlug": post.category, "authorName": post.authorName, "readTime": post.readTime, "data-astro-cid-j7pv25f6": true })}`;
  })} </div> </section> ${renderComponent($$result2, "ThemeIcons", $$ThemeIcons, { "data-astro-cid-j7pv25f6": true })} <div class="divider" data-astro-cid-j7pv25f6></div> ${renderComponent($$result2, "AboutAuthor", $$AboutAuthor, { "data-astro-cid-j7pv25f6": true })} </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} ` })} `;
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
