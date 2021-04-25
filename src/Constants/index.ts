import Fraction from "fraction.js";

/**
 * Returns two values of an PQ
 * @param {number} p The p
 * @param {number} q The q
 */
export function pq(p: number, q: number): { firstValue: number, secondValue: number } | null {
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
export function decimalToFraction(number: number) {
    const x = new Fraction(number);
    const value = x.toFraction();
    return {
        numerator: parseInt(value.split("/")[0].replace(/-/g, "")),
        denominator: parseInt(value.split("/")[1]),
        minus: value.startsWith("-") ? true : false
    }
};