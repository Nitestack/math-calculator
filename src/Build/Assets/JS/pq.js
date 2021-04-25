"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../Constants/index");
document.getElementById("p").onkeyup = function (ev) {
    keyup(ev);
};
document.getElementById("q").onkeyup = function (ev) {
    keyup(ev);
};
function keyup(ev) {
    const { key } = ev;
    const validCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", ","];
    if (!validCharacters.includes(key))
        return;
    //@ts-ignore
    const pText = document.getElementById("p").value;
    //@ts-ignore
    const qText = document.getElementById("q").value;
    const p = parseFloat(pText.replace(/,/g, "."));
    const q = parseFloat(qText.replace(/,/g, "."));
    const values = index_1.pq(p, q);
    if (!values)
        return;
}
;
//# sourceMappingURL=pq.js.map