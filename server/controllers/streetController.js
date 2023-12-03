class StreetController {
    async getAllStreets(req, res) {
        try {
            const streets = await Streets.findAll();
            return res.status(200).json(streets);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    async addStreet(req, res) {
        try {
            const newStreet = await Streets.create({
                street_name: req.body.street_name
            });

            return res.status(201).json(newStreet);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    async updateStreet(req, res) {
        try {
            const streetId = req.params.id; // Предполагается, что id улицы передается в параметрах запроса
            const updatedStreet = await Streets.update(
                { street_name: req.body.street_name },
                { where: { street_id: streetId } }
            );

            if (updatedStreet[0] === 1) {
                return res.status(200).json({ message: 'Street updated successfully' });
            } else {
                return res.status(404).json({ message: 'Street not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    // Другие методы для работы с улицами
}

module.exports = new StreetController();