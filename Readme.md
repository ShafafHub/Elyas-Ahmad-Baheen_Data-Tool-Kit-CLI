# Data-Toolkit CLI

A lightweight command-line interface (CLI) for  working with CSV files, built using **Node.js**.
This tool allwos you to read CSV files, compute basic statistics, filter and sort rows, and export results to  a new CSV file.

## Features

- Read CSV files and parse them into an array of objects
- Compare simple statistics for numeric columns, min, max, avg
- Filter rows based on column values
- Sort rows in ascending or descending order
- Export CSV data to new file
- clear error messages for missing arguments ot invalid file path

## Prerequsisites

- Node.js >= 18
- npm or pnpm
- project structure:

data/
├─ package.json
├─ src/
│ ├─ index.js
│ └─ lib/
│ ├─ csv.js
│ └─ ops.js
└─ data/
└─ people.csv
____________________________________________________________________

Run the CLI using Node.js:
node src/index.js <command> [options]
____________________________________________________________________

## CLI Commands
Help
- Display availbale commands and usage exmaples:

npm start -- help


or simply:

node src/index.js
_________________________________________________________________________
## Stats
- Compute statistic (cont, min, max, avg) for a numeric column

npm start -- stats people.csv age
npm start -- stats people.csv city

OR

node src/index.js stats --file people.csv --column age

Example output:

{ "count": 8, "min": 19, "max": 42, "avg": 28 }
_________________________________________________________________________
## Filter
- Filter rows by a specific column value

npm start -- filter people.csv city Austin
npm start -- filter people.csv role Engineer
npm start -- filter people.csv age 24

OR

node src/index.js filter --file people.csv --column city --value Austin

Example output: an array of objects where city equals Austin
__________________________________________________________________________
## Sort
- Sort rows by a column

npm start -- sort people.csv age asc
npm start -- sort people.csv age desc
npm start -- sort people.csv name asc
npm start -- sort people.csv city desc

OR

node src/index.js sort --file people.csv --column age --order asc

-- oder is optional (default is "asc")

Ouput: array of objects sorted by the specified column
____________________________________________________________________________
## Export
- Export the current CSV data (original or filterd/sorted) to a new file

npm start -- sort people.csv age asc --out output.csv
npm start -- filter people.csv city Austin --out austin.csv
npm start -- stats people.csv age --out age-stats.csv

OR

node src/index.js export --file people.csv --out output.csv

Full Example: Sort + Export
- Sort by age ascending and export to a new CSV

node src/index.js sort --file people.csv --column age --order asc
node src/index.js export --file people.csv --out sorted_people.csv
_______________________________________________________________________________
## Important Notes
- File paths for --file and --out are relative to the current terminal location.
- Always provide --file for input CSV and --column for column-specific commands.
- Column names must exactly match the headers in your CSV.
- Numeric columns are automatically parsed for statistics.
_______________________________________________________________________________
## Project Structure:

src/
 ├─ index.js        ← Main CLI
 └─ lib/
     ├─ csv.js      ← CSV parser
     └─ ops.js      ← Functions: stats, filter, sort
data/
 └─ people.csv      ← Sample CSV file
package.json         ← Project configuration