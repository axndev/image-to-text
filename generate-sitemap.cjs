const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://proimagetotext.com' });

  // ✅ Static pages
  sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/privacy-policy', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/terms', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/blog', changefreq: 'weekly', priority: 0.8 });

  // ✅ For /blog/:slug — add your actual blog articles below
  // Example: replace with real slugs if they exist
  sitemap.write({ url: '/blog/first-article', changefreq: 'monthly', priority: 0.6 });
  sitemap.write({ url: '/blog/second-article', changefreq: 'monthly', priority: 0.6 });

  sitemap.end();

  const sitemapXML = await streamToPromise(sitemap);
  createWriteStream('./public/sitemap.xml').write(sitemapXML);
})();
