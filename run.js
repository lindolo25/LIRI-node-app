require("dotenv").config();
var inquirer = require('inquirer');
var keys = require('./keys.js');

//var spotify = new Spotify(keys.spotify);
console.log(keys);

inquirer.prompt([{
        type: "list",
        message: "\nWhat are interested in?\n",
        choices: ["Movies", "Live Music"],
        name: "main"
    }])
    .then(function(Response) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (Response.main === "Movies") {
        console.log("\nWelcome to " + Response.main);
        }
        else {
        console.log("Welcome to " + Response.main);
        }
    });