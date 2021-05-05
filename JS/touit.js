const myTouit = document.querySelector(".your-touit");
const sectionTouits = document.querySelector(".touits");
const navTermTouit = document.querySelector('nav');

function displayMoreUsedTerm(terms) {
    const termsArray = [];
    for(term in terms) {
        termsArray.push([term, terms[term]]);
    }
    termsArray.sort( (a, b) => b[1] - a[1]);
    const listOfTerms = document.createElement('ul');
    listOfTerms.classList.add('terms');
    for(let i = 0; i < 10; i++) {
        const listElement = document.createElement('li');
        listElement.textContent = termsArray[i][0];
        listOfTerms.appendChild(listElement);
    }
    navTermTouit.appendChild(listOfTerms);
}

function moreUsedTerm() {
    let request = new XMLHttpRequest();
    const url = "http://touiteur.cefim-formation.org/trending";
    request.open('GET', url);
    request.addEventListener('readystatechange', function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                terms = JSON.parse(request.responseText);
                displayMoreUsedTerm(terms);
            }
        }
    })
    request.send();
}

function addButtonCta(element) {
    const cta = document.createElement('div');
    cta.classList.add('cta');
    const del = document.createElement('button');
    del.classList.add("del");
    del.textContent = "supprimer";
    const like = document.createElement('button');
    like.classList.add("love");
    like.textContent = "j'aime";
    cta.appendChild(del);
    cta.appendChild(like);
    element.appendChild(cta);
}

function addTouitOnPage(pseudo, message, id) {
    const touit = document.createElement('article');
    touit.classList.add("touit");
    const pseudoTouit = document.createElement('h3');
    pseudoTouit.textContent = pseudo;
    const messageContent = document.createElement('p');
    messageContent.textContent = message;
    const idTouit = document.createElement('p');
    idTouit.classList.add('id-touit');
    idTouit.textContent = id;
    touit.appendChild(pseudoTouit);
    touit.appendChild(messageContent);
    touit.appendChild(idTouit);
    sectionTouits.appendChild(touit);
    addButtonCta(touit);
}

function sendTouit(pseudo, message) {
    let request = new XMLHttpRequest();
    request.open("POST", "http://touiteur.cefim-formation.org/send", true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    const data = "name=" + pseudo + "&message=" + message;
    request.addEventListener('readystatechange', function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200 && JSON.parse(request.responseText).success) {
                console.log('success');
                loadTouits(mainTimeStamp);
            } else {
                console.log("pourquoi l'échec: ", JSON.parse(request.responseText).error);
            }
        }
    })
    request.send(data);
}

function loadTouits(timeStamp) {
    let url = "http://touiteur.cefim-formation.org/list" + "?" + "ts=" + timeStamp.toString();
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    let touits = "";
    request.addEventListener('readystatechange', function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                touits = JSON.parse(request.responseText).messages;
                for (let i = 0; i < touits.length; i++) {
                        addTouitOnPage(touits[i].name, touits[i].message, touits[i].id);
                }
                mainTimeStamp = JSON.parse(request.responseText).ts;
                console.log("le dernier touit: ", touits[0].id);
            }
        };
    })
    request.send();
}

let mainTimeStamp = 1620208793;
loadTouits(mainTimeStamp);
setInterval(function(){ 
    console.log("rafraichissement");
    console.log("le time du set interval: ", mainTimeStamp);
    loadTouits(mainTimeStamp); },
 30000);

myTouit.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const message = document.querySelector("#message");
    const pseudo = document.querySelector("#pseudo");
    sendTouit(pseudo.value, message.value);
});

function mostActiveAuthor(nbAuthors) {
    let request = new XMLHttpRequest();
    const url = "http://touiteur.cefim-formation.org/influencers";
    let authorsList = {};
    request.open('GET', url + "?" + nbAuthors.toString(10));
    request.addEventListener('readystatechange', function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200 ) {
                console.log("le retour: ", JSON.parse(request.responseText));
                authorsList = JSON.parse(request.responseText);
                displayMostActiveAuthor(authorsList);
            }
        }
    });
    request.send();
}
moreUsedTerm();
mostActiveAuthor(11);


