const submitButton = document.querySelector("#send");
const sectionTouits = document.querySelector(".touits");

function addTouit(pseudo, message) {
    const touit = document.createElement('div');
    touit.classList.add("touit");
    const pseudoTouit = document.createElement('h3');
    pseudoTouit.textContent = pseudo.value;
    const parag = document.createElement('p');
    parag.textContent = message.value;
    touit.appendChild(pseudoTouit);
    touit.appendChild(parag);
    sectionTouits.appendChild(touit);
    pseudo.value = "";
    message.value = "";
}

submitButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    const message = document.querySelector("#message");
    const pseudo = document.querySelector("#pseudo");
    console.log(pseudo.value);
    console.log(message.value);
    addTouit(pseudo, message);
});