const fs = require("fs");
const path = require("path");
const { topicPages, categoryPages } = require("../pages/programmatic/content/pages-config");

const baseUrl = "https://aritrakrbasu.github.io/muse-moment";

// Static routes
const staticRoutes = [
  { path: "", changefreq: "weekly", priority: 1.0 },
  { path: "bff-party-game", changefreq: "monthly", priority: 0.9 },
  { path: "date-night-game", changefreq: "monthly", priority: 0.9 },
  { path: "couples-party-game", changefreq: "monthly", priority: 0.9 },
];

// Generate sitemap XML
function generateSitemap() {
  const urls = [];

  // Add static routes
  staticRoutes.forEach((route) => {
    const url = route.path ? `${baseUrl}/#/${route.path}` : baseUrl;
    urls.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
  });

  // Add topic pages
  topicPages.forEach((page) => {
    urls.push(`
  <url>
    <loc>${baseUrl}/#/${page.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  // Add category pages
  categoryPages.forEach((page) => {
    urls.push(`
  <url>
    <loc>${baseUrl}/#/${page.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}
</urlset>`;

  return sitemap;
}

// Write sitemap to public directory
function writeSitemap() {
  const sitemap = generateSitemap();
  const outputPath = path.join(__dirname, "../../public/sitemap.xml");

  fs.writeFileSync(outputPath, sitemap, "utf8");
  console.log("✅ Sitemap generated successfully at:", outputPath);
}

// Run if called directly
if (require.main === module) {
  writeSitemap();
}

module.exports = { generateSitemap, writeSitemap };
