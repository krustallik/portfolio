import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = await readFile(new URL("../public/social-preview.svg", import.meta.url));
const result = await sharp(source).png({ compressionLevel: 9, palette: true }).toFile(
  fileURLToPath(new URL("../public/social-preview.png", import.meta.url)),
);
console.log(`Rendered social preview: ${result.width}x${result.height}, ${result.size} bytes.`);
