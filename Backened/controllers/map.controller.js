const mapService = require('../services/maps.service.js');
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination } = req.query;

        // Convert addresses to coordinates first
        const pickupCoords = await mapService.getAddressCoordinate(pickup);
        const destinationCoords = await mapService.getAddressCoordinate(destination);

        const distanceTime = await mapService.getDistanceTime(pickupCoords, destinationCoords);
        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        if (err.message === 'No coordinates found for this address') {
            return res.status(400).json({ message: 'Invalid address provided' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        if (!input) {
            return res.status(400).json({ message: 'Input query is required' });
        }

        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (err) {
        console.error('AutoComplete Error:', err.message);
        if (err.message === 'query is required') {
            return res.status(400).json({ message: 'Input query is required' });
        }
        res.status(500).json({ message: 'Unable to fetch suggestions' });
    }
}