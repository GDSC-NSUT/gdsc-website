// Syncs data/feeds.json from the public @gdgnsut Instagram profile using Apify.
// Env: APIFY_TOKEN (required). Usage: node scripts/sync-feeds.mjs
import fs from "node:fs/promises";
import path from "node:path";

const TOKEN = process.env.APIFY_TOKEN;
if (!TOKEN) {
  console.error("APIFY_TOKEN is not set; skipping feeds sync.");
  process.exit(1);
}
const USERNAME = "gdgnsut";
const ACTOR = "apify~instagram-profile-scraper";
const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "data/feeds.json");
const IMG_DIR = path.join(ROOT, "public/feeds");

const res = await fetch(
  `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?timeout=240`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ usernames: [USERNAME] }),
  }
);
if (!res.ok) throw new Error(`Apify ${res.status}: ${(await res.text()).slice(0, 500)}`);
const items = await res.json();
const posts = items.flatMap((i) => i.latestPosts ?? (i.shortCode ? [i] : []));
if (!posts.length) throw new Error("Apify returned no posts; output shape may have changed.");

const current = JSON.parse(await fs.readFile(DATA, "utf8"));
const shortcode = (url) => url.match(/\/(?:p|reel)\/([^/?]+)/)?.[1];
const known = new Set(current.feeds.map((f) => shortcode(f.link)));
let nextId = Math.max(0, ...current.feeds.map((f) => f.id)) + 1;

const CATEGORIES = [
  [/mentor/i, "Mentorship"],
  [/result|winner|congrat/i, "Announcements"],
];
const categorize = (c = "") => CATEGORIES.find(([re]) => re.test(c))?.[1] ?? "Announcements";
const titleOf = (c = "") => (c.split("\n")[0] || "Instagram post").replace(/\s+/g, " ").trim().slice(0, 80);
const time = (p) => Date.parse(p.timestamp ?? 0) || 0;

await fs.mkdir(IMG_DIR, { recursive: true });
const fresh = [];
for (const p of posts.sort((a, b) => time(a) - time(b))) {
  const code = p.shortCode;
  if (!code || known.has(code)) continue;
  if (!p.displayUrl) continue;
  const img = await fetch(p.displayUrl); // CDN URLs expire, so store a copy
  if (!img.ok) continue;
  const file = `ig-${code}.jpg`;
  await fs.writeFile(path.join(IMG_DIR, file), Buffer.from(await img.arrayBuffer()));
  fresh.unshift({
    id: nextId++,
    link: p.url || `https://www.instagram.com/p/${code}/`,
    image: `/feeds/${file}`,
    alt: titleOf(p.caption),
    category: categorize(p.caption),
  });
}

current.feeds = [...fresh, ...current.feeds];
await fs.writeFile(DATA, JSON.stringify(current, null, 4) + "\n");
console.log(`feeds: fetched ${posts.length}, added ${fresh.length}`);
