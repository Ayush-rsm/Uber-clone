const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const url = `https://api.openrouteservice.org/geocode/search`;

    try {
        const response = await axios.get(url, {
            params: {
                text: address,
                size: 1,
                api_key: apiKey
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.data.features && response.data.features.length > 0) {
            const [lng, ltd] = response.data.features[0].geometry.coordinates;
            return {
                ltd,
                lng
            };
        } else {
            throw new Error('No coordinates found for this address');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw new Error('Unable to fetch coordinates');
    }
}

module.exports.getDistanceTime = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

    console.log('Pickup Coordinates:', pickup);
    console.log('Destination Coordinates:', destination);

    try {
        const response = await axios.post(url, {
            coordinates: [
                [pickup.lng, pickup.ltd],
                [destination.lng, destination.ltd]
            ]
        }, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.data && response.data.routes && response.data.routes[0]) {
            const route = response.data.routes[0];
            return {
                distance: { 
                    text: `${(route.summary.distance / 1000).toFixed(1)} km`,
                    value: route.summary.distance // in meters
                },
                duration: {
                    text: `${Math.round(route.summary.duration / 60)} mins`,
                    value: route.summary.duration // in seconds
                }
            };
        } else {
            throw new Error('No routes found');
        }
    } catch (err) {
        console.error('OpenRouteService Error:', err.message);
        throw new Error('Unable to fetch distance and time');
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const url = 'https://api.openrouteservice.org/geocode/autocomplete';

    try {
        const response = await axios.get(url, {
            params: {
                text: input,
                api_key: apiKey
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.data && response.data.features) {
            return response.data.features.map(feature => feature.properties.label);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error('OpenRouteService Error:', err.message);
        throw new Error('Unable to fetch suggestions');
    }
}

// module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

//     // radius in km


//     const captains = await captainModel.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [ [ ltd, lng ], radius / 6371 ]
//             }
//         }
//     });

//     return captains;


// }