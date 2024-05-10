const form = document.getElementById("form");
const BASE_URL = "http://localhost:3000"; //Setup base url variable. Holds localhost:3000 so we dont have to constantly write that.

document.addEventListener("DOMContentLoaded", async () => {
    let response = await fetch(`${BASE_URL}/example`);
    let data = await response.json(); // Converts json expected response into result we expect

    console.log(data);
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titleValue = e.target.title.value; // Grab value from title input field with form HTML element

    // Create request body object with populated property value for 'title'
    const body = {
        title: titleValue
    }

    // Setup request object
    const requestObject = {
        method: "POST", // method. Lets the server know what kind of request we are doing
        body: JSON.stringify(body), // body. We are going to send our data in the format of json so we use JSON.stringify()
        headers: { // headers. Let the server we are going to be sending json
            'Content-Type': 'application/json'
        }
    }

    let response = await fetch(`${BASE_URL}/compare`, requestObject); // fetch request for POST
    let data = await response.json(); // Receive the response and then convert it from JSON string into an object

    console.log(data); // Print out the data / parsed response from server
})