// ADDITIONAL FUNCTIONS
// 1. Add button to load image rather than page load.
// 2. Add a textbox to ask for date and return that APOD.
// 3. Connect Firebase to log each APOD that is loaded with the date as Key.


// Verify that JS file loaded.
console.log("JS file has loaded.");

// Do these have to be global? Why not declare within handleResponse()?
// let titleAPODElem = document.getElementById("title");
// let displayAPODElem = document.getElementById("apod");

// titleAPODElem.textContent = "Test";



let requestObject = new XMLHttpRequest();
requestObject.addEventListener("load", handleResponse);
requestObject.open("GET", "https://api.nasa.gov/planetary/apod?api_key=MZzdiyAR2POTssNKcTtkmmrZiQWV1pXrZXcAuCIc");
requestObject.setRequestHeader("Accept", "application/json");  // Return JSON object to parse later.
requestObject.send();

function handleResponse () {
    console.log(requestObject.responseText);

    let titleAPODElem = document.getElementById("title");
    let displayAPODElem = document.getElementById("apod");
    let explainAPODElem = document.getElementById("explanation");
    let apodResponseObject = JSON.parse(requestObject.responseText);

    console.log(apodResponseObject.title);
    console.log(apodResponseObject.url);

    titleAPODElem.textContent = apodResponseObject.title;
    displayAPODElem.src = apodResponseObject.url;
    explainAPODElem.textContent = apodResponseObject.explanation;

}