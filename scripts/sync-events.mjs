// Syncs data/events.json from the GDG on Campus NSUT chapter (gdg.community.dev).
// Usage: node scripts/sync-events.mjs   (optional env: GDG_CHAPTER_ID to skip auto-detection)
import fs from "node:fs/promises";
import path from "node:path";

const CHAPTER_URL =
  "https://gdg.community.dev/gdg-on-campus-netaji-subhas-university-of-technology-delhi-india/";
const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "data/events.json");
const IMG_DIR = path.join(ROOT, "public/events");
const UA = "gdg-nsut-website-sync/1.0";

const SOCIAL = {
  instagram: "https://instagram.com/gdgnsut",
  github: "https://github.com/GDSC-NSUT",
  linkedin: "https://www.linkedin.com/company/gdgnsut/",
  discord: "https://discord.gg/WtqbaUzgR",
};

const get = (url) => fetch(url, { headers: { "User-Agent": UA } });

async function findChapterId() {
  if (process.env.GDG_CHAPTER_ID) return process.env.GDG_CHAPTER_ID;
  const html = await (await get(CHAPTER_URL)).text();
  const m =
    html.match(/for_chapter\/(\d+)/) ||
    html.match(/["']?chapter_?[iI]d["']?\s*[:=]\s*["']?(\d+)/) ||
    html.match(/\/chapters\/(\d+)/);
  if (!m) throw new Error("Could not detect chapter id; set GDG_CHAPTER_ID (see the Network tab on the chapter page).");
  return m[1];
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function fmt(iso, tz = "Asia/Kolkata") {
  const d = new Date(iso);
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: tz, day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true,
    }).formatToParts(d).map((x) => [x.type, x.value])
  );
  return {
    date: `${p.day} ${p.month.toUpperCase()}`,
    time: `${p.hour}:${p.minute} ${p.dayPeriod.toUpperCase()}`,
  };
}

async function fetchAll(id) {
  let url = `https://gdg.community.dev/api/event_slim/for_chapter/${id}/?page_size=50&status=Published&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=-start_date`;
  const out = [];
  while (url) {
    const res = await get(url);
    if (!res.ok) throw new Error(`API ${res.status} for ${url}`);
    const j = await res.json();
    out.push(...(j.results ?? []));
    url = j.links?.next ?? null;
  }
  return out;
}

async function saveImage(src, name) {
  if (!src) return null;
  const ext = (new URL(src).pathname.match(/\.(png|jpe?g|webp)$/i)?.[0] ?? ".jpg").toLowerCase();
  const file = `${name}${ext}`;
  const res = await get(src);
  if (!res.ok) return null;
  await fs.mkdir(IMG_DIR, { recursive: true });
  await fs.writeFile(path.join(IMG_DIR, file), Buffer.from(await res.arrayBuffer()));
  return `/events/${file}`;
}

const id = await findChapterId();
const remote = await fetchAll(id);
const current = JSON.parse(await fs.readFile(DATA, "utf8"));
const byTitle = new Map(current.events.map((e) => [e.title.trim().toLowerCase(), e]));

let added = 0;
for (const ev of remote) {
  const key = ev.title.trim().toLowerCase();
  if (ev.is_hidden || byTitle.has(key)) continue; // never overwrite hand-edited entries
  const { date, time } = fmt(ev.start_date, ev.event_timezone || "Asia/Kolkata");
  const image =
    (await saveImage(ev.cropped_picture_url || ev.picture, `gdg-${slug(ev.title)}`)) ||
    "/events/event-1.webp";
  const location = ev.audience_type === "ONLINE" ? "Online" : "NSUT, Delhi";
  const entry = {
    image, time, date,
    title: ev.title,
    description: (ev.description_short || "").trim().replace(/^(.{140}\S*).*$/s, "$1…") || ev.title,
    location,
    eventType: "Event",
    socialLinks: SOCIAL,
    startDate: ev.start_date,
    url: ev.static_url,
  };
  current.events.unshift(entry);
  byTitle.set(key, entry);
  added++;
}

// Newest first (entries without startDate keep their relative position at the end)
const ts = (e) => (e.startDate ? Date.parse(e.startDate) : -Infinity);
current.events.sort((a, b) => ts(b) - ts(a));

await fs.writeFile(DATA, JSON.stringify(current, null, 2) + "\n");
console.log(`events: fetched ${remote.length}, added ${added}`);
