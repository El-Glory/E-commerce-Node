const express =   require('express')
const { Signup } = require('../controllers/user.js');
const checkAuth =  require('../middlewares/checkAuth.js');
const router = express.Router();


router.post("/signup", Signup);


module.exports = router 