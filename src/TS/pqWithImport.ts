const Fraction = require("fraction.js");

document.getElementById("submitButton").onclick = function (ev) {
    const pElementOnHTML = document.getElementById("answer");
    pElementOnHTML.textContent = "";
    const pText = document.getElementById("p");
    const qText = document.getElementById("q");
    const errorElement = document.getElementById("error");
    //@ts-ignore
    const p = parseFloat(pText.value.replace(/,/g, "."));
    //@ts-ignore
    const q = parseFloat(qText.value.replace(/,/g, "."));
    if (!p || !q) return errorElement.textContent = "Invalid input!";
    const values = pq(p, q);
    if (!values) return errorElement.textContent = "Invalid numbers!";
    if (values.firstValue == values.secondValue) createElement(pElementOnHTML, values.firstValue, "The value is");
    else {
        createElement(pElementOnHTML, values.firstValue, "The first value is");
        createElement(pElementOnHTML, values.secondValue, "The second value is");
    };
    errorElement.textContent = "";
};

function createElement(pElement: HTMLElement, value: number, textContent: string) {
    const fraction = decimalToFraction(value);
    const valueP = document.createElement("p");
    pElement.appendChild(valueP);
    valueP.textContent = textContent;
    const emptyP = document.createElement("p");
    pElement.appendChild(emptyP);
    if (fraction.minus) {
        const newSpan1 = document.createElement("span");
        emptyP.appendChild(newSpan1);
        newSpan1.setAttribute("style", "vertical-align:10px;");
    };
    const spanFrac = document.createElement("span");
    emptyP.appendChild(spanFrac);
    spanFrac.classList.add("frac");
    const sup = document.createElement("sup");
    spanFrac.appendChild(sup);
    sup.textContent = fraction.numerator.toString();
    const emptyTextContentSpan = document.createElement("span");
    spanFrac.appendChild(emptyTextContentSpan);
    emptyTextContentSpan.textContent = "/";
    const sub = document.createElement("sub");
    spanFrac.appendChild(sub);
    sub.textContent = fraction.denominator.toString();
    const newP3 = document.createElement("p");
    pElement.appendChild(newP3);
    newP3.textContent = `(${value})`;
};

/**
 * Returns two values of an PQ
 * @param {number} p The p
 * @param {number} q The q
 */
function pq(p: number, q: number): { firstValue: number, secondValue: number } | null {
    const fraction = -p / 2;
    const value: number = Math.sqrt(Math.pow(p / 2, 2) - q);
    let values: { firstValue: number, secondValue: number } = null;
    if (!isNaN(value)) values = {
        firstValue: fraction + value,
        secondValue: fraction - value
    };
    return values;
};

/**
 * Converts a decimal interger to a fraction
 * @param {number} number The number to convert 
 */
function decimalToFraction(number: number) {
    const x = new Fraction(number);
    const value: string = x.toFraction();
    return {
        numerator: parseInt(value.split("/")[0].replace(/-/g, "")),
        denominator: parseInt(value.split("/")[1]) || 1,
        minus: value.startsWith("-") ? true : false
    }
};