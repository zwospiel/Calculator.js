import { Expression } from "./Expression.js"


const input = document.querySelector(".input")
const digits = document.querySelectorAll(".digit")
const operators = document.querySelectorAll(".operator")
const CE = document.querySelector("#CE")
const EQ = document.querySelector("#EQ")

digits.forEach(digit => digit.addEventListener("click", appendInput))
operators.forEach(operator => operator.addEventListener("click", appendInput))
CE.addEventListener("click", clearEntry)
EQ.addEventListener("click", solve)

function appendInput(event) {
    input.value += event.target.textContent
}

function solve() {
    if (input.value === "") {
        return
    }

    let parsedInput = input.value.replace(/\u00d7/g, "*")
    let expression = new Expression(parsedInput)
    input.value = expression.solve()
}

function clearEntry() {
    input.value = input.value.slice(0, -1)
}