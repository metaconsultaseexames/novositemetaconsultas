import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const BASE_URL = "https://clinicameta.com.br";

const slugify = (str) =>
  String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const url = (loc, lastmod, changefreq, priority) => {
  let entry = `  <url>\n    <loc>${loc}</loc>`;
  if (lastmod) entry += `\n    <lastmod>${lastmod}</lastmod>`;
  entry += `\n    <changefreq>${changefreq || "monthly"}</changefreq>`;
  entry += `\n    <priority>${priority || "0.5"}</priority>`;
  entry += `\n  </url>`;
  return entry;
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const [specialties, posts] = await Promise.all([
      base44.asServiceRole.entities.Specialty.list(),
      base44.asServiceRole.entities.BlogPost.list()
    ]);

    const staticPages = [
      ["/", "weekly", "1.0"],
      ["/especialidades", "weekly", "0.9"],
      ["/exames", "monthly", "0.8"],
      ["/quem-somos", "monthly", "0.7"],
      ["/blog", "weekly", "0.9"],
      ["/faq", "monthly", "0.6"],
      ["/agendamento", "monthly", "0.8"]
    ];

    const entries = [];

    for (const [path, freq, prio] of staticPages) {
      entries.push(url(BASE_URL + path, null, freq, prio));
    }

    const specialtyList = Array.isArray(specialties) ? specialties : (specialties?.content || []);
    for (const sp of specialtyList) {
      const slug = sp.slug || slugify(sp.name);
      if (slug) {
        const lastmod = sp.updated_date ? new Date(sp.updated_date).toISOString().split("T")[0] : null;
        entries.push(url(`${BASE_URL}/especialidade/${slug}`, lastmod, "monthly", "0.8"));
      }
    }

    const postList = Array.isArray(posts) ? posts : (posts?.content || []);
    const categories = new Set();
    for (const post of postList) {
      if (post.category) categories.add(slugify(post.category));
      const slug = post.slug || slugify(post.title);
      if (slug) {
        const lastmod = post.updated_date ? new Date(post.updated_date).toISOString().split("T")[0] : null;
        entries.push(url(`${BASE_URL}/blog/${slug}`, lastmod, "monthly", "0.6"));
      }
    }

    for (const cat of categories) {
      if (cat) entries.push(url(`${BASE_URL}/blog/${cat}`, null, "weekly", "0.7"));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});