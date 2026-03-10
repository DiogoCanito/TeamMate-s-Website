const fs = require('fs');
const content = fs.readFileSync('./src/Contactos.tsx', 'utf8');

let newContent = content.replace(
  "import { EtherealShadow } from './components/ui/etheral-shadow';",
  "import { Navbar, Testimonials, Footer } from './App';\nimport { UnderConstructionModal } from './components/UnderConstructionModal';\nimport { EtherealShadow } from './components/ui/etheral-shadow';"
);

newContent = newContent.replace(/\/\*\s*───\s*Navbar\s*───\s*\*\/(.|\n)*?\/\*\s*───\s*Testimonials\s*───\s*\*\//g, "/* ─── Testimonials ─── */");
newContent = newContent.replace(/\/\*\s*───\s*Testimonials\s*───\s*\*\/(.|\n)*?\/\*\s*───\s*FAQ\s*───\s*\*\//g, "/* ─── FAQ ─── */");
newContent = newContent.replace(/\/\*\s*───\s*Footer\s*───\s*\*\/(.|\n)*?\/\*\s*───\s*Contact Section\s*───\s*\*\//g, "/* ─── Contact Section ─── */");

newContent = newContent.replace(
  "const Contactos = () => {\n  const [isModalOpen, setIsModalOpen] = useState(false);",
  "const Contactos = () => {\n  const [isModalOpen, setIsModalOpen] = useState(false);\n  const [isUnderConstructionOpen, setIsUnderConstructionOpen] = useState(false);"
);

newContent = newContent.replace(
  "<Footer />",
  "<Footer onOpenUnderConstruction={() => setIsUnderConstructionOpen(true)} />"
);

newContent = newContent.replace(
  "<LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />",
  "<LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />\n      <UnderConstructionModal isOpen={isUnderConstructionOpen} onClose={() => setIsUnderConstructionOpen(false)} />"
);

fs.writeFileSync('./src/Contactos.tsx', newContent);
console.log("Contactos.tsx updated successfully!");
