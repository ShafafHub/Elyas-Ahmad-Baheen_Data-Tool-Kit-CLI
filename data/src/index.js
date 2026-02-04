#!/usr/bin/env node
import fs from 'fs';
import { parseCsv } from './lib/csv.js';
import { filterRows, sortRows, stats } from './lib/ops.js';

const args = process.argv.slice(2);
const command = args[0];

function getArg(name) {
  const i = args.indexOf(name);
  if (i === -1) return null;
  return args[i + 1];
}

function positional(i) {
  return args[i] ?? null;
}
// --- Help ---
if (!command || command === 'help') {
    console.log(`
Commands:

    stats --file <path> --column <name>
        Show basic stats (Count, Min, Max, Avg) for a numeric column.


    filter --file <path> --column <name> --value <value>
        Show rows where the column equals the given value.


    sort --file <path> --column <name> --order asc|desc
        Sort rows by the specified column in ascending or descending order.


    Use --out <path> with any command to save the output to a CSV file.

Examples:

  npm start -- stats people.csv age
  npm start -- stats people.csv city

  npm start -- filter people.csv city Austin
  npm start -- filter people.csv role Engineer
  npm start -- filter people.csv age 24

  npm start -- sort people.csv age asc
  npm start -- sort people.csv age desc
  npm start -- sort people.csv name asc
  npm start -- sort people.csv city desc

  npm start -- sort people.csv age asc --out output.csv
  npm start -- filter people.csv city Austin --out austin.csv
  npm start -- stats people.csv age --out age-stats.csv

  npm start -- help
`);
    process.exit(0);
}
// --- File check ---
const filePath = getArg('--file') || positional(1);
    if (!filePath) {
        console.error('Error: --file is required');
        process.exit(1);
    }
// --- Read CSV ---
let text;
try {
  text = fs.readFileSync(filePath, 'utf-8');
} catch (err) {
  console.error('Error reading file:', err.message);
  process.exit(1);
}
// --- Parse CSV ---
let rows = parseCsv(text);

// --- Stats command ---
    if (command === 'stats') {
        const column = getArg('--column') || positional(2);
        if (!column) {
            console.error('Error: --column is required');
            process.exit(1);
        }
        console.log(stats(rows, column));
    }
    
// --- Filter command ---
    if (command === 'filter') {
        const column = getArg('--column') || positional(2);
        const value = getArg('--value') || positional(3);
        
        if (!column || !value) {
            console.error('Error: --column and --value are required');
            process.exit(1);
        }
        rows = filterRows(rows, column, value);
        console.log(rows);
    }
// --- sort command ---
    if (command === 'sort') {
        const column = getArg('--column') || positional(2);
        const order = getArg('--order') || positional(3) || 'asc';
        
        if (!column) {
            console.error('Error: --column is required');
            process.exit(1);
        }
        rows = sortRows(rows, column, order);
        console.log(rows);
    }
// --- Export command ---
    if (command === 'export') {
        const outPath = getArg('--out');

        if (!outPath) {
            console.error('Error: out is required');
            process.exit(1);
        }

        const header = Object.keys(rows[0]);
        const csv = [header.join(','), ...rows.map((r) => header.map((h) => r[h]).join(','))].join('\n');

        fs.writeFileSync(outPath, csv, 'utf-8');
        console.log('Exported to ', outPath);
    }