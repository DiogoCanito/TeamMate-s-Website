const fs = require('fs');

const file = './src/Contactos.tsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const newLines = [];
let i = 0;
while (i < lines.length) {
    // skip Navbar (lines 54-169, which is index 53 to 168)
    if (i >= 53 && i <= 168) { i++; continue; }
    // skip Testimonials (171-357, index 170 to 356)
    if (i >= 170 && i <= 356) { i++; continue; }
    // skip Footer (429-528, index 428 to 527)
    if (i >= 428 && i <= 527) { i++; continue; }
    
    newLines.push(lines[i]);
    i++;
}

fs.writeFileSync(file, newLines.join('\n'));
console.log('Removed duplicate declarations!');
