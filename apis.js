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
                if(!err) response = {
                        location: result.location.name,
                        lat: result.location.lat,
                        lng: result.location.long,
                        current: result.current,
                        forecast: result.forecast
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
                if(!err) 
                {
                    response = {
                        lat: result.latitude,
                        lng: result.longitude,
                        country: result.country,
                        contryCode: result.countryCode,
                        city: result.city,
                        stateCode: result.stateCode,
                        zipcode: result.zipcode,
                        toString: function()
                        {
                            return "{0}, {1}".format(this.city, this.stateCode);
                        }
                    }
                }
                callback(response);
            }

        },

        find: function(loc, callback)
        {
            geocoder.geocode(loc, function(err, data) 
            {
                APIs.geocoder.internal.findListener(err, data, callback);
            });
        }

    }

}

module.exports = APIs;