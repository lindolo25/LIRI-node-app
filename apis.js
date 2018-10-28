var keys = require('./keys.js');

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

    fandango: {
        key: keys.fKey,
        secret: keys.fSecret,
        internals: {

            sha256Encode: function (stringToEncode) 
            {
                var crypto = require('crypto');
                var result = crypto.createHash('sha256').update(stringToEncode).digest('hex');
                return result;
            },
            
            buildAuthParameters: function (apiKey, sharedSecret)
            {
                var seconds = Math.floor(new Date() / 1000);
                var paramsToEncode = apiKey + sharedSecret + seconds;
                var encodedParams = sha256Encode(paramsToEncode);
                var result = 'apikey={0}&sig={1}'.format(apiKey, encodedParams);
                return result;
            },
            
            buildURI: function (op, zipCode) {
               
                var baseUri = 'http://api.fandango.com';
                var apiVersion = '1';
                var authorizationParameters = this.buildAuthParameters(APIs.fandango.key, APIs.fandango.secret);
                var requestUri = '{0}/v{1}/?op={2}&postalcode={3}&{4}'.format(baseUri, apiVersion, op, zipCode, authorizationParameters);
                return requestUri;
            }

        }
    },

    bandsInTown : {
        key : keys.secret
    }

}

module.exports = APIs;