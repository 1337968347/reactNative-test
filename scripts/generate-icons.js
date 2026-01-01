const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const ICON_PATH = path.join(__dirname, '../icon.png');
const ANDROID_RES_PATH = path.join(__dirname, '../android/app/src/main/res');
const IOS_ICON_SET_PATH = path.join(__dirname, '../ios/AwesomeProject/Images.xcassets/AppIcon.appiconset');

const androidSizes = [
  { density: 'mdpi', size: 48 },
  { density: 'hdpi', size: 72 },
  { density: 'xhdpi', size: 96 },
  { density: 'xxhdpi', size: 144 },
  { density: 'xxxhdpi', size: 192 },
];

async function generate() {
  if (!fs.existsSync(ICON_PATH)) {
    console.error('Error: icon.png not found in project root. Please place a 1024x1024 icon.png in the root directory.');
    process.exit(1);
  }

  console.log('Reading icon.png...');
  const image = await Jimp.read(ICON_PATH);
  
  // Android
  console.log('Generating Android icons...');
  for (const config of androidSizes) {
    const dir = path.join(ANDROID_RES_PATH, `mipmap-${config.density}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    // Standard
    const icon = image.clone().resize({ w: config.size, h: config.size });
    await icon.write(path.join(dir, 'ic_launcher.png'));
    
    // Round icon
    const roundIcon = image.clone().resize({ w: config.size, h: config.size }).circle();
    await roundIcon.write(path.join(dir, 'ic_launcher_round.png'));
    console.log(`  Generated mipmap-${config.density}`);
  }

  // iOS
  console.log('Generating iOS icons...');
  const contentsPath = path.join(IOS_ICON_SET_PATH, 'Contents.json');
  if (fs.existsSync(contentsPath)) {
    const contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));
    
    for (const img of contents.images) {
      if (!img.size || !img.scale) continue;
      
      const sizeBase = parseFloat(img.size.split('x')[0]);
      const scaleStr = img.scale || '1x';
      const scale = parseFloat(scaleStr.replace('x', ''));
      const size = Math.round(sizeBase * scale);
      const filename = `icon-${sizeBase}@${scaleStr}.png`;
      
      // Skip if size is invalid
      if (isNaN(size)) continue;

      console.log(`  Resizing to ${size}x${size} for ${filename}`);
      const icon = image.clone().resize({ w: size, h: size });
      await icon.write(path.join(IOS_ICON_SET_PATH, filename));
      
      img.filename = filename; // Update JSON
    }
    
    fs.writeFileSync(contentsPath, JSON.stringify(contents, null, 2));
    console.log('iOS icons generated and Contents.json updated.');
  } else {
    console.error('Error: iOS Contents.json not found at ' + contentsPath);
  }
  
  console.log('Done! Icons generated successfully.');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
