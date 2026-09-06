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
        if (fullPath === outputRoot) {
          return [];
        }

        return walk(fullPath);
      }

      return [fullPath];
    })
  );

  return nestedFiles.flat();
}

async function optimizeFile(filePath) {
  const relativePath = path.relative(inputRoot, filePath);
  const extension = path.extname(relativePath).toLowerCase();

  if (![".jpg", ".jpeg"].includes(extension)) {
    return;
  }

  const outputDirectory = path.join(
    outputRoot,
    path.dirname(relativePath)
  );

  const fileName = path.basename(relativePath, extension);
  const webpPath = path.join(outputDirectory, `${fileName}.webp`);
  const avifPath = path.join(outputDirectory, `${fileName}.avif`);

  let needWebp = false;
  let needAvif = false;

  try {
    await fs.access(webpPath);
  } catch {
    needWebp = true;
  }

  try {
    await fs.access(avifPath);
  } catch {
    needAvif = true;
  }

  if (!needWebp && !needAvif) {
    // Оба формата уже есть — пропускаем файл
    return;
  }

  const image = sharp(filePath).rotate();

  if (needWebp) {
    await image
      .clone()
      .webp({
        quality: 75,
        effort: 4
      })
      .toFile(webpPath);

    console.log(`WebP: ${webpPath}`);
  }

  if (needAvif) {
    await image
      .clone()
      .avif({
        quality: 65,
        effort: 6
      })
      .toFile(avifPath);

    console.log(`AVIF: ${avifPath}`);
  }
}

const files = await walk(inputRoot);

console.log(`Найдено JPG/JPEG файлов: ${files.length}`);

let processedCount = 0;

for (const filePath of files) {
  const relativePath = path.relative(inputRoot, filePath);
  const outputDirectory = path.join(
    outputRoot,
    path.dirname(relativePath)
  );
  const fileName = path.basename(relativePath, path.extname(relativePath));
  const webpPath = path.join(outputDirectory, `${fileName}.webp`);
  const avifPath = path.join(outputDirectory, `${fileName}.avif`);

  const hasWebp = await fs.access(webpPath).then(() => true).catch(() => false);
  const hasAvif = await fs.access(avifPath).then(() => true).catch(() => false);

  if (!hasWebp || !hasAvif) {
    processedCount++;
    await optimizeFile(filePath);
  }
}

console.log(`Файлов требовали обработки: ${processedCount} из ${files.length}`);
console.log("Оптимизация завершена.");