// ADDITIONAL FUNCTIONS
// DONE. 1. Add button to load image rather than page load.
// DONE. 2. Add a textbox to ask for date and return that APOD.
// 3. Connect Firebase to log each APOD that is loaded with the date as Key.


// Verify that JS file loaded.
console.log("JS file has loaded.");

//////////////////// GLOBAL VARIABLES ///////////////////////////////
// Get HTML elements as JS variables to display APOD.
let titleAPODElem = document.getElementById("title");
let dateAPODElem = document.getElementById("dateAPOD");
let displayAPODElem = document.getElementById("apod");
let explainAPODElem = document.getElementById("explanation");
let submitElem = document.getElementById("submitAPODDate");

// API key. Add date parameter to get past APOD. Concatenate this with date parameter if user submits a date.
let url = "https://api.nasa.gov/planetary/apod?api_key=MZzdiyAR2POTssNKcTtkmmrZiQWV1pXrZXcAuCIc";

/////////////////////////////////////////////////////////////////////




// On page load, display today's APOD.
getAPOD(url, displayAPOD);

// If user inputs a prior date, get prior date APOD.
submitElem.addEventListener("click", handleClick);




//////////////////////  FUNCTION DEFINITIONS  ///////////////////////
function getAPOD(url, callback) {
    let requestObject = new XMLHttpRequest();
    requestObject.addEventListener("load", function () {
        // Callback function--displayAPOD()--is now invoked within getAPOD(), which is the containing function.
        // The callback funtion is simply receiving the response as an argument. I can then define what to do with that response in the callback function's definiton.
        callback(requestObject.response);  
        console.log("handleResponse() example");
        console.log(requestObject.response);
    })

    // // This example code is from XMLHttpRequest.response. Seems to work the same as the event listener above.
    // requestObject.onreadystatechange = function() {
    //     if(requestObject.readyState === 4) {
    //         callback(requestObject.response);
    //         console.log("XMLHttpRequest.response example");
    //         console.log(requestObject.response);
    //     }
    // }

    requestObject.open("GET", url);
    requestObject.setRequestHeader("Accept", "application/json");
    requestObject.send();
    
}


// displayAPOD() was passed the response by getAPOD().
function displayAPOD(response) {
    let apodResponseObject = JSON.parse(response);
    titleAPODElem.textContent = apodResponseObject.title;
    dateAPODElem.textContent = apodResponseObject.date;
    displayAPODElem.src = apodResponseObject.url;
    explainAPODElem.textContent = apodResponseObject.explanation;

}


function handleClick() {
    let priorDateAPODElem = document.getElementById("priorDateAPOD");
    let priorDateAPOD = priorDateAPODElem.value;
    let priorDateURL = url + "&date=" + priorDateAPOD;
    let d = new Date();
    // This is returning month and day without a leading zero, which is what the api date parameter requires. Cannot check bad date this way. Server returns error message in JSON. Maybe use that to handle error.
    let today = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

    if(priorDateAPOD >= today) {
        console.log("Bad date.")
    } else {
        getAPOD(priorDateURL, displayAPOD);
    }
    
}



/////////////////////////////////////////////////////////////////////
