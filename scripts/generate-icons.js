/**
 * Script to generate PWA icons
 *
 * This creates simple placeholder icons. For production, you should:
 * 1. Use an online tool like https://realfavicongenerator.net/
 * 2. Use ImageMagick: convert -background none -resize 192x192 icon.svg icon-192.png
 * 3. Or replace these with your custom designed icons
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [152, 167, 180, 192, 512];
const iconsDir = path.join(__dirname, '../public/icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create simple SVG icons with different sizes
sizes.forEach(size => {
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="#1976d2"/>
  <path d="M256 96L96 216V416H208V304H304V416H416V216L256 96Z" fill="white"/>
  <rect x="228" y="350" width="56" height="12" fill="#90CAF9"/>
  <rect x="228" y="376" width="56" height="12" fill="#90CAF9"/>
  <rect x="228" y="402" width="56" height="12" fill="#90CAF9"/>
</svg>`;

  fs.writeFileSync(path.join(iconsDir, `icon-${size}.svg`), svg);
  console.log(`Created icon-${size}.svg`);
});

console.log('\nSVG icons created!');
console.log('\nFor best results, convert these to PNG using:');
console.log('1. An online tool like https://realfavicongenerator.net/');
console.log('2. ImageMagick: for i in public/icons/*.svg; do convert -background none "$i" "${i%.svg}.png"; done');
console.log('3. Or use the SVG files directly (most modern browsers support SVG icons)');
console.log('\nNote: For iOS, PNG format is recommended for better compatibility.');
