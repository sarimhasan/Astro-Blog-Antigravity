import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, a as renderTemplate, b as createAstro } from './astro/server_pxGUv0Nq.mjs';
import 'piccolore';
import { b as $$CategoryBadge } from './_astro_content_CK7Fl52g.mjs';
/* empty css                              */

const $$Astro = createAstro();
const $$RecentPostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RecentPostCard;
  const { title, slug, coverImage, categoryName, categorySlug, readTime } = Astro2.props;
  const dateStr = "Apr 3, 2024";
  return renderTemplate`${maybeRenderHead()}<article class="post-card" data-astro-cid-54ggkhau> <a${addAttribute(`/${slug}`, "href")} class="post-card__img-link" data-astro-cid-54ggkhau> <img${addAttribute(coverImage, "src")}${addAttribute(title, "alt")} class="post-card__img" loading="lazy" data-astro-cid-54ggkhau> </a> <div class="post-card__content" data-astro-cid-54ggkhau> <div class="post-card__badge-wrapper" data-astro-cid-54ggkhau> ${renderComponent($$result, "CategoryBadge", $$CategoryBadge, { "name": categoryName, "slug": categorySlug, "data-astro-cid-54ggkhau": true })} </div> <a${addAttribute(`/${slug}`, "href")} class="post-card__title-link" data-astro-cid-54ggkhau> <h3 class="post-card__title" data-astro-cid-54ggkhau>${title}</h3> </a> <div class="post-card__footer" data-astro-cid-54ggkhau> <div class="post-card__date" data-astro-cid-54ggkhau> <svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" data-astro-cid-54ggkhau><rect width="18" height="18" x="3" y="4" rx="2" ry="2" data-astro-cid-54ggkhau></rect><line x1="16" x2="16" y1="2" y2="6" data-astro-cid-54ggkhau></line><line x1="8" x2="8" y1="2" y2="6" data-astro-cid-54ggkhau></line><line x1="3" x2="21" y1="10" y2="10" data-astro-cid-54ggkhau></line></svg> ${dateStr} </div> <div class="post-card__read-time" data-astro-cid-54ggkhau> <svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" data-astro-cid-54ggkhau><circle cx="12" cy="12" r="10" data-astro-cid-54ggkhau></circle><polyline points="12 6 12 12 16 14" data-astro-cid-54ggkhau></polyline></svg> ${readTime} </div> </div> </div> </article> `;
}, "D:/Main/04 Archive/Astro Blog Antigravity/src/components/RecentPostCard.astro", void 0);

export { $$RecentPostCard as $ };
