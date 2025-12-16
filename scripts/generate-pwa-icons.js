import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');
const sourceIcon = path.join(iconsDir, 'icon.svg');

// Icon sizes needed for iOS and PWA
const sizes = [152, 167, 180, 192, 512];

async function generateIcons() {
  console.log('🎨 Generating PWA icons...\n');

  // Check if source icon exists
  if (!fs.existsSync(sourceIcon)) {
    console.error(`❌ Source icon not found: ${sourceIcon}`);
    process.exit(1);
  }

  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Generate PNG icons for each size
  for (const size of sizes) {
    const outputPath = path.join(iconsDir, `icon-${size}.png`);

    try {
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${size}x${size} icon: icon-${size}.png`);
    } catch (error) {
      console.error(`❌ Failed to generate ${size}x${size} icon:`, error.message);
      process.exit(1);
    }
  }

  console.log('\n✨ All icons generated successfully!');
}

generateIcons().catch(error => {
  console.error('❌ Icon generation failed:', error);
  process.exit(1);
});
