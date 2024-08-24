const buttons = document.querySelectorAll('.button');
const input = document.getElementById("input");
const output = document.getElementById("output");
const clear = document.getElementById("clear");
const clearall = document.getElementById("clear-all");

const percent = document.getElementById("percent");
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const equal = document.getElementById("equal");
const point = document.getElementById("point");

const nine = document.getElementById("nine");
const eight = document.getElementById("eight");
const seven = document.getElementById("seven");
const six = document.getElementById("six");
const five = document.getElementById("five");
const four = document.getElementById("four");
const three = document.getElementById("three");
const two = document.getElementById("two");
const one = document.getElementById("one");
const zero = document.getElementById("zero");
const plusminus = document.getElementById("plus-minus");

const num = { nine: "9", eight: "8", seven: "7", six: "6", five: "5", four: "4", three: "3", two: "2", one: "1", zero: "0" }
const num2 = { "9": nine, "8": eight, "7": seven, "6": six, "5": five, "4": four, "3": three, "2": two, "1": one, "0": zero }
const opr = { divide: "/", multiply: "*", minus: "-", plus: "+" }
const opr2 = { "/": divide, "*": multiply, "-": minus, "+": plus }
const operators = { "+": "+", "-": "-", "*": "×", "/": "÷" }

let inputtext = ""
let outputtext = ""
let operandarr = []
let operatorarr = []
let currentoperand = ""

function buttonAnimation(button) {
    button.classList.add("animate")
    setTimeout(() => {
        button.classList.remove("animate")
    }, 500)
}

function negation(button) {
    buttonAnimation(button)
    try {
        if (currentoperand.charAt(0) == " ") {
            currentoperand = eval(currentoperand + "*-1").toString()
            inputtext = inputtext.slice(0, (inputtext.length - currentoperand.length - 2))
        }
        else {
            currentoperand = " " + eval(currentoperand + "*-1").toString()
            inputtext = inputtext.slice(0, (inputtext.length - currentoperand.length + 2))
        }
        inputtext += currentoperand
        input.textContent = inputtext
    } catch (error) { }
}

function decimal(button) {
    buttonAnimation(button)
    try {
        let temp = false
        for (let i = 0; i < currentoperand.length; i++) {
            if (currentoperand.charAt(i) == ".") temp = true
        }
        if (temp == false) {
            currentoperand += "."
            inputtext += "."
            input.textContent = inputtext
        }
    } catch (error) { }
}

function percentage(button) {
    buttonAnimation(button)
    try {
        let temp = inputtext.replace("×", "*").replace("÷", "/")
        if (temp.charAt(temp.length - 1) in operators) {
            operatorarr.pop()
            currentoperand = operandarr[operandarr.length - 1]
            inputtext = inputtext.slice(0, (inputtext.length - currentoperand.length - 1))
            input.textContent = inputtext
            operandarr.pop()
        }
        else {
            inputtext = inputtext.slice(0, (inputtext.length - currentoperand.length))
        }
        currentoperand = eval(currentoperand + "/100").toString()
        inputtext += currentoperand
        input.textContent = inputtext
    } catch (error) { }
}

function number(button) {
    buttonAnimation(button)
    try {
        currentoperand += num[button.id]
        inputtext += num[button.id]
        input.textContent = inputtext
    } catch (error) { }
}

function symbol(button) {
    buttonAnimation(button)
    try {
        if (currentoperand != "") {
            operatorarr.push(opr[button.id])
            inputtext += operators[opr[button.id]]
            operandarr.push(currentoperand)
            currentoperand = ""
            input.textContent = inputtext
        }
        else if (currentoperand == "" && operandarr.length > 0) {
            operatorarr.pop()
            operatorarr.push(opr[button.id])
            inputtext = inputtext.slice(0, inputtext.length - 1)
            inputtext += operators[opr[button.id]]
            input.textContent = inputtext
        }
    } catch (error) { }
}

function del(button) {
    buttonAnimation(button)
    try {
        let lastchar = inputtext.charAt(inputtext.length - 1)
        inputtext = inputtext.slice(0, (inputtext.length - 1))
        input.textContent = inputtext
        let last = operandarr[operandarr.length - 1]
        if (currentoperand.length > 0) {
            currentoperand = currentoperand.slice(0, currentoperand.length - 1)
        }
        else if (operators[lastchar]) {
            operatorarr.pop()
            currentoperand = operandarr[operandarr.length - 1]
            operandarr.pop()
        }
        else if (last.length > 0) {
            operandarr[operandarr.length - 1] = last.slice(0, last.length - 1)
            last = operandarr[operandarr.length - 1]
            currentoperand = last
            operandarr.pop()
        }
        else {
            operatorarr.pop()
            currentoperand = operandarr[operandarr.length - 1]
            operandarr.pop()
        }
    } catch (error) { }
}

function delall(button) {
    buttonAnimation(button)
    try {
        currentoperand = ""
        inputtext = ""
        input.textContent = inputtext
        outputtext = ""
        output.textContent = outputtext
        operandarr = []
        operatorarr = []
    } catch (error) { }
}

function calculate() {
    try {
        outputtext = eval(inputtext.replace("×", "*").replace("÷", "/"))
        output.textContent = outputtext
    } catch (error) { }
}

function equalto(button) {
    buttonAnimation(button)
    try {
        inputtext = outputtext
        input.textContent = inputtext
        operandarr = [inputtext]
        operatorarr = []
        outputtext = ""
        output.textContent = outputtext
    } catch (error) { }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button == plusminus) negation(button)
        else if (button == point) decimal(button)
        else if (button == percent) percentage(button)
        else if (button == clear) del(button)
        else if (button == clearall) delall(button)
        else if (button.id in num) number(button)
        else if (button.id in opr) symbol(button)
        else if (button == equal) equalto(button)
        if (operatorarr.length > 0) calculate()
    })
})

window.addEventListener('keydown', (event) => {
    let key = event.key
    if (key == "~") negation(plusminus)
    else if (key == ".") decimal(point)
    else if (key == "%") percentage(percent)
    else if (key == "Backspace") del(clear)
    else if (key == "Delete") delall(clearall)
    else if (key == "=" || key == "Enter") equalto(equal)
    else if (key >= 0 && key <= 9) number(num2[key])
    else if (key in opr2) symbol(opr2[key])
    if (operatorarr.length > 0) calculate()
})
