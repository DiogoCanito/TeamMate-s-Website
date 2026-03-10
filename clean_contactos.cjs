const fs = require('fs');
const file = './src/Contactos.tsx';
let content = fs.readFileSync(file, 'utf8');

// The replacement logic:
const importText = "import { Navbar, Testimonials, Footer } from './App';\nimport { UnderConstructionModal } from './components/UnderConstructionModal';";
content = content.replace("import { EtherealShadow } from './components/ui/etheral-shadow';", `${importText}\nimport { EtherealShadow } from './components/ui/etheral-shadow';`);

// Remove Navbar via regex match between block markers
content = content.replace(/\/\*\s*───\s*Navbar\s*─+\s*\*\/(.|\n)*?\/\*\s*───\s*Testimonials\s*─+\s*\*\//g, "/* ─── Testimonials ───────────────────────────────────── */");

// Remove Testimonials via regex match between block markers
content = content.replace(/\/\*\s*───\s*Testimonials\s*─+\s*\*\/(.|\n)*?\/\*\s*───\s*FAQ\s*─+\s*\*\//g, "/* ─── FAQ ────────────────────────────────────────────── */");

// Remove Footer via regex match between block markers down to Contact Section
content = content.replace(/\/\*\s*───\s*Footer\s*─+\s*\*\/(.|\n)*?\/\*\s*───\s*Contact Section\s*─+\s*\*\//g, "/* ─── Contact Section ────────────────────────────────── */");

// Add state to Contactos
content = content.replace(
  "const Contactos = () => {\n  const [isModalOpen, setIsModalOpen] = useState(false);",
  "const Contactos = () => {\n  const [isModalOpen, setIsModalOpen] = useState(false);\n  const [isUnderConstructionOpen, setIsUnderConstructionOpen] = useState(false);"
);

// Add the UnderConstructionModal component trigger inside Footer
content = content.replace(
  "<Footer />",
  "<Footer onOpenUnderConstruction={() => setIsUnderConstructionOpen(true)} />"
);

// Add the UnderConstructionModal component below LeadModal
content = content.replace(
  "<LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />",
  "<LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />\n      <UnderConstructionModal isOpen={isUnderConstructionOpen} onClose={() => setIsUnderConstructionOpen(false)} />"
);

fs.writeFileSync(file, content);
console.log("Contactos.tsx safely refactored!");
