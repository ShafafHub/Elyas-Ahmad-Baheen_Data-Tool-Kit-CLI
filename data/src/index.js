import fs from "fs";
import {parseCsv} from "./lib/csv.js";
import { stats, } from "./lib/ops.js";
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
