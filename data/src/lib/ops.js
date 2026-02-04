//...stats Funvtion
export function stats(rows,column){
    let count = 0;
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    rows.forEach(row => {
        const value = Number(row[column]);
        if (Number.isNaN(value)) return;

        count++;
        sum += value;
        if(value < min) min = value;
        if(value > max ) max = value;

    });
    return{
        count,
        min,
        max,
        avg: count ? sum / count : 0
    };
}
//... Filter Function
export function filterRows(rows, column, value){
    return rows.filter(row =>
         row[column] === value || row[column].includes(value)
    );
}
//... Sort Function
    export function sortRows(rows,column, order ="asc"){
        return [...rows].sort((a, b) => {
            const A = a[column];
            const B = b[column];

            const nA = Number(A);
            const nB = Number(b);

            if(!Number.isNaN(nA) && !Number.isNaN(nB)){
                return order === "asc" ? nA - nB : nB -nA;
            }
            return order === "asc" ? A.localeCompare(B) : B.localeCompare(A)
        });

    }