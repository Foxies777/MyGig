const { Street } = require('../models/models')

class StreetController {
    async getAllStreets(req, res) {
        try {
            const Streets = await Street.findAll();
            return res.status(200).json(Streets);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    async create(req, res) {
        try {
            const newStreet = await Street.create({
                street_name: req.body.street_name,
                description: req.body.description
            });
            console.log(newStreet);
            return res.status(201).json(newStreet);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new StreetController();