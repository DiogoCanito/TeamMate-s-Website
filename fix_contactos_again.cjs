const fs = require('fs');

const file = './src/Contactos.tsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

// We need to keep lines 1 to 438, then skip lines 439 through 635, then keep 636 onwards.
// Wait, let's verify exact contents.
// Line 434-438:
//   <button ...> Tentar Novamente </button>
//   </motion.div>
//   )}

let cleanLines = [];
let i = 0;
while (i < lines.length) {
    if (i === 438) {
        // Skip from line 439 to 635 (inclusive, 0-indexed: 438 to 634)
        while (i < 635) {
            i++;
        }
    } else {
        cleanLines.push(lines[i]);
        i++;
    }
}

fs.writeFileSync(file, cleanLines.join('\n'));
console.log('Fixed Contactos.tsx');
