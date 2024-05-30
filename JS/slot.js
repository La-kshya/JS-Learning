const prompt=require("prompt-sync")();  

const ROWS=3;
const COLS=3;
const SymbolsCount={
    A: 2,
    B: 4,
    C: 6,
    D: 8
};
const Symbol_Values={
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

const money=() =>{
    while(true)
    {
        const amount=prompt("Enter the amount deposited here: ");
        const n_amount=parseFloat(amount);
        if(isNaN(n_amount)||n_amount<=0)
        console.log("Incorrect amount try again!! ");
        else
        return n_amount;
    }
};
const getlines=() =>{
    while(true)
    {
        const lines=prompt("Enter the no. of lines to bet ");
        const n_lines=parseInt(lines);
        if(isNaN(n_lines)||n_lines>3||n_lines<=0)
        console.log("Incorrect amount try again!! ");
        else
        return n_lines;
    }
};

const getbet=(balance,lines)=>{
    while(true)
    {
        const bet=prompt("Enter the bet per line amount: ");
        const n_bet=parseFloat(bet);
        if(isNaN(n_bet)||n_bet*lines>balance||n_bet<=0)
        console.log("Invalid bet!! ");
        else
        return n_bet;
    }
};
const spin=()=>
{
    const symbols=[];
    for(const[symbol,count] of Object.entries(SymbolsCount) )
    {
        for(let i=0;i<count;i++)
        {
            symbols.push(symbol);
        }
    }
    const reels=[];
    for (let i=0;i<COLS;i++)
    {
        reels.push([]);
        const reelsSymbols=[...symbols];
        for(let j=0;j<ROWS;j++)
        {
            const randomIndex=Math.floor(Math.random()*reelsSymbols.length);
            const selectedSymbol=reelsSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelsSymbols.splice(selectedSymbol,1)
        }
    }

    return reels;
};
const transpose=(reels)=>{
    const rows=[];
    for(let i=0;i<COLS;i++)
    {
        rows.push([]);
        for(let j=0;j<ROWS;j++)
        {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
const printRows=(rows)=>
{
    for(const row of rows)
    {
        let rowString="";
        for(const[i,symbol]of row.entries())
        {
                rowString+=symbol;
                if(i!=row.length-1)
                rowString+=" | ";
        }
        console.log(rowString);
    }

};
const getwinning=(rows,bet,lines)=>
{
    let winnings=0;
    for(let row=0;row<lines;row++)
    {
        const symbols=rows[row];
        let allSame=true;
        for(const symbol of symbols){
            if(symbol!=symbols[0])
            {
                allSame=false;
                break;
            }
        }
        if(allSame)
        {
            winnings+=bet*Symbol_Values[symbols[0]];
        }
    }
    return winnings;
}

const game=()=>{
    let balance=money();
    while(true)
    {
        console.log("You have "+balance+" $");

        const linesbet=getlines();
        const bet=getbet(balance,linesbet);
        balance-=bet*linesbet;
        const reels=spin();
        const rows=transpose(reels);
        //console.log(rows);
        printRows(rows);
        const winnings=getwinning(rows,bet,linesbet)
        balance+=winnings;
        console.log("You won, $    "+winnings);
        if(balance<=0)
        {
            console.log("You ran out of money!!");
            break;
        }

        const playagain= prompt("Play again (y/n) "); 
        if(playagain!="y")break;

    }

}
game();