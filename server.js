const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const helmet = require('helmet');

const 	router  = require("./routes/index.js");
const checkAuth = require("./middlewares/checkAuth");



const app = express();
app.use(helmet());

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(router);

app.use((error, req, res, next) => {
  res.status(error.status).json({ message: error.message });
});

app.get('/', (req, res) => {
	res.json('Welcome')
});

(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  app.listen(process.env.PORT || 5000);
  console.log(`connected to ${process.env.PORT} `)
})();