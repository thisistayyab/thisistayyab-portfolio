/**
 * Optimize portfolio images → AVIF + WebP (run: node scripts/optimize-images.mjs)
 * Requires ffmpeg with libaom-av1 and libwebp.
 */
import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const publicDir = path.join(root, "public", "images")

const featuredSource = path.join(publicDir, "featured-hero-source.png")

const jobs = []

const projectDir = path.join(publicDir, "projects")
const projectSources = fs.readdirSync(projectDir).filter((f) => /\.(png|jpe?g)$/i.test(f))

for (const file of projectSources) {
  jobs.push({
    input: path.join(projectDir, file),
    outBase: path.join(projectDir, path.parse(file).name),
    maxWidth: 1280,
    avifCrf: 30,
    webpQuality: 82,
  })
}

const testimonialDir = path.join(publicDir, "testimonials")
if (fs.existsSync(testimonialDir)) {
  for (const file of fs.readdirSync(testimonialDir).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    jobs.push({
      input: path.join(testimonialDir, file),
      outBase: path.join(testimonialDir, path.parse(file).name),
      maxWidth: 640,
      avifCrf: 32,
      webpQuality: 84,
    })
  }
}

function run(cmd) {
  execSync(cmd, { stdio: "inherit" })
}

for (const job of jobs) {
  if (!fs.existsSync(job.input)) {
    console.warn(`skip (missing): ${job.input}`)
    continue
  }
  const avif = `${job.outBase}.avif`
  const webp = `${job.outBase}.webp`
  const scale = `scale='min(${job.maxWidth},iw)':-2`

  console.log(`\n→ ${path.basename(job.input)}`)

  run(
    `ffmpeg -y -hide_banner -loglevel error -i "${job.input}" -vf "${scale}" -frames:v 1 -c:v libaom-av1 -still-picture 1 -crf ${job.avifCrf} -b:v 0 "${avif}"`,
  )
  run(
    `ffmpeg -y -hide_banner -loglevel error -i "${job.input}" -vf "${scale}" -frames:v 1 -c:v libwebp -quality ${job.webpQuality} "${webp}"`,
  )
}

if (fs.existsSync(featuredSource)) {
  const ogCrop = "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630"
  const ogJpg = path.join(publicDir, "og.jpg")
  const ogWebp = path.join(publicDir, "og.webp")
  const ogAvif = path.join(publicDir, "og.avif")

  console.log(`\n→ featured-hero-source.png (OG 1200×630)`)
  run(
    `ffmpeg -y -hide_banner -loglevel error -i "${featuredSource}" -vf "${ogCrop}" -frames:v 1 -q:v 3 "${ogJpg}"`,
  )
  run(
    `ffmpeg -y -hide_banner -loglevel error -i "${featuredSource}" -vf "${ogCrop}" -frames:v 1 -c:v libwebp -quality 85 "${ogWebp}"`,
  )
  run(
    `ffmpeg -y -hide_banner -loglevel error -i "${featuredSource}" -vf "${ogCrop}" -frames:v 1 -c:v libaom-av1 -still-picture 1 -crf 28 "${ogAvif}"`,
  )
} else {
  console.warn(`skip featured OG (missing): ${featuredSource}`)
}

console.log("\nDone.")
