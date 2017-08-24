var count  = 0;

function cc (card){
 var action;
 if(card === 2 || card === 3 || card === 4 || card === 5 || card ===6){
     count +=1;
     action = 'Bet'
 }else if(card === 7 || card === 8 || card === 9){
     count += 0;
     action = 'Hold';
 }else if (card === 10 || card === 'J' || card === 'K'|| card === 'Q' || card === 'A'){
    count -= 1;
    action = 'Hold'
 }

 return count + " " + action;
}

console.log( cc(2), cc('J'), cc(9), cc(2), cc(7), );

