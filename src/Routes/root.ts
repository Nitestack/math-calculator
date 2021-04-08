import express from "express";
import Fraction from "fraction.js";

const router = express.Router();

router.get("/", (req, res) => res.render("index", {
    title: "Home"
}));

router.get("/pq", (req, res) => res.render("pq"));

router.post("/pq/calculate", (req, res) => {
    const p = parseInt(req.body.p);
    const q = parseInt(req.body.q);
    const values = pq(p, q);
    res.render("Results/pq", {
        p: values?.firstValue ? (values.firstValue.toString().includes(".") ? decimalToFraction(values.firstValue) : values.firstValue) : null,
        q: values?.secondValue ? (values.secondValue.toString().includes(".") ? decimalToFraction(values.secondValue) : values.secondValue) : null
    });
});

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
    const value = x.toFraction();
    return {
        numerator: value.split("/")[0].replace(/-/g, ""),
        denominator: value.split("/")[1],
        decimal: number,
        minus: value.startsWith("-") ? true : false
    }
};

export default router;