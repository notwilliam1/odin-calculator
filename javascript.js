function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a === 0 || b === 0) {
        return 0;
    }
    return a / b;
}

var operation; 
var num1;
var num2;

function calculate(operation, num1, num2) {
    switch (operation) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

function createButton(id, text) {
    var btn = document.createElement('button');
    btn.id = id;
    btn.innerHTML = text;
    return btn;
}

var button_ac  = createButton('button_ac',  'ac');
var button_del = createButton('button_del', 'del');
var button_div = createButton('button_div', '/');
var button_mul = createButton('button_mul', '*');
var button_sub = createButton('button_sub', '-');
var button_add = createButton('button_add', '+');
var button_eq  = createButton('button_eq',  '=');
var button_0   = createButton('button_0',   '0');
var button_1   = createButton('button_1',   '1');
var button_2   = createButton('button_2',   '2');
var button_3   = createButton('button_3',   '3');
var button_4   = createButton('button_4',   '4');
var button_5   = createButton('button_5',   '5');
var button_6   = createButton('button_6',   '6');
var button_7   = createButton('button_7',   '7');
var button_8   = createButton('button_8',   '8');
var button_9   = createButton('button_9',   '9');
var button_per = createButton('button_per', '.');

var buttons_row_1 = [];
var buttons_row_2 = [];
var buttons_row_3 = [];
var buttons_row_4 = [];
var buttons_row_5 = [];

buttons_row_1.push(button_ac);
buttons_row_1.push(button_del);
buttons_row_2.push(button_div);
buttons_row_3.push(button_mul);
buttons_row_4.push(button_sub);
buttons_row_5.push(button_add);
buttons_row_5.push(button_eq);
buttons_row_5.push(button_0);
buttons_row_4.push(button_1);
buttons_row_4.push(button_2);
buttons_row_4.push(button_3);
buttons_row_3.push(button_4);
buttons_row_3.push(button_5);
buttons_row_3.push(button_6);
buttons_row_2.push(button_7);
buttons_row_2.push(button_8);
buttons_row_2.push(button_9);
buttons_row_5.push(button_per);

document.getElementById('row_1').appendChild(button_ac);
document.getElementById('row_1').appendChild(button_del);

document.getElementById('row_2').appendChild(button_7);
document.getElementById('row_2').appendChild(button_8);
document.getElementById('row_2').appendChild(button_9);
document.getElementById('row_2').appendChild(button_div);

document.getElementById('row_3').appendChild(button_4);
document.getElementById('row_3').appendChild(button_5);
document.getElementById('row_3').appendChild(button_6);
document.getElementById('row_3').appendChild(button_mul);

document.getElementById('row_4').appendChild(button_1);
document.getElementById('row_4').appendChild(button_2);
document.getElementById('row_4').appendChild(button_3);
document.getElementById('row_4').appendChild(button_sub);

document.getElementById('row_5').appendChild(button_per);
document.getElementById('row_5').appendChild(button_0);
document.getElementById('row_5').appendChild(button_eq);
document.getElementById('row_5').appendChild(button_add);      

for (let btn of buttons_row_1) {
    btn.style.width = 125 + 'px';
    btn.style.height = 50 + 'px';
    btn.style.margin = 5 + 'px';
    btn.style.fontSize = 1.5 + 'em';
    btn.style.borderRadius = 10 + 'px';
    btn.style.cursor = 'pointer';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.fontFamily = 'inter, sans-serif';
}

button_ac.style.backgroundColor = '#f44336';
button_del.style.backgroundColor = '#ff9800';

for (let btn of [
    ...buttons_row_2,
    ...buttons_row_3,
    ...buttons_row_4,
    ...buttons_row_5
]) {
    btn.style.width = '60px';
    btn.style.height = '60px';
    btn.style.margin = '0px';
    btn.style.fontSize = '1.5em';
    btn.style.borderRadius = '10px';
    btn.style.cursor = 'pointer';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.fontFamily = 'inter, sans-serif';
    btn.style.backgroundColor = '#444';
}

const resultDisplay = document.getElementById('result');

let currentInput = "";

function updateDisplay(value) {
    resultDisplay.innerText = value !== undefined ? value : currentInput;
}

[button_0, button_1, button_2, button_3, button_4, button_5, button_6, button_7, button_8, button_9].forEach(btn => {
    btn.addEventListener('click', function() {
        currentInput += btn.textContent;
        updateDisplay(currentInput);
    });
});

[button_add, button_sub, button_mul, button_div].forEach(btn => {
    btn.addEventListener('click', function() {
        let parts = currentInput.trim().split(" ");
        if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
            let result = calculate(parts[1], parseFloat(parts[0]), parseFloat(parts[2]));
            if (isFinite(result)) {
                result = parseFloat(result.toFixed(7));
            }
            currentInput = result + " " + btn.textContent + " ";
            updateDisplay(currentInput);
        } else if (currentInput !== "" && !currentInput.trim().endsWith(btn.textContent)) {
            currentInput += " " + btn.textContent + " ";
            updateDisplay(currentInput);
        }
    });
});

button_ac.addEventListener('click', function() {
    currentInput = "";
    updateDisplay(currentInput);
});

button_del.addEventListener('click', function() {
    currentInput = currentInput.trimEnd();
    if (currentInput.endsWith(" ")) {
        currentInput = currentInput.slice(0, -3);
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay(currentInput);
});

button_eq.addEventListener('click', function() {
    try {
        [num1, operation, num2] = currentInput.split(" ");
        let result = calculate(operation, parseFloat(num1), parseFloat(num2));
        if (isFinite(result)) {
            result = parseFloat(result.toFixed(10));
        }
        updateDisplay(result);
        currentInput = "";
    } catch {
        updateDisplay("Error");
        currentInput = "";
    }
});

button_per.addEventListener('click', function() {
    let parts = currentInput.split(/[\+\-\*\/]/);
    let lastNumber = parts[parts.length - 1].trim();
    if (!lastNumber.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
});