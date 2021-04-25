import express from "express";
import Canvas from "canvas";
import { pq, decimalToFraction } from "@constants/index";

const router = express.Router();

router.post("/trigonometry/calculate", (req, res) => {
    try {
        let a = parseInt(req.body.a);
        let b = parseInt(req.body.b);
        let c = parseInt(req.body.c);
        let alpha = parseInt(req.body.alpha);
        let beta = parseInt(req.body.beta);
        let gamma = parseInt(req.body.gamma);
        if (!a && !b && !c) return res.render("trigonometry", {
            error: true,
            errorMessage: "You have to provide atleast one side of the triangle!",
            alpha: alpha,
            beta: beta,
            gamma: gamma,
            a: a,
            b: b,
            c: c
        });
        if (!alpha && !beta && !gamma) return res.render("trigonometry", {
            error: true,
            errorMessage: "You have to provide atleast one angle of the triangle!",
            alpha: alpha,
            beta: beta,
            gamma: gamma,
            a: a,
            b: b,
            c: c
        });
        if ((alpha && beta && gamma && alpha + beta + gamma != 180) || (alpha && beta && alpha + beta >= 180) || (alpha && gamma && alpha + gamma >= 180) || (gamma && beta && gamma + beta >= 180)) return res.render("trigonometry", {
            error: true,
            errorMessage: "The angles are not 180°!",
            alpha: alpha,
            beta: beta,
            gamma: gamma,
            a: a,
            b: b,
            c: c
        });
        if (alpha != 90 && beta != 90 && gamma != 90) {
            if (!alpha) alpha = 90;
            else if (!beta) beta = 90;
            else if (!gamma) gamma = 90;
        };
        if (alpha && beta) gamma = angleValue(alpha, beta);
        else if (beta && gamma) alpha = angleValue(beta, gamma);
        else if (alpha && gamma) beta = angleValue(alpha, gamma);
        if (!a) {
            if (!b) {

            };
        };
        res.render("trigonometry", {
            error: false,
            alpha: alpha,
            beta: beta,
            gamma: gamma,
            a: a,
            b: b,
            c: c
        });
    } catch {
        res.render("Errors/404", {
            title: "Unknown page"
        });
    };
});

router.post("/pq/calculate", (req, res) => {
    const p = parseFloat(req.body.p.replace(/,/g, "."));
    const q = parseFloat(req.body.q.replace(/,/g, "."));
    if (!p || !q) return res.render("pq", {
        error: true
    });
    const values = pq(p, q);
    const fractionOne = decimalToFraction(values?.firstValue);
    const fractionTwo = decimalToFraction(values?.secondValue);
    res.render("pq", {
        p: values?.firstValue && values?.secondValue ? {
            decimal: values.firstValue.toString(),
            numerator: fractionOne.numerator,
            denominator: fractionOne.denominator,
            minus: fractionOne.minus
        } : null,
        q: values?.firstValue && values?.secondValue ? {
            decimal: values.secondValue.toString(),
            numerator: fractionTwo.numerator,
            denominator: fractionTwo.denominator,
            minus: fractionTwo.minus
        } : null,
        title: "Calculator",
        error: !(values?.firstValue && values?.secondValue),
        result: values?.firstValue && values?.secondValue,
        pInput: p,
        qInput: q
    });
});
router.post("/calculator/calculate", (req, res) => {
    try {
        const { input } = req.body;
        if (!input) return res.render("calculator", {
            title: "Calculator",
            error: true,
            errorMessage: "There was no input!"
        });
        const value = eval(input.replace(/×/g, "*").replace(/÷/g, "/").replace(/,/g, "."));
        res.render("calculator", {
            value: value,
            input: input,
            title: "Calculator"
        });
    } catch {
        res.render("calculator", {
            title: "Calculator",
            error: true,
            errorMessage: "Invalid input!"
        });
    };
});

router.post("/pythagoreantheorem/calculate", (req, res) => {
    const a = parseFloat(req.body.a.replace(/,/g, "."));
    const b = parseFloat(req.body.b.replace(/,/g, "."));
    if (!a || !b) return res.render("pythagoreanTheorem", {
        title: "Pythagorean Theorem",
        error: true,
        errorMessage: "Invalid input!"
    });
    const plusOrMinus = req.body.plusOrMinus;
    if (plusOrMinus == "+")
        res.render("pythagoreanTheorem", {
            title: "Pythagorean Theorem",
            aInput: a,
            bInput: b,
            c: Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
            plusOrMinus: plusOrMinus
        });
    else {
        if (a < b) return res.render("pythagoreanTheorem", {
            title: "Pythagorean Theorem",
            error: true,
            errorMessage: "c has to be higher than a/b",
            aInput: a,
            bInput: b
        });
        res.render("pythagoreanTheorem", {
            title: "Pythagorean Theorem",
            aInput: a,
            bInput: b,
            c: Math.sqrt(Math.pow(a, 2) - Math.pow(b, 2)),
            plusOrMinus: plusOrMinus
        });
    };
});

/**
 * Returns the left angle of an triangle
 * @param {number} firstValue The first angle's value 
 * @param {number} secondValue The second angle's value
 */
function angleValue(firstValue: number, secondValue: number) {
    return 180 - (firstValue + secondValue);
};

function createRightTriangle() {
    const canvas = Canvas.createCanvas(1920, 1080, "svg");
    const ctx = canvas.getContext("2d");
};

export default router;