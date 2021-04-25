import { pq } from "../../Constants/index";

document.getElementById("p").onkeyup = function(ev) {
    keyup(ev);
};

document.getElementById("q").onkeyup = function(ev) {
    keyup(ev);
};

function keyup(ev) {
    const { key } = ev;
    const validCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", ","];
    if (!validCharacters.includes(key)) return;
    //@ts-ignore
    const pText = document.getElementById("p").value as string;
    //@ts-ignore
    const qText = document.getElementById("q").value as string;
    const p = parseFloat(pText.replace(/,/g, "."));
    const q = parseFloat(qText.replace(/,/g, "."));
    const values = pq(p, q);
    if (!values) return;
    
};