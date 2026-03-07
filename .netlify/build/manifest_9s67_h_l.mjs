import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_BcKQPrgQ.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Main/04%20Archive/Astro%20Blog%20Antigravity/","cacheDir":"file:///D:/Main/04%20Archive/Astro%20Blog%20Antigravity/node_modules/.astro/","outDir":"file:///D:/Main/04%20Archive/Astro%20Blog%20Antigravity/dist/","srcDir":"file:///D:/Main/04%20Archive/Astro%20Blog%20Antigravity/src/","publicDir":"file:///D:/Main/04%20Archive/Astro%20Blog%20Antigravity/public/","buildClientDir":"file:///D:/Main/04%20Archive/Astro%20Blog%20Antigravity/dist/","buildServerDir":"file:///D:/Main/04%20Archive/Astro%20Blog%20Antigravity/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.tAVmwA0Y.css"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.tAVmwA0Y.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Main/04 Archive/Astro Blog Antigravity/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["D:/Main/04 Archive/Astro Blog Antigravity/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/node_modules/@astrojs/markdoc/components/Renderer.astro",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/node_modules/@astrojs/markdoc/components/index.ts",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/building-sustainable-tech-futures.mdoc",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/building-sustainable-tech-futures.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["D:\\Main\\04 Archive\\Astro Blog Antigravity\\.astro\\content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/empowering-non-developers-with-no-code-tools.mdoc",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/empowering-non-developers-with-no-code-tools.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/how-to-create-an-effective-design-portfolio.mdoc",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/how-to-create-an-effective-design-portfolio.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/low-code-no-code-bridging-the-gap.mdoc",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/low-code-no-code-bridging-the-gap.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/navigating-the-remote-work-landscape.mdoc",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/navigating-the-remote-work-landscape.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/scalability-and-flexibility-in-no-code-solutions.mdoc",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/scalability-and-flexibility-in-no-code-solutions.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/the-modern-stack-why-less-is-more.mdoc",{"propagation":"in-tree","containsHead":false}],["D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/the-modern-stack-why-less-is-more.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"pages/api/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"pages/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_9s67_h_l.mjs","D:/Main/04 Archive/Astro Blog Antigravity/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","D:\\Main\\04 Archive\\Astro Blog Antigravity\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","D:\\Main\\04 Archive\\Astro Blog Antigravity\\.astro\\content-modules.mjs":"chunks/content-modules_BJIwAHJh.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DvHiHI42.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/building-sustainable-tech-futures.mdoc?astroPropagatedAssets":"chunks/building-sustainable-tech-futures_CtDH9226.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/empowering-non-developers-with-no-code-tools.mdoc?astroPropagatedAssets":"chunks/empowering-non-developers-with-no-code-tools_M_CGge9M.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/the-modern-stack-why-less-is-more.mdoc?astroPropagatedAssets":"chunks/the-modern-stack-why-less-is-more_2xjSRNic.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/scalability-and-flexibility-in-no-code-solutions.mdoc?astroPropagatedAssets":"chunks/scalability-and-flexibility-in-no-code-solutions_CZAkrUqb.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/how-to-create-an-effective-design-portfolio.mdoc?astroPropagatedAssets":"chunks/how-to-create-an-effective-design-portfolio_DpKTtyC3.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/low-code-no-code-bridging-the-gap.mdoc?astroPropagatedAssets":"chunks/low-code-no-code-bridging-the-gap_D05clOU5.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/navigating-the-remote-work-landscape.mdoc?astroPropagatedAssets":"chunks/navigating-the-remote-work-landscape_BdlTC4vr.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/building-sustainable-tech-futures.mdoc":"chunks/building-sustainable-tech-futures_Bn7mvybG.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/empowering-non-developers-with-no-code-tools.mdoc":"chunks/empowering-non-developers-with-no-code-tools_DWR4EV7-.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/the-modern-stack-why-less-is-more.mdoc":"chunks/the-modern-stack-why-less-is-more_BhYZch5l.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/scalability-and-flexibility-in-no-code-solutions.mdoc":"chunks/scalability-and-flexibility-in-no-code-solutions_Cmbn4XMj.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/how-to-create-an-effective-design-portfolio.mdoc":"chunks/how-to-create-an-effective-design-portfolio_C2Co5yzd.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/low-code-no-code-bridging-the-gap.mdoc":"chunks/low-code-no-code-bridging-the-gap_BZ7eGedf.mjs","D:/Main/04 Archive/Astro Blog Antigravity/src/content/posts/navigating-the-remote-work-landscape.mdoc":"chunks/navigating-the-remote-work-landscape_Dau3l1NG.mjs","D:/Main/04 Archive/Astro Blog Antigravity/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.qCw35azA.js","@astrojs/react/client.js":"_astro/client.BJGBxOWp.js","D:/Main/04 Archive/Astro Blog Antigravity/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts":"_astro/MainLayout.astro_astro_type_script_index_0_lang.BZTj09vj.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/Main/04 Archive/Astro Blog Antigravity/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts","const o=localStorage.getItem(\"theme\")||\"light\";document.documentElement.setAttribute(\"data-theme\",o);window.toggleTheme=function(){const t=document.documentElement.getAttribute(\"data-theme\")===\"dark\"?\"light\":\"dark\";document.documentElement.setAttribute(\"data-theme\",t),localStorage.setItem(\"theme\",t);const e=document.getElementById(\"theme-toggle\");e&&(e.innerHTML=t===\"dark\"?'<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"5\"/><path d=\"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42\"/></svg> Light':'<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"/></svg> Dark')};"]],"assets":["/_astro/_slug_.tAVmwA0Y.css","/favicon.ico","/favicon.svg","/_astro/client.BJGBxOWp.js","/_astro/index.BbrLBU_f.js","/_astro/keystatic-page.qCw35azA.js","/images/hero-nocode.jpg","/images/recent-design.jpg","/images/recent-dev.svg","/images/recent-strategy.svg","/images/trending-climate.jpg","/images/trending-finance.jpg","/images/trending-productivity.jpg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"0DnmU5r2opSeO0HpxRkIKOukN/yuBpsbsOjTcWm1rok=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
