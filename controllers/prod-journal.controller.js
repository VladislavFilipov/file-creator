const ProdJournalService = require('../services/prod-journal.service');

class ProdJournalController {
    async createPdfDay(req, res) {

        try {
            let result = await ProdJournalService.createPdfDay(req);

            return res.status(200).contentType('application/pdf').send(result);
        } catch (error) {
            console.log('catch error', error);
            return res
                .status(error.status)
                .send({ message: error.message });
        }
    }
}

module.exports = new ProdJournalController();