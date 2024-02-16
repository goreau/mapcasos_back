const NodeGeocoder = require('node-geocoder');

class Generic {
    async geocode(address){
        var result = {};
        const options = {
            provider: 'locationiq',
            apiKey: process.env.GEOCODE_API, 
            formatter: null 
        };
          
        const geocoder = NodeGeocoder(options);

        try{
            const geo = await geocoder.geocode(address);
            result = geo;
          
        }catch(err){
            console.log(err);
        } finally{
            return result;
        }
      } 

    }

module.exports = new Generic();