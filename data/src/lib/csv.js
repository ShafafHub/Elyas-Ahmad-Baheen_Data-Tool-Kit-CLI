export function parseCsv(text){
    if(!text.trim()) return[];

const lines = text.trim().split(/\r?\n/);
const header = lines[0].split(",")

//... Map Remaining Lines To Objects Using Header Names as Keys
return lines.slice(1).map(line => {
    const values = line.split(",");
    const row = {};

    header.forEach((header, i) => {
    row[header] = values[i];
    });
    return row;
    
    });
}