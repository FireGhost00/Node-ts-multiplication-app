import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const{b:base, l: limit, s: showTable} = yarg;

let outputMessage = '';


const HeaderMessage = `
==================================
    Table of ${base}
==================================\n
`;

for (let i = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = HeaderMessage + outputMessage;

if (showTable) console.log(outputMessage);

const outputPath = `outputs`;

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}
fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage);
console.log(`File table-${base}.txt created successfully in ${outputPath} folder`);