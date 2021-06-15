const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const helmet = require('helmet');


const app = express();
app.use(helmet());
app.use(express.json())
app.use(cors());

app.use((error, req, res, next) => {
  res.status(error.status).json({ message: error.message });
});

(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  app.listen(process.env.PORT || 5000);
  console.log(`connected to ${process.env.PORT} `)
})();