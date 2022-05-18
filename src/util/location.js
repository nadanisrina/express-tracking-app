const axios = require('axios');
const HttpError = require('../models/http-error');
const getCoordinates= async (address) => {
    const apiKey = 'pk.eyJ1IjoibmFkYTAyNiIsImEiOiJjbDNidjluN2UwMHU5M2NwMnI0eXV3NTFrIn0.yI35NG2DtMrbgA6eAZfREQ';
    const response =  await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`);
   
    if(!response){
        throw new HttpError('Could not find coordinates', 404)
    }
    return {
        lat : response?.data?.features[0]?.geometry?.coordinates[0] ?? 0,
        long: response?.data?.features[0]?.geometry?.coordinates[1] ?? 0
    }
}

module.exports = getCoordinates