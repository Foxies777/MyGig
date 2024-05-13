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
    async update(req, res) {
        try {
            const updateStreet = await Street.update({
                street_name: req.body.street_name,
                description: req.body.description
            }, {
                where: { id: req.params.id }
            });
            return res.json(updateStreet)
        } catch (error) {
            console.error(error);
            return res.send('Update Error')
        }
    }
    // В streetController.js

    async delete(req, res) {
        try {
            const id = req.params.id; 
            const deleteStreet = await Street.destroy({
                where: { id: id }
            });
            if (deleteStreet) {
                return res.status(204).send('Street deleted');
            }
            throw new Error("Street not found");
        } catch (error) {
            console.error("Error deleting street: ", error);
            return res.status(500).send(error.message);
        }
    }

}

module.exports = new StreetController();