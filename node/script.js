let customObj = { // Define regular object
    name: 'custom object'
};

console.log(customObj);

// Convert regular object into JSON object in the form of a string using JSON.stringify()
let jsonString = JSON.stringify(customObj);

console.log(jsonString);
console.log(typeof jsonString);

// Convert stringified JSON object back into JSON object using JSON.parse()
let customJson = JSON.parse(jsonString);
console.log(customJson);