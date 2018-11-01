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
    if (!currentWeather) 
    {
        console.log("No information about this location.");
        showMain();
        return;
    }
    //console.log(currentWeather);
    console.log("{0}:\t\t{1}".format("Date", currentWeather.current.date));
    console.log("{0}:\t{1}".format("Temperature", currentWeather.current.temperature));
    console.log("{0}:\t\t{1}".format("Sky", currentWeather.current.skytext));
    console.log("{0}:\t{1}".format("Humidity", currentWeather.current.humidity));
    console.log("{0}:\t\t{1}".format("Wind", currentWeather.current.winddisplay));
    goTo();
}

function printForecast(goTo)
{
    if (!currentWeather) 
    {
        console.log("No information about this location.");
        showMain();
        return;
    }
    //console.log(currentWeather.forecast);
    for(i in currentWeather.forecast)
    {
        console.log("{0}:\t{1}".format("Date", currentWeather.forecast[i].date));
        console.log("{0}:\t{1}".format("Day", currentWeather.forecast[i].day));
        console.log("{0}:\t{1}".format("Low", currentWeather.forecast[i].low));
        console.log("{0}:\t{1}".format("High", currentWeather.forecast[i].high));
        console.log("{0}:\t{1}\n".format("Sky", currentWeather.forecast[i].skytextday));  
    }
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