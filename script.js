const buttons = document.querySelectorAll('.button');
const input = document.getElementById("input");
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

const num = { point: ".", plusminus: "-", nine: "9", eight: "8", seven: "7", six: "6", five: "5", four: "4", three: "3", two: "2", one: "1", zero: "0" }

const opr = { percent: "%", divide: "/", multiply: "*", minus: "-", plus: "+", equal: "=" }

let inputtext = ""
let outputtext = ""
let operandarr = []
let operatorarr = []
let currentoperand = ""
let operators = { "+": true, "-": true, "*": true, "/": true }

buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add("animate")
        setTimeout(() => {
            button.classList.remove("animate")
        }, 500)

        if (button == plusminus) {
            if (currentoperand.charAt(0) == "-") {
                currentoperand = currentoperand.slice(1)
                inputtext = inputtext.slice(0, (inputtext.length - currentoperand.length - 1))
            }
            else {
                currentoperand = "-" + currentoperand
                inputtext = inputtext.slice(0, (inputtext.length - currentoperand.length + 1))
            }
            inputtext += currentoperand
            input.textContent = inputtext
        }
        else if (button == point) {
            let temp = false
            for (let i = 0; i < currentoperand.length; i++) {
                if (currentoperand.charAt(i) == ".") temp = true
            }
            if (temp == false) {
                currentoperand += num[button.id]
                inputtext += num[button.id]
                input.textContent = inputtext
            }
        }
        else if (button.id in num) {
            currentoperand += num[button.id]
            inputtext += num[button.id]
            input.textContent = inputtext
        }
        else if (button == equal && currentoperand != "") {
            if (operatorarr.length > 0) {
                operandarr.push(currentoperand)
                currentoperand = ""
                for (let i = 0; i < operatorarr.length; i++) {
                    let op1 = (outputtext == "" ? operandarr[i] : outputtext)
                    let op2 = operandarr[i + 1]
                    let operator = operatorarr[i]
                    outputtext = eval(op1 + operator + op2).toString()
                }
                inputtext = outputtext
                currentoperand = outputtext
                input.textContent = inputtext
                outputtext = ""
                operandarr = []
                operatorarr = []
            }
        }
        else if (button == percent) {
            if (inputtext.charAt(inputtext.length - 1) in operators) {
                operatorarr.pop()
                currentoperand = operandarr[operandarr.length - 1]
                inputtext = inputtext.slice(0, (inputtext.length - currentoperand.length-1))
                input.textContent = inputtext
                operandarr.pop()
            }
            else{
                inputtext = inputtext.slice(0, (inputtext.length - currentoperand.length))
            }
            currentoperand = eval(currentoperand + "/100").toString()
            inputtext += currentoperand
            input.textContent = inputtext
        }
        else if (button.id in opr && currentoperand != "") {
            operatorarr.push(opr[button.id])
            inputtext += opr[button.id]
            operandarr.push(currentoperand)
            currentoperand = ""
            input.textContent = inputtext
        }
        else if (button.id in opr && currentoperand == "") {
            operatorarr.pop()
            operatorarr.push(opr[button.id])
            inputtext = inputtext.slice(0, inputtext.length - 1)
            inputtext += opr[button.id]
            input.textContent = inputtext
        }
        else {
            if (button == clear) {
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
            }
            else if (button == clearall) {
                currentoperand = ""
                inputtext = ""
                input.textContent = inputtext
                operandarr = []
                operatorarr = []
            }
        }
        console.log(operatorarr)
    })
})