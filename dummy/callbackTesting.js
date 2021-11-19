function calculate(a,b,subtract){
    console.log(a+b);
    let c=a-b;
    return subtract(c,b);
}

function subtract(a,b){
    console.log(a-b);
    return a-b
}

calculate(12,3,subtract);