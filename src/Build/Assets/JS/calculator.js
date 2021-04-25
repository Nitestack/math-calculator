const operations = ["+", "-", "×", "÷"];
$("button").on("click", function () {
    const { id } = this;
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
//# sourceMappingURL=calculator.js.map