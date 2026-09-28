import fs from 'fs';

const html = fs.readFileSync('C:/Users/chira/.gemini/antigravity-ide/brain/4f4c7baa-cbf3-42a9-99ed-68ac1c148983/.system_generated/steps/104/content.md', 'utf8');

const regex = /DBX707[\s\S]{0,500}/gi;
let m;
let c = 0;
while ((m = regex.exec(html)) !== null && c < 5) {
  console.log('MATCH', c, ':');
  console.log(m[0].slice(0, 300));
  c++;
}
