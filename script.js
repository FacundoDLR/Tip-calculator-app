const billAmountInput = document.getElementById("billAmount");
const numPeopleInput = document.getElementById("numPeople");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("customTip");
const tipAmountPerPerson = document.getElementById("tipAmountPerPerson");
const totalAmountPerPerson = document.getElementById("totalAmountPerPerson");
const resetBtn = document.getElementById("resetBtn");

// var to store the values
let selectedTip = 0;
let customTip = 0;

const getBillAmount = () => parseFloat(billAmountInput.value) || 0;
const getNumPeople = () => parseInt(numPeopleInput.value) || 1;

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedTip = parseFloat(button.dataset.tip);
        console.log('selected tip: ' + selectedTip);
        calculate(); // recalculate with selctedTip

    });
})

customTipInput.addEventListener('input', function() {
    customTip = parseFloat(customTipInput.value) || 0; // get custom tip value
    console.log('Custom tip: ' + customTip);
    calculate(); // recalculate with custom tip
})


const calculate = () => {
    
    const billAmount = getBillAmount(); // Obtain total amount
    const numPeople = getNumPeople(); // Obtain N° people

    // Total without Tip
    const totalPerPerson = billAmount / numPeople;
    totalAmountPerPerson.textContent = `${totalPerPerson.toFixed(2)}`;

    if(customTip === 0 && selectedTip === 0){
        console.log('No tip has been selected.')
        return;
    }

    let tipAmount = 0;
    if(customTip > 0){
        tipAmount = customTip;
    }else if (selectedTip > 0 ) {
        tipAmount = (billAmount * selectedTip) / 100;
    }
    // Tip per Person
    const tipPerPerson = tipAmount / numPeople;
    tipAmountPerPerson.textContent = `${tipPerPerson.toFixed(2)}`;

    console.log('Tip per Person: ' + tipPerPerson.toFixed(2));
    console.log('Total per Person with tip : ' + (totalPerPerson + tipPerPerson).toFixed(2))
}


