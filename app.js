const display=document.querySelector(".calculator-input");
const keys=document.querySelector(".calculator-keys");

let displayValue = '0';
let firstValue=null;
let operator=null;
let waitingForSecondValue=false;

// assign the value to the display value

const updateDisplay = () => { display.value = displayValue}

// get respond when you click on calculator-keys area
keys.addEventListener('click',function(e){
    const element=e.target;

// we check if the element is button or not
    if(!element.matches('button')) return;

// check element s classlist if it is operator or button and display the element's value
    if(element.classList.contains('operator')) {
        //console.log('operator',element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }
    
    if(element.classList.contains('decimal')) {
       // console.log('operator',element.value);
       inputDecimal();
       updateDisplay();
        return;
    }   
        if(element.classList.contains('clear')) {
            //console.log('operator',element.value);
            clear();
            updateDisplay();
            return;
    }       
    // console.log('number',element.value);
    inputNumber(element.value);
    updateDisplay();
    });

function handleOperator(nextOperator) {
    const value=parseFloat(displayValue);

    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if(firstValue===null) {
        firstValue=value;
    } else if (operator) {
        const result=calculate(firstValue,value,operator)

        displayValue=`${parseFloat(result.toFixed(7))}`;
        firstValue=result;
    }

    function calculate(first,second,operator) {
        if(operator=='+'){
            return first + second;
        } else if (operator=== '-') {
            return first - second;
        } else if (operator === '*') {
            return first * second
        } else if (operator === '/') {
            return first / second;
        }
        return second;
    }

    waitingForSecondValue=true;
    operator=nextOperator;

    console.log(displayValue,firstValue,operator,waitingForSecondValue);

} 

// send number's value to the display screen
function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue=num;
        waitingForSecondValue=false;
    } else {
        displayValue=displayValue==='0'? num:displayValue+num;   // type control
    }
    console.log(displayValue,firstValue,operator,waitingForSecondValue);
}

//function checks if it includes "." 
function inputDecimal() {
    if(!displayValue.includes('.')){
        displayValue += '.' ;
    }   
}


function clear() {
    displayValue='0'
}
