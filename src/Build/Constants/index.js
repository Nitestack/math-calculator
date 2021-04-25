"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimalToFraction = exports.pq = void 0;
const fraction_js_1 = __importDefault(require("fraction.js"));
/**
 * Returns two values of an PQ
 * @param {number} p The p
 * @param {number} q The q
 */
function pq(p, q) {
    const fraction = -p / 2;
    const value = Math.sqrt(Math.pow(p / 2, 2) - q);
    let values = null;
    if (!isNaN(value))
        values = {
            firstValue: fraction + value,
            secondValue: fraction - value
        };
    return values;
}
exports.pq = pq;
;
/**
 * Converts a decimal interger to a fraction
 * @param {number} number The number to convert
 */
function decimalToFraction(number) {
    const x = new fraction_js_1.default(number);
    const value = x.toFraction();
    return {
        numerator: parseInt(value.split("/")[0].replace(/-/g, "")),
        denominator: parseInt(value.split("/")[1]),
        minus: value.startsWith("-") ? true : false
    };
}
exports.decimalToFraction = decimalToFraction;
;
//# sourceMappingURL=index.js.map