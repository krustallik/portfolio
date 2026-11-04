import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "src/data/project-galleries.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
let totalSourceBytes = 0;
let totalOutputBytes = 0;
let imageCount = 0;

for (const [projectSlug, images] of Object.entries(manifest)) {
  for (const image of images) {
    const response = await fetch(image.sourceUrl, {
      headers: { "User-Agent": "Ihor-Havryliv-Portfolio-Gallery" },
    });
    if (!response.ok) {
      throw new Error(`Could not download ${image.sourceUrl}: HTTP ${response.status}`);
    }

    const source = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(source).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error(`Unsupported image at ${image.sourceUrl}`);
    }

    const outputPath = path.join(root, "public", image.src.replace(/^\//, ""));
    const thumbnailPath = outputPath.replace(/\.webp$/, "-thumb.webp");
    await mkdir(path.dirname(outputPath), { recursive: true });
    await sharp(source)
      .rotate()
      .webp({ quality: 84, effort: 5, smartSubsample: true })
      .toFile(outputPath);
    await sharp(source)
      .rotate()
      .resize({ width: 420, height: 420, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 70, effort: 4 })
      .toFile(thumbnailPath);

    const [outputStat, thumbnailStat, outputMetadata, thumbnailMetadata] = await Promise.all([
      stat(outputPath),
      stat(thumbnailPath),
      sharp(outputPath).metadata(),
      sharp(thumbnailPath).metadata(),
    ]);
    const publicRoot = path.join(root, "public");
    image.src = `/${path.relative(publicRoot, outputPath).split(path.sep).join("/")}`;
    image.thumbnail = `/${path.relative(publicRoot, thumbnailPath).split(path.sep).join("/")}`;
    image.width = outputMetadata.width;
    image.height = outputMetadata.height;
    image.thumbnailWidth = thumbnailMetadata.width;
    image.thumbnailHeight = thumbnailMetadata.height;
    image.orientation = outputMetadata.width >= outputMetadata.height ? "landscape" : "portrait";
    totalSourceBytes += source.byteLength;
    totalOutputBytes += outputStat.size + thumbnailStat.size;
    imageCount += 1;
    console.log(`${projectSlug}: ${path.basename(outputPath)} ${outputMetadata.width}×${outputMetadata.height} (${Math.round(source.byteLength / 1024)} KB → ${Math.round((outputStat.size + thumbnailStat.size) / 1024)} KB incl. thumbnail)`);
  }
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Optimized ${imageCount} screenshots: ${Math.round(totalSourceBytes / 1024)} KB source → ${Math.round(totalOutputBytes / 1024)} KB with thumbnails.`);
