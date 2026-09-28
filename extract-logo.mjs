import fs from 'fs';

const svg = fs.readFileSync('public/aston_sprite.svg', 'utf8');
const logoMatch = svg.match(/<symbol[^>]*id=["']icon-logo["'][^>]*>([\s\S]*?)<\/symbol>/i);

if (logoMatch) {
  console.log('LOGO FULL SYMBOL:');
  console.log(logoMatch[0]);
} else {
  console.log('No logo match');
}
