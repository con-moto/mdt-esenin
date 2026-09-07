import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputRoot = "assets/images";
const outputRoot = "assets/images/optimized";

async function walk(directory) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true
  });

  const nestedFiles = await Promise.all(
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

  return nestedFiles.flat();
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
}

async function optimizeFile(filePath) {
  const relativePath = path.relative(inputRoot, filePath);
  const extension = path.extname(relativePath).toLowerCase();

  if (![".jpg", ".jpeg"].includes(extension)) {
    return false;
  }

  const outputDirectory = path.join(
    outputRoot,
    path.dirname(relativePath)
  );

  const fileName = path.basename(relativePath, extension);

  const webpPath = path.join(
    outputDirectory,
    `${fileName}.webp`
  );

  const avifPath = path.join(
    outputDirectory,
    `${fileName}.avif`
  );

  const hasWebp = await fileExists(webpPath);
  const hasAvif = await fileExists(avifPath);

  if (hasWebp && hasAvif) {
    return false;
  }

  /* Создаёт в том числе вложенные директории:
     assets/images/optimized/diploma/
     assets/images/optimized/actors/
     assets/images/optimized/repertoire/[название спектакля]/ */
  await fs.mkdir(outputDirectory, {
    recursive: true
  });

  const image = sharp(filePath).rotate();

  if (!hasWebp) {
    await image
      .clone()
      .webp({
        quality: 75,
        effort: 4
      })
      .toFile(webpPath);

    console.log(`WebP: ${webpPath}`);
  }

  if (!hasAvif) {
    await image
      .clone()
      .avif({
        quality: 65,
        effort: 6
      })
      .toFile(avifPath);

    console.log(`AVIF: ${avifPath}`);
  }

  return true;
}

const files = await walk(inputRoot);

const imageFiles = files.filter((filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  return [".jpg", ".jpeg"].includes(extension);
});

console.log(`Найдено JPG/JPEG файлов: ${imageFiles.length}`);

let processedCount = 0;

for (const filePath of imageFiles) {
  const wasProcessed = await optimizeFile(filePath);

  if (wasProcessed) {
    processedCount += 1;
  }
}

console.log(
  `Файлов требовали обработки: ${processedCount} из ${imageFiles.length}`
);

console.log("Оптимизация завершена.");