import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'assets', 'images');
const LOGOS_DIR = path.join(__dirname, '..', 'public', 'assets', 'logos');

async function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else if (['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function convertToWebp(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;
  
  try {
    const inputBuffer = fs.readFileSync(filePath);
    const webpPath = filePath.replace(ext, '.webp');
    
    let buffer;
    if (ext === '.png') {
      buffer = await sharp(inputBuffer)
        .webp({ quality: 85, lossless: false, effort: 6 })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await sharp(inputBuffer, { limitInputPixels: false })
        .webp({ quality: 85, lossless: false, effort: 6 })
        .toBuffer();
    } else {
      return;
    }

    // Only replace if WebP is smaller or similar size
    if (buffer.length <= originalSize * 1.05) {
      fs.writeFileSync(webpPath, buffer);
      fs.unlinkSync(filePath);
      console.log(`✓ Converted: ${path.relative(IMAGES_DIR, filePath)} ${(originalSize/1024).toFixed(0)} KB → ${path.relative(IMAGES_DIR, webpPath)} ${(buffer.length/1024).toFixed(0)} KB (${((1 - buffer.length/originalSize) * 100).toFixed(1)}% reduction)`);
    } else {
      console.log(`⊘ Skipped (WebP larger): ${path.relative(IMAGES_DIR, filePath)} ${(originalSize/1024).toFixed(0)} KB → WebP would be ${(buffer.length/1024).toFixed(0)} KB`);
    }
  } catch (err) {
    console.error(`✗ Error converting ${path.relative(IMAGES_DIR, filePath)}:`, err.message);
  }
}

async function main() {
  console.log('Converting all PNG/JPG images to WebP...\n');
  
  const imageFiles = await getFiles(IMAGES_DIR);
  const logoFiles = await getFiles(LOGOS_DIR);
  const allFiles = [...imageFiles, ...logoFiles];
  
  console.log(`Found ${allFiles.length} images to convert:\n`);
  
  for (const file of allFiles) {
    await convertToWebp(file);
  }
  
  console.log('\nDone!');
}

main().catch(console.error);