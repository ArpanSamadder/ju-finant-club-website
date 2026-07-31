import {createHash} from 'node:crypto';
import {access, mkdir, readdir, readFile, stat, writeFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const heroDir = path.join(root, 'public', 'images', 'hero');
const sourceDir = path.join(heroDir, 'source');
const encodedDir = path.join(heroDir, 'encoded');
const readyFile = path.join(encodedDir, 'desktop.ready.json');

const desktopOutputs = [
  {
    name: 'AVIF',
    chunksDir: path.join(encodedDir, 'desktop-avif'),
    output: path.join(heroDir, 'hero-desktop.avif'),
    expectedBytes: 66718,
    expectedSha256: 'd18b5dec150e9c708a9701ddadca6a632b139217b619f825fe09a8891fcf22d8',
  },
  {
    name: 'WebP',
    chunksDir: path.join(encodedDir, 'desktop-webp'),
    output: path.join(heroDir, 'hero-desktop.webp'),
    expectedBytes: 84356,
    expectedSha256: 'c74f6ed3068208d721c97dfe408798b325010798b442ac65c69612f0ad093233',
  },
];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function materializeDesktopAsset(asset) {
  const chunkNames = (await readdir(asset.chunksDir))
    .filter((name) => name.startsWith('part-'))
    .sort();

  if (chunkNames.length === 0) {
    throw new Error(`No encoded chunks found for desktop ${asset.name}.`);
  }

  const encodedParts = await Promise.all(
    chunkNames.map((name) => readFile(path.join(asset.chunksDir, name), 'utf8'))
  );
  const bytes = Buffer.from(encodedParts.join(''), 'base64');
  const sha256 = createHash('sha256').update(bytes).digest('hex');

  if (bytes.length !== asset.expectedBytes || sha256 !== asset.expectedSha256) {
    throw new Error(
      `Desktop ${asset.name} verification failed; received ${bytes.length} bytes and SHA-256 ${sha256}.`
    );
  }

  const metadata = await sharp(bytes, {failOn: 'error'}).metadata();
  if (metadata.width !== 1996 || metadata.height !== 788) {
    throw new Error(
      `Desktop ${asset.name} must be 1996x788; received ${metadata.width ?? 'unknown'}x${metadata.height ?? 'unknown'}.`
    );
  }

  await writeFile(asset.output, bytes);
  console.log(
    `[hero-assets] desktop ${asset.name}: 1996x788; ${bytes.length} bytes; SHA-256 ${sha256}`
  );
}

await mkdir(heroDir, {recursive: true});

if (await exists(readyFile)) {
  await Promise.all(desktopOutputs.map(materializeDesktopAsset));
} else {
  console.log('[hero-assets] desktop encoded bundle incomplete; preserving tracked desktop outputs.');
}

const mobileSource = path.join(sourceDir, 'hero-mobile.png');
const mobileAvif = path.join(heroDir, 'hero-mobile.avif');
const mobileWebp = path.join(heroDir, 'hero-mobile.webp');
const mobileImage = sharp(mobileSource, {failOn: 'error'});
const mobileMetadata = await mobileImage.metadata();

if (mobileMetadata.width !== 902 || mobileMetadata.height !== 1744) {
  throw new Error(
    `mobile hero source must be 902x1744; received ${mobileMetadata.width ?? 'unknown'}x${mobileMetadata.height ?? 'unknown'}.`
  );
}

await Promise.all([
  sharp(mobileSource, {failOn: 'error'})
    .avif({quality: 82, effort: 6, chromaSubsampling: '4:4:4'})
    .toFile(mobileAvif),
  sharp(mobileSource, {failOn: 'error'})
    .webp({quality: 88, effort: 6, smartSubsample: true})
    .toFile(mobileWebp),
]);

const [mobileAvifStats, mobileWebpStats] = await Promise.all([
  stat(mobileAvif),
  stat(mobileWebp),
]);
console.log(
  `[hero-assets] mobile: 902x1744; AVIF ${mobileAvifStats.size} bytes; WebP ${mobileWebpStats.size} bytes`
);
