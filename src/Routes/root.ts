import express from "express";
import Fraction from "fraction.js";

const router = express.Router();

router.get("/", (req, res) => res.render("index", {
    title: "Home"
}));
router.get("/pq", (req, res) => res.render("pq", {
    title: "PQ Formula"
}));
router.get("/calculator", (req, res) => res.render("calculator", {
    title: "Calculator"
}));
router.get("/extras/drawpad", (req, res) => res.render("Extras/drawpad", {
    title: "Drawpad"
}));

router.post("/pq/calculate", (req, res) => {
    const p = parseInt(req.body.p);
    const q = parseInt(req.body.q);
    const values = pq(p, q);
    const fractionOne = decimalToFraction(values.firstValue);
    const fractionTwo = decimalToFraction(values.secondValue);
    res.render("Results/pq", {
        p: values.firstValue && values.secondValue ? {
            decimal: values.firstValue.toString().replace(/\./g, ","),
            numerator: fractionOne.numerator,
            denominator: fractionOne.denominator,
            minus: fractionOne.minus
        } : null,
        q: values.firstValue && values.secondValue ? {
            decimal: values.secondValue.toString().replace(/\./g, ","),
            numerator: fractionTwo.numerator,
            denominator: fractionTwo.denominator,
            minus: fractionTwo.minus
        } : null,
        title: "Calculator"
    });
});
router.post("/calculator/calculate", (req, res) => {
    const { input } = req.body;
    res.render("Results/calculator", {
        value: input != "" ? eval(input.replace(/×/g, "*").replace(/÷/g, "/").replace(/,/g, ".")) : null,
        error: input == "" ? "There was no input!" : null,
        input: input,
        title: "Calculator"
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
        numerator: parseInt(value.split("/")[0].replace(/-/g, "")),
        denominator: parseInt(value.split("/")[1]),
        minus: value.startsWith("-") ? true : false
    }
};

export default router;