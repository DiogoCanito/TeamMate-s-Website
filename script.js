import fs from 'fs';

let content = fs.readFileSync('src/RadMate.tsx', 'utf8');

// Replace standard colors with CSS variables or variables
content = content.replace(/bg-\[#0a0a0a\]/g, 'bg-background');
content = content.replace(/bg-\[#111111\]/g, 'bg-surface');
content = content.replace(/bg-\[#111318\]/g, 'bg-surface');
content = content.replace(/bg-\[#0f1117\]/g, 'bg-surface-hover');
content = content.replace(/text-white/g, 'text-text-main');
content = content.replace(/border-white\/(\d+)/g, 'border-border');
content = content.replace(/bg-white\/(\d+)/g, 'bg-black/5');
content = content.replace(/text-gray-400/g, 'text-text-muted');
content = content.replace(/text-gray-300/g, 'text-text-muted');
content = content.replace(/text-gray-500/g, 'text-text-muted/80');

// Component Name
content = content.replace(/export default function App\(\)/g, 'export default function RadMate()');
content = content.replace(/<div className="min-h-screen/g, '<div className="radmate-theme min-h-screen');

// TeamMate -> RadMate references (only in certain text, not classes)
content = content.replace(/TeamMate/g, 'RadMate');
content = content.replace(/TeaMate/g, 'RadMate');

// Logo replacement: Replace <img src="/images/Logo TeamMate.svg"... /> with text
content = content.replace(/<img\s+src="\/images\/Logo TeamMate\.svg"[\s\S]*?\/>/g, '<span className="text-2xl font-bold text-primary">RadMate</span>');
content = content.replace(/<img\s+src="\/images\/Logo RadMate\.svg"[\s\S]*?\/>/g, '<span className="text-2xl font-bold text-primary">RadMate</span>');

fs.writeFileSync('src/RadMate.tsx', content);

console.log('Script ran successfully');
