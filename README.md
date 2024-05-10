# JSON

- JSON stands for "**J**ava**S**cript **O**bject **N**otation"
- one of the most common ways of sending data around the internet
- can only contain plain data -- no methods or comments

---

# Why JSON?

* used for data *without* behavior
  * saving/loading to disk or database
  * transmitting information across network
* efficient to parse and compress
* human-readable
* well-defined rules
  * always Unicode, usually UTF-8
* very flexible data format
  * allows for endlessly nestable data

---

# Example JSON object

```javascript
  {
    "Image": {
        "Width":  800,
        "Height": 600,
        "Title":  "View from 15th Floor",
        "Thumbnail": {
            "Url":    "http://www.example.com/image/481989943",
            "Height": 125,
            "Width":  100
        },
        "Animated" : false,
        "IDs": [116, 943, 234, 38793]
      }
  }
```

(from [the spec](https://tools.ietf.org/html/rfc7159#section-13))

---

# JSON Collections

- A JSON file might contain multiple JSON objects.
- It will contain an *array* of JSON objects.
- Looks and works like a normal JavaScript array
  - You can use any, and all, array methods on a JSON collection.

---

# Example JSON Collection

```javascript
[
    {
       "precision": "zip",
       "Latitude":  37.7668,
       "Longitude": -122.3959,
       "Zip":       "94107",
       "Country":   "US"
    },
    {
       "precision": "zip",
       "Latitude":  37.371991,
       "Longitude": -122.026020,
       "Zip":       "94085",
       "Country":   "US"
    }
]
```

(from [the spec](https://tools.ietf.org/html/rfc7159#section-13))

---

# Viewing JSON in the Browser

* Its mime-type is `application/json` which most browsers will display all on one line
  * No longer human-readable
* There are browser extensions that will render it better
  * Chrome: [JSON Viewer](https://github.com/tulios/json-viewer) (click on "Chrome Web Store" button to install)


![json viewer screenshot](https://raw.githubusercontent.com/tulios/json-viewer/master/screenshot.png)

---

# Viewing JSON in Node

* You can also _copy_ a JSON blob and _paste_ it into a Node REPL 

```
$ node
> { "Image": { "Width":  800, "Height": 600, "Title":  "View from 15th Floor", "Thumbnail": { "Url":    "http://www.example.com/image/481989943", "Height": 125, "Width":  100 }, "Animated" : false, "IDs": [116, 943, 234, 38793] } }
{ Image:
   { Width: 800,
     Height: 600,
     Title: 'View from 15th Floor',
     Thumbnail:
      { Url: 'http://www.example.com/image/481989943',
        Height: 125,
        Width: 100 },
     Animated: false,
     IDs: [ 116, 943, 234, 38793 ]
    }
}
```

---

# Parsing JSON in JavaScript

- `JSON.parse(someString)` => from string to object
- `JSON.stringify(someObject)` => from object to string

---

# JSON Restrictions

While JSON objects operate like normal JavaScript objects inside a JS file they do have some additional restrictions when defined in a JSON file.

* All strings, including object keys, must be double quoted
  * No single quotes, or template strings allowed!
* All values must be hard coded in, expressions can't be used, and won't be interpreted
* No methods, JSON is for data without behavior
* Any primitive data type is a valid value for a JSON property
* JSON supports nested JSON objects, and arrays

---

# Turning JavaScript into JSON

We can turn any JavaScript Object into a JSON object as long as it doesn't have any methods attached to it.

Call `JSON.stringify` passing in a JavaScript object to turn it into a string version of a JSON object. You can then pass it around, or store it in your application, and turn it into a JSON object where you need it by using `JSON.parse` on the stringified object.

```js
let customObj = {
  name: 'custom object'
}

let jsonString = JSON.stringify(customObj)
```

```js
let customJson = JSON.parse(jsonString)
```

---

# API Endpoints

API stands for "Application Program Interface"

APIs are used to send data into a front end application

They are an interface between your raw data, and the front end display

---

# JSON and APIs

Many APIs send data over as JSON, or have the option to send data as JSON based on query parameters.

An API Endpoint in its simplest incarnation could be a directory in your filesystem where you store JSON files

When you receive a request from your client side application your server will then query that directory for a document matching the request, and if it finds one it sends the data back over

---

# Querying APIs

To query an API you can send a `GET` request to a certain path (which you've defined on your server), or to the location of the endpoint in your filesystem.

You can also send requests through forms, or other inputs to bring back specific subsets of data. Often times there will be some parsing, and conversion necessary on the front end to display the data where, and how you want.

---

# Postman

Postman is a great tool for seeing exactly what data you will get back from a given request

If you don't already have Postman installed you can get it [here](https://www.postman.com/downloads/). Go ahead and download it now.

* Open up the Postman app, and create a new collection named 'test'
* In this collection create a new `GET` request, and name it 'basic get'
* Select `GET` as the type of request and give it the url `https://jsonplaceholder.typicode.com/posts/1`
* Hit the "Send" button, and see what you get back

There are also many prebuilt collections for commonly used API routes (such as the [GitHub API](https://developer.github.com/v3/)) which you can generally find on the site that hosts the route, or through a quick Google search.

---

# Why an API?

Why would we want to set up an API endpoint?

Couldn't we just query the filesystem, or database directly from the front end?

---

## APIs Reduce Security Risks

Anything that happens on the client side of your application should be considered public data since *it is impossible to hide any code or data that lives on the browser*.

If we need any sort of login credentials, or secured services (like databases) we need to make those connections on the server so our credentials aren't leaked to bad actors on the internet.

We perform the query to the database (or other service) from the server, and then send back *just the data that was requested* to a location where or front end can see the data; our API endpoint.

---

# Flow of Data With an Integrated DB

1. client requests data from the server
2. server queries the database
3. server sends the requested data to the API endpoint
4. client fetches the data from the API
5. client uses the data on the page