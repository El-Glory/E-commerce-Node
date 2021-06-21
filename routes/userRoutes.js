const express =   require('express');
const { Signup, Signin, getIsLoggedIn, patchUser} = require('../controllers/user.js');
const checkAuth =  require('../middlewares/checkAuth.js');
const router = express.Router();


router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/is-login",checkAuth("user"), getIsLoggedIn)
router.patch("/", checkAuth("user"), patchUser);



module.exports = router 