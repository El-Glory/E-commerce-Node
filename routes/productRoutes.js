const express = require('express');
const router = express.Router();
const {postProduct} = require('../controllers/product.js');
const checkAuth = require('../middlewares/checkAuth.js');

router.post("/", checkAuth(), postProduct);


module.exports = router;



