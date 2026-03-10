const fs = require('fs');
const file = './src/Contactos.tsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

let startNavbar = -1;
let endNavbar = -1;
let startTestimonials = -1;
let endTestimonials = -1;
let startFooter = -1;
let endFooter = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('/* ─── Navbar ───')) startNavbar = i;
  if (lines[i].includes('/* ─── Testimonials ───')) {
    endNavbar = i; // End of Navbar is start of Testimonials
    startTestimonials = i;
  }
  if (lines[i].includes('/* ─── FAQ ───')) endTestimonials = i;
  if (lines[i].includes('/* ─── Footer ───')) startFooter = i;
  if (lines[i].includes('/* ─── Contact Section ───')) endFooter = i;
}

if (startNavbar === -1 || startTestimonials === -1 || startFooter === -1) {
  console.log("Could not find all blocks.");
  console.log({ startNavbar, startTestimonials, startFooter, endNavbar, endTestimonials, endFooter });
} else {
  const newLines = [];
  for (let i = 0; i < lines.length; i++) {
    // Skip Navbar block
    if (i >= startNavbar && i < endNavbar) continue;
    
    // Skip Testimonials block
    if (i >= startTestimonials && i < endTestimonials) continue;
    
    // Skip Footer block
    if (i >= startFooter && i < endFooter) continue;
    
    newLines.push(lines[i]);
  }
  fs.writeFileSync(file, newLines.join('\n'));
  console.log("Successfully removed duplicated blocks.");
}
