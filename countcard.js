var count  = 0;

function cc (card){
    if(card === 2 ||card ===  3 ||card ===  4 ||card ===  5 ||card ===  6 ){
        count+= 1;
        return count + " Bet";

    }

    else if ( card === 7 ||card === 8 ||card === 9){
        count+= 0;
        return count + " Hold"
    }
    else{
        count += -1
        return count + " Hold"
    }
}
console.log(cc(10))