const operations = ["+", "-", "×", "÷"];

$("button").on("click", function () {
    const { id } = this;
    const textArea = document.getElementById("input");
    if (["×", "÷", "+"].includes(id) && textArea.value == "") return;
    const elements = textArea.value.split("");
    const lastElement = elements[elements.length - 1];
    if (id.toLowerCase() == "delete") {
        textArea.value = "";
    } else if (id.toLowerCase() == "deletelast") {
        elements.splice(elements.length - 1, 1);
        textArea.value = elements.join("");
    } else if (id == "←") {

    } else if (id == "→") {

    } else {
        if (operations.includes(id) && operations.includes(lastElement)) return;
        elements.push(id.replace(/null/g, "0"));
        textArea.value = elements.join("");
    };
});