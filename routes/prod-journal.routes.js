const
    express = require('express'),
    router = express.Router(),
    ProdJournalController = require('../controllers/prod-journal.controller');

router.use(async (req, res, next) => {
    // console.log(req.body);
    req.works = req.body.works;
    req.employees = req.body.employees;
    req.drafts = req.body.drafts;
    req.date = req.body.date;
    next();
})

router
    .route('/')
    .post(ProdJournalController.createPdfDay);

// router
//     .route('/week/')
//     .post(ProdJournalController.createPdfWeek);


module.exports = router;