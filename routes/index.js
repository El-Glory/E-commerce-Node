const express = require('express');
const userRoutes = require('./userRoutes.js');
const productRoutes = require('./productRoutes.js');

const router = express.Router();
router.use('/', userRoutes, productRoutes);
module.exports = router;
