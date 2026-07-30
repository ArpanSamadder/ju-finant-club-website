import {mkdir, stat} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'public', 'images', 'hero', 'source');
const outputDir = path.join(root, 'public', 'images', 'hero');

const assets = [
  {
    name: 'desktop',
    source: path.join(sourceDir, 'hero-desktop.png'),
    expectedWidth: 1996,
    expectedHeight: 788,
    avif: path.join(outputDir, 'hero-desktop.avif'),
    webp: path.join(outputDir, 'hero-desktop.webp'),
  },
  {
    name: 'mobile',
    source: path.join(sourceDir, 'hero-mobile.png'),
    expectedWidth: 941,
    expectedHeight: 1672,
    avif: path.join(outputDir, 'hero-mobile.avif'),
    webp: path.join(outputDir, 'hero-mobile.webp'),
  },
];

await mkdir(outputDir, {recursive: true});

for (const asset of assets) {
  const image = sharp(asset.source, {failOn: 'error'});
  const metadata = await image.metadata();

  if (metadata.width !== asset.expectedWidth || metadata.height !== asset.expectedHeight) {
    throw new Error(
      `${asset.name} hero source must be ${asset.expectedWidth}x${asset.expectedHeight}; received ${metadata.width ?? 'unknown'}x${metadata.height ?? 'unknown'}.`
    );
  }

  await Promise.all([
    sharp(asset.source, {failOn: 'error'})
      .avif({quality: 82, effort: 6, chromaSubsampling: '4:4:4'})
      .toFile(asset.avif),
    sharp(asset.source, {failOn: 'error'})
      .webp({quality: 88, effort: 6, smartSubsample: true})
      .toFile(asset.webp),
  ]);

  const [avifStats, webpStats] = await Promise.all([stat(asset.avif), stat(asset.webp)]);
  console.log(
    `[hero-assets] ${asset.name}: ${asset.expectedWidth}x${asset.expectedHeight}; AVIF ${avifStats.size} bytes; WebP ${webpStats.size} bytes`
  );
}
