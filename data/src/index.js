import fs from "fs";
import {parseCsv} from "./lib/csv.js";
import { filterRows, sortRows, stats, } from "./lib/ops.js";
import { clearScreenDown } from "readline";

const args = process.argv.slice(2);
const command = args[0];

function getArg(name){
    const index = args.indexOf(name);
    if(index === -1)
        return null;
    return args[index + 1];
}
if(!command || command === "help"){
    console.log(`Commands:
        stats --file <path> --column <name>
        filter --file <path> --column <name> --value <value>
        sort --file <path> --column <name> --order asc|desc
        export --file <path> --out <path>
    `);
    process.exit(0);
}
const filePath = getArg("--file");
    if (!filePath){
        console.error("Error: --file is required");
        process.exit(1);
    }
    const text = fs.readFileSync(filePath,"utf-8");
    let rows = parseCsv(text);
    if(command === "stats"){
        const column = getArg("--column");
        if(!column){
            console.error("Error: --column is required");
            process.exit(1);
        }
    }
    console.log(stats(rows ,column));

    if(command === "filter"){
        const column = getArg("--column");
        const value = getArg*("--value");
        
        if(!column || !value){
            console.error("Error: --column and --value are required");
            process.exit(1);
        }
        rows = filterRows(rows, column, value);
        console.log(rows);
    }
    if(command === "sort"){
        const column = getArg("--column");
        const order = getArg("--order") || "asc";
        
        if(!column){
            console.erro("Error: --column is required");
            process.exit(1);
        }
        rows = sortRows(rows, column, order);
        console.log(rows);
    }
    if(command === "export"){
        const outPath = getArg("--out");
        if(!outPath){
            console.error("Error: out is required");
            process.exit(1);
        }
        const header = Object.keys(rows[0]);
        const csv = [header.join(","), ...rows.map(r => header.map(h => r[h]).join(","))].join("\n");
        fs.writeFileSync(outPath, csv, "utf-8");
        console.log("Exported to ", outPath);
    }
