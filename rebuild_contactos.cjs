const fs = require('fs');
const file = './src/Contactos.tsx';
let content = fs.readFileSync(file, 'utf8');

// The exact markers:
const navbarStart = '/* ─── Navbar ─────────────────────────────────────────── */';
const testimonialsStart = '/* ─── Testimonials ───────────────────────────────────── */';
const faqStart = '/* ─── FAQ ────────────────────────────────────────────── */';
const footerStart = '/* ─── Footer ─────────────────────────────────────────── */';
const contactSectionStart = '/* ─── Contact Section ────────────────────────────────── */';

// Slice out Navbar and Testimonials:
if (content.includes(navbarStart) && content.includes(faqStart)) {
  const startIdx = content.indexOf(navbarStart);
  const endIdx = content.indexOf(faqStart);
  if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
    content = content.slice(0, startIdx) + content.slice(endIdx);
  }
}

// Slice out Footer:
if (content.includes(footerStart) && content.includes(contactSectionStart)) {
  const startIdx = content.indexOf(footerStart);
  const endIdx = content.indexOf(contactSectionStart);
  if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
    content = content.slice(0, startIdx) + content.slice(endIdx);
  }
}

// Ensure the imports are present
if (!content.includes("import { Navbar, Testimonials, Footer } from './App';")) {
  content = content.replace(
    "import { EtherealShadow } from './components/ui/etheral-shadow';",
    "import { Navbar, Testimonials, Footer } from './App';\nimport { UnderConstructionModal } from './components/UnderConstructionModal';\nimport { EtherealShadow } from './components/ui/etheral-shadow';"
  );
}

// Add the state for UnderConstructionModal if missing
if (!content.includes('const [isUnderConstructionOpen')) {
  // Replace the first occurrence of state
  content = content.replace(
    /const \[isModalOpen,\s*setIsModalOpen\]\s*=\s*useState\(false\);/,
    "const [isModalOpen, setIsModalOpen] = useState(false);\n  const [isUnderConstructionOpen, setIsUnderConstructionOpen] = useState(false);"
  );
}

// Update Footer to include the onOpenUnderConstruction prop
content = content.replace(/<Footer\s*\/>/g, '<Footer onOpenUnderConstruction={() => setIsUnderConstructionOpen(true)} />');

// Insert UnderConstructionModal after LeadModal if not present
if (!content.includes('<UnderConstructionModal isOpen={isUnderConstructionOpen}')) {
  content = content.replace(
    /<LeadModal isOpen=\{isModalOpen\} onClose=\{\(\) => setIsModalOpen\(false\)\} \/>/,
    "<LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />\n      <UnderConstructionModal isOpen={isUnderConstructionOpen} onClose={() => setIsUnderConstructionOpen(false)} />"
  );
}

fs.writeFileSync(file, content);
console.log("Successfully rebuilt Contactos.tsx");
