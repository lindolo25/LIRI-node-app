require("dotenv").config();
var inquirer = require('inquirer');
var API_s = require('./apis.js');

var userName = null;
var userLocation = null;
var userWeather = null;
var currentWeather = null;
init();

function init()
{
    inquirer.prompt([{
        type: "input",
        message: "Please type in your name:",
        name: "name"
    },
    {
        type: "input",
        message: "Please type in your current location:",
        name: "loc"
    }])
    .then(function(response) 
    {
        var name = response.name.trim();
        var loc = response.loc.trim();

        if(name && loc)
        {
            userName = name;
            console.log("Loading location ...");
            API_s.geocoder.find(loc, function(response) 
            {
                
                userLocation = response;
                console.log("Loading weather information ...");
                API_s.weather.find(userLocation.toString(), function(response)
                {
                    userWeather = response;
                    showMain();
                });
            });
        }
        else {
            console.log("Please fill your name and location to continue.\n");
            init();
        }
    });
}

function showMain()
{
    currentWeather = userWeather;
    inquirer.prompt([{
        type: "list",
        message: "\nWelcome "+ userName +", how can I help you? (Choose from the options below)\n",
        choices: ["Current weather", "Forecast", "Search other cities", "Exit"],
        name: "Main"
    },])
    .then(function(response) 
    {
        switch(response.Main)
        {
            case "Current weather":
                printCurrentWeather(showMain);
                break;
            case "Forecast":
                printForecast(showMain);
                break;
            case "Search other cities":
                search();
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

function showMenu()
{
    inquirer.prompt([{
        type: "list",
        message: "\nWelcome "+ userName +", how can I help you? (Choose from the options below)\n",
        choices: ["Show weather", "Show Forecast", "Go Back", "Exit"],
        name: "Main"
    },])
    .then(function(response) 
    {
        switch(response.Main)
        {
            case "Show weather":
                printCurrentWeather(showMenu);
                break;
            case "Show Forecast":
                printForecast(showMenu);
                break;
            case "Go Back":
                showMain();
                break;
            case "Exit":
                break;
            default:
                console.log("Please make a choise to continue.\n");
                showMenu();
                break;
        }
    });
}

function printCurrentWeather(goTo)
{
    console.log(currentWeather);
    goTo();
}

function printForecast(goTo)
{
    console.log(currentWeather.forecast);
    goTo();
}

function search()
{
    inquirer.prompt([{
        type: "input",
        message: "Please type in the location:",
        name: "loc"
    }])
    .then(function(response) 
    {
        var loc = response.loc.trim();

        if(loc)
        {
            console.log("Loading location ...");
            API_s.geocoder.find(loc, function(response) 
            {
                console.log("Loading weather information ...");
                API_s.weather.find(response.toString(), function(response)
                {
                    currentWeather = response;
                    showMenu();
                });
            });
        }
        else {
            console.log("Please fill your name and location to continue.\n");
            init();
        }
    });
}