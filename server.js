// Import necessary packages
const express = require("express");
const cors = require("cors");
// Import local json files from our api folder
const jsonData = require("./api/data.json");
const jsonCollection = require("./api/collection.json");

const app = express(); // Open express package instance

// Setup for making our server work to our needs
app.use(express.json()); // Allow the server to understand json
app.use(express.urlencoded({ extended: false })); // Allow body parsing for sending data from HTML Form
app.use(cors()); // Allow communication between frontend and backend

const port = 3000; // Identify port number. If already taken, use others like 3001, 8000, 8080.

// GET Route. To reach, go to 'http://localhost:3000/data'. This is used to print out our jsonData object
app.get("/data", (req, res) => {
    console.log(jsonData);
    res.status(200).send(jsonData); // Server responds to request with jsonData as json and with status code 200
})

// GET Route. To reach, go to 'http://localhost:3000/collection'. This is used to print out our jsonCollection array
app.get("/collection", (req, res) => {
    console.log(jsonCollection);
    res.status(200).send(jsonCollection); // Server responds to request with jsonCollection as json with status code 200
})

// GET Route.
app.get("/example", (req, res) => {
    res.status(200).json("Route hit"); // This route responds with a string. For this to be ready from our client side, we use .json() instead of .send()
})

// POST Route. To reach, go to 'http://localhost:3000/compare'
app.post("/compare", (req, res) => {
    const titleFromData = jsonData.Image.Title; // Focus on Title property value within jsonData object
    const titleFromBody = req.body.title; // Focus on title property value from body object. This comes from our form on the html side

    let titleMatch = null;

    // Check to see title from both objects above match
    if (titleFromData === titleFromBody) {
        titleMatch = true;
    } else {
        titleMatch = false;
    }

    // Setup response object
    const response = {
        title: titleMatch, // title property. Value is the titleMatch variable value.
        message: titleFromData === titleFromBody ? "TITLE MATCHES" : "NO MATCH" //message property. Ternary operator used here. If titleFromData & titleFromBody is a match, use 'TITLE MATCHES', else use 'NO MATCH'
    }

    // Send back 201 status code with response object
    res.status(201).send(response);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})