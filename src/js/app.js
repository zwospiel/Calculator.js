import { Expression } from "./Expression.js"


const display = document.querySelector(".display")
const digits = document.querySelectorAll(".digit")
const operators = document.querySelectorAll(".operator")
const CE = document.querySelector("#CE")
const EQ = document.querySelector("#EQ")

digits.forEach(digit => digit.addEventListener("click", appendInput))
operators.forEach(operator => operator.addEventListener("click", appendInput))
CE.addEventListener("click", clearEntry)
EQ.addEventListener("click", solve)

function appendInput(event) {
    display.value += event.target.textContent
}

function solve() {
    if (display.value === "") {
        return
    }

    let input = display.value.replace(/\u00d7/g, "*")
    let expression = new Expression(input)
    display.value = expression.solve()
}

function clearEntry() {
    display.value = display.value.slice(0, -1)
}