const express = require('express'),
    router = express.Router(),
    prodJournalRoutes = require('./prod-journal.routes');

router.use('/prod-journal', prodJournalRoutes);

module.exports = router;