const { Router } = require('express');
const router = Router();


// routes
router.get('/test', (req, res) => {
    const data = {
        "name": "fazt",
        "website": "fazweb.com"
    }
    res.json(data);
});

module.exports = router;