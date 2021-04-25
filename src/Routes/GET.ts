import express from "express";

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
router.get("/trigonometry", (req, res) => res.render("trigonometry", {
    title: "Trigonometry"
}));
router.get("/pythagoreantheorem", (req, res) => res.render("pythagoreanTheorem", {
    title: "Pythagorean Theorem"
}));

export default router;