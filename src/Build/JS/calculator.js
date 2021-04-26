const operations = ["+", "-", "×", "÷"];
$("button").on("click", function () {
    const { id } = this;
    if (id == "submitButton")
        return;
    const textArea = document.getElementById("input");
    //@ts-ignore
    if (["×", "÷", "+"].includes(id) && textArea.value == "")
        return;
    //@ts-ignore
    const elements = textArea.value.split("");
    const lastElement = elements[elements.length - 1];
    if (id.toLowerCase() == "delete") {
        //@ts-ignore
        textArea.value = "";
    }
    else if (id.toLowerCase() == "deletelast") {
        elements.splice(elements.length - 1, 1);
        //@ts-ignore
        textArea.value = elements.join("");
    }
    else if (id == "←") {
    }
    else if (id == "→") {
    }
    else {
        if (operations.includes(id) && operations.includes(lastElement))
            return;
        elements.push(id.replace(/null/g, "0"));
        //@ts-ignore
        textArea.value = elements.join("");
    }
    ;
});
document.getElementById("submitButton").onclick = function (ev) {
    const pElement = document.getElementById("answer");
    try {
        //@ts-ignore
        const input = document.getElementById("input").value;
        const value = eval(input.replace(/×/g, "*").replace(/÷/g, "/").replace(/,/g, "."));
        pElement.textContent = `The value of ${input} is ${value.toString()}`;
        document.getElementById("error").textContent = "";
    }
    catch {
        document.getElementById("error").textContent = "Invalid input!";
        pElement.textContent = "";
    }
    ;
};
//# sourceMappingURL=calculator.js.map