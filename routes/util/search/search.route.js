const express = require("express");
const searchEngine = require("./searchEngine");
const router = express.Router();

router.get('/api/search/:query', async (req, res) => {
    const query = req.params.query; // Get the query from the client
    const searchResults = await searchEngine(query);

    res.json(searchResults);
});

module.exports = router;