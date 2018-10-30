var weather = require('weather-js');
var NodeGeocoder = require("node-geocoder");

String.prototype.format = String.prototype.f = function() 
{
    var s = this,
    i = arguments.length;
   
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
}

var APIs = {

    weather: {

        weatherApp: weather,

        internals: {

            findListener: function(err, result, callback)
            {
                var response = null;
                console.log(err);
                console.log(result);
                if(!err && result.length > 0) response = {
                        location: result[0].location.name,
                        lat: result[0].location.lat,
                        lng: result[0].location.long,
                        current: result[0].current,
                        forecast: result[0].forecast
                    }
                
                callback(response);
            }

        },

        find: function(loc, callback, degreeType = "F")
        {
            this.weatherApp.find({ search: loc, degreeType: degreeType }, function(err, result) 
            {
                APIs.weather.internals.findListener(err, result, callback);
            });
        }

    },

    geocoder: {

        geocoderApp: NodeGeocoder({ provider: "mapquest", apiKey: process.env.GEOCODER_KEY}),
        
        internal: {
            
            findListener: function(err, result, callback)
            {
                var response = null;
                //console.log(err);
                //console.log(result);
                if(!err && result.length > 0)  response = {
                        lat: result[0].latitude,
                        lng: result[0].longitude,
                        country: result[0].country,
                        contryCode: result[0].countryCode,
                        city: result[0].city,
                        stateCode: result[0].stateCode,
                        zipcode: result[0].zipcode,
                        toString: function()
                        {
                            return "{0}, {1}".format(this.city, this.stateCode);
                        }
                    }
                
                callback(response);
            }

        },

        find: function(loc, callback)
        {
            this.geocoderApp.geocode(loc, function(err, data) 
            {
                APIs.geocoder.internal.findListener(err, data, callback);
            });
        }

    }

}

module.exports = APIs;