import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputRoot = "assets/images";
const outputRoot = "assets/images/optimized";

async function walk(directory) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true
  });

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        if (path.resolve(fullPath) === path.resolve(outputRoot)) {
          return [];
        }
        return walk(fullPath);
      }

      return [fullPath];
    })
  );

  return nested.flat();
}

const files = await walk(inputRoot);

const imageFiles = files.filter((filePath) =>
  [".jpg", ".jpeg"].includes(
    path.extname(filePath).toLowerCase()
  )
);

let created = 0;
let skipped = 0;

for (const filePath of imageFiles) {
  const relativePath = path.relative(inputRoot, filePath);
  const extension = path.extname(relativePath).toLowerCase();
  const fileName = path.basename(relativePath, extension);

  const outputDirectory = path.join(
    outputRoot,
    path.dirname(relativePath)
  );

  const webpPath = path.join(
    outputDirectory,
    `${fileName}.webp`
  );

  const avifPath = path.join(
    outputDirectory,
    `${fileName}.avif`
  );

  const webpExists = await fs
    .access(webpPath)
    .then(() => true, () => false);

  const avifExists = await fs
    .access(avifPath)
    .then(() => true, () => false);

  if (webpExists && avifExists) {
    skipped += 1;
    continue;
  }

  await fs.mkdir(outputDirectory, {
    recursive: true
  });

  const image = sharp(filePath).rotate();

  if (!webpExists) {
    await image
      .clone()
      .webp({ quality: 75, effort: 4 })
      .toFile(webpPath);
  }

  if (!avifExists) {
    await image
      .clone()
      .avif({ quality: 65, effort: 6 })
      .toFile(avifPath);
  }

  console.log(`Готово: ${relativePath}`);
  created += 1;
}

console.log(`Обработано новых: ${created}`);
console.log(`Пропущено (уже есть): ${skipped}`);
console.log("Оптимизация завершена.");