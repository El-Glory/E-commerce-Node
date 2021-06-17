const express =   require('express');
const  userRoutes  =    require('./userRoutes.js');

const router = express.Router();
router.use('/', userRoutes);
module.exports = router
