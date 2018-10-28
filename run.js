require("dotenv").config();
var inquirer = require('inquirer');
var APIs = require('./apis.js');

console.log(APIs);

showMain();

function showMain()
{
    inquirer.prompt([{
        type: "list",
        message: "\nWelcome, choose your interest to continue.\n",
        choices: ["Movies", "Live Music shows", "Exit"],
        name: "Main"
    },])
    .then(function(response) 
    {
        switch(response.Main)
        {
            case "Movies":
                showMovies();
                break;
            case "Live Music shows":
                showMusic();
                break;
            case "Exit":
                break;
            default:
                console.log("Please make a choise to continue.\n");
                showMain();
                break;
        }
    });
}

function showMovies()
{
    inquirer.prompt([{
        type: "list",
        message: "\nMovies are great, what are you looking for?\n",
        choices: ["Find a Movie", "Find Showtimes Nearby", "Back to Main Menu"],
        name: "Movies"
    },])
    .then(function(response) 
    {
        switch(response.Movies)
        {
            case "Find a Movie":
                console.log("The user requested: " + response.Movies);
                showMain();
                break;
            case "Find Showtimes Nearby":
                console.log("The user requested: " + response.Movies);
                showMain();
                break;
            case "Back to Main Menu":
                showMain();
                break;
            default:
                console.log("Please make a choise to continue.\n");
                showMovies();
                break;
        }
    });
}

function showMusic()
{
    inquirer.prompt([{
        type: "list",
        message: "\nLets go LIVE!\n",
        choices: ["Find your Band", "Look for Shows in Town", "Back to Main Menu"],
        name: "Music"
    },])
    .then(function(response) 
    {
        switch(response.Music)
        {
            case "Find your Band":
                console.log("The user requested: " + response.Movies);
                showMain();
                break;
            case "Look for Shows in Town":
                console.log("The user requested: " + response.Movies);
                showMain();
                break;
            case "Back to Main Menu":
                showMain();
                break;
            default:
                console.log("Please make a choise to continue.\n");
                showMusic();
                break;
        }
    });
}
