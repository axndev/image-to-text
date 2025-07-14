const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// ✅ Load articles.json correctly
const posts = require('./public/articles.json');

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://proimagetotext.com' });

  // Static pages
  sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/privacy-policy', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/terms', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/blog', changefreq: 'weekly', priority: 0.8 });

  // ✅ Loop posts from JSON
  posts.forEach(post => {
    sitemap.write({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  sitemap.end();

  const sitemapXML = await streamToPromise(sitemap);

  // ✅ Save sitemap to /public
  createWriteStream('./public/sitemap.xml').write(sitemapXML);

  console.log('✅ Sitemap generated successfully!');
})();
