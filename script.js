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

const getBillAmount = () => {
    const value = parseFloat(billAmountInput.value) || 0;
    return value >= 0 ? value : 0; // If the value is negative, we convert it to 0
}
const getNumPeople = () => {
    const value = parseInt(numPeopleInput.value) || 1;
    return value >= 1 ? value : 1; // If the number of people is less than 1, we convert it to 1
}

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedTip = parseFloat(button.dataset.tip);
        customTipInput.value = '';
        customTip = 0;
        console.log('selected tip: ' + selectedTip);
        calculate(); // recalculate with selctedTip
    });
})

customTipInput.addEventListener('input', function () {
    customTip = parseFloat(customTipInput.value) || 0; // get custom tip value
    if (customTip < 0) {
        customTip = 0;
        customTipInput.value = '0';
    }

    if (customTip === 0) {
        selectedTip = 0; // Reset selected tip
        tipButtons.forEach(btn => btn.classList.remove('active')); // Uncheck all buttons
    }
    console.log('Custom tip: ' + customTip);
    calculate(); // recalculate with custom tip
})

billAmountInput.addEventListener('input', () => {
    calculate();
})

numPeopleInput.addEventListener('input', () => {
    calculate();
})

const calculate = () => {

    const billAmount = getBillAmount(); // Obtain total amount
    const numPeople = getNumPeople(); // Obtain N° people

    // Total without Tip
    const totalPerPerson = billAmount / numPeople;
    if (!customTip && customTip === 0) {
        totalAmountPerPerson.textContent = `${totalPerPerson.toFixed(2)}`;

    }

    let tipAmount = 0;
    if (customTip > 0) {
        tipAmount = (billAmount * customTip) / 100;
    } else if (selectedTip > 0) {
        tipAmount = (billAmount * selectedTip) / 100;
    }
    // Tip per Person
    const tipPerPerson = tipAmount / numPeople;
    tipAmountPerPerson.textContent = `${tipPerPerson.toFixed(2)}`;

    console.log('Tip per Person: ' + tipPerPerson.toFixed(2));
    console.log('Total per Person with tip : ' + (totalPerPerson + tipPerPerson).toFixed(2))
}

resetBtn.addEventListener("click", () => {
    // Reset all field values
    billAmountInput.value = '';
    numPeopleInput.value = 1;
    customTipInput.value = '0';
    customTip = 0;
    selectedTip = 0;
    tipButtons.forEach(button => button.classList.remove("active"));
    tipAmountPerPerson.textContent = "$0.00";
    totalAmountPerPerson.textContent = "$0.00";
});

