// ADDITIONAL FUNCTIONS
// 1. Add button to load image rather than page load.
// 2. Add a textbox to ask for date and return that APOD.
// 3. Connect Firebase to log each APOD that is loaded with the date as Key.


// Verify that JS file loaded.
console.log("JS file has loaded.");


let titleAPODElem = document.getElementById("title");
let dateAPODElem = document.getElementById("date");
let displayAPODElem = document.getElementById("apod");
let explainAPODElem = document.getElementById("explanation");
let submitElem = document.getElementById("submitAPODDate");
submitElem.addEventListener("click", handleClick);



let requestObject = new XMLHttpRequest();
requestObject.addEventListener("load", handleResponse);
requestObject.open("GET", "https://api.nasa.gov/planetary/apod?api_key=MZzdiyAR2POTssNKcTtkmmrZiQWV1pXrZXcAuCIc");  // The URL should be a variable that is concatenated with the date that the member enters to call a past APOD.
requestObject.setRequestHeader("Accept", "application/json");  // Return JSON object to parse later.
requestObject.send();



function handleClick(){

    let apodDateElem = document.getElementById("apodDate");    
    let apodDate = apodDateElem.value;
    let api_key = "https://api.nasa.gov/planetary/apod?api_key=MZzdiyAR2POTssNKcTtkmmrZiQWV1pXrZXcAuCIc" + "&date=" + apodDate;
    console.log(apodDate);

    // Request the JSON object of APOD with user-specified date.
    let requestObject = new XMLHttpRequest();
    requestObject.addEventListener("load", handleResponse);
    requestObject.open("GET", api_key);
    console.log(api_key);  // JSON object with prior date is being returned, but the object is not being passed to handleResponse().
    requestObject.setRequestHeader("Accept", "application/json");  // Return JSON object to parse later.
    requestObject.send();

}



function handleResponse () {
    console.log(requestObject);
    console.log(requestObject.responseText);
    let apodResponseObject = JSON.parse(requestObject.responseText);

    titleAPODElem.textContent = apodResponseObject.title;
    dateAPODElem.textContent = apodResponseObject.date;
    displayAPODElem.src = apodResponseObject.url;
    explainAPODElem.textContent = apodResponseObject.explanation;

}