import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'assets', 'images');
const MAX_SIZE = 1024 * 1024; // 1MB

async function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else if (['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function compressImage(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size <= MAX_SIZE) {
    console.log(`✓ Already under 1MB: ${path.relative(IMAGES_DIR, filePath)} (${(stat.size/1024/1024).toFixed(2)} MB)`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const originalSize = stat.size;
  
  try {
    // Read file first to avoid file access issues
    const inputBuffer = fs.readFileSync(filePath);
    
    let buffer;
    const quality = 85;
    
    if (ext === '.png') {
      buffer = await sharp(inputBuffer)
        .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await sharp(inputBuffer, { limitInputPixels: false })
        .jpeg({ quality: 75, mozjpeg: true })
        .toBuffer();
    } else if (ext === '.webp') {
      buffer = await sharp(inputBuffer)
        .webp({ quality, lossless: false })
        .toBuffer();
    } else {
      return;
    }

    // If still over 1MB, reduce quality further
    let attempts = 0;
    while (buffer.length > MAX_SIZE && attempts < 5) {
      attempts++;
      const newQuality = Math.max(quality - attempts * 10, 50);
      
      if (ext === '.png') {
        buffer = await sharp(inputBuffer)
          .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true, colors: 256 })
          .toBuffer();
      } else if (ext === '.jpg' || ext === '.jpeg') {
        buffer = await sharp(inputBuffer, { limitInputPixels: false })
          .jpeg({ quality: newQuality, mozjpeg: true })
          .toBuffer();
      } else if (ext === '.webp') {
        buffer = await sharp(inputBuffer)
          .webp({ quality: newQuality })
          .toBuffer();
      }
    }

    // If still over 1MB, resize
    if (buffer.length > MAX_SIZE) {
      const ratio = Math.sqrt(MAX_SIZE / buffer.length);
      buffer = await sharp(inputBuffer, { limitInputPixels: false })
        .resize({ width: Math.round(1920 * ratio) })
        .jpeg({ quality: 75, mozjpeg: true })
        .toBuffer();
    }

    fs.writeFileSync(filePath, buffer);
    const newSize = buffer.length;
    console.log(`✓ Compressed: ${path.relative(IMAGES_DIR, filePath)} ${(originalSize/1024/1024).toFixed(2)} MB → ${(newSize/1024/1024).toFixed(2)} MB (${((1 - newSize/originalSize) * 100).toFixed(1)}% reduction)`);
  } catch (err) {
    console.error(`✗ Error compressing ${path.relative(IMAGES_DIR, filePath)}:`, err.message);
  }
}

async function main() {
  console.log('Scanning for images > 1MB...\n');
  const files = await getFiles(IMAGES_DIR);
  const largeFiles = [];
  
  for (const file of files) {
    const stat = fs.statSync(file);
    if (stat.size > MAX_SIZE) {
      largeFiles.push(file);
    }
  }
  
  console.log(`Found ${largeFiles.length} images > 1MB:\n`);
  
  for (const file of largeFiles) {
    await compressImage(file);
  }
  
  console.log('\nDone!');
}

main().catch(console.error);