//...stats Funvtion
export function stats(row,column){
    let count = 0;
    let min = Infinity;
    let max = Infinity;
    let sum = 0;
    rows.forEach(row => {
        const value = Number(row[column]);
        if (Number.isNaN(value));
        return;
        count++;
        sum += value;
        if(value < min) min = value;
        if(value > max ) max = value;

    });
    return{
        count,
        min,
        max,
        avg: count ? sum / count: 0
    };
}
