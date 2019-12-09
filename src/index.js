require('dotenv').config();
require('./db/mongoose');
// const fs = require('fs-extra');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
// const axios = require('axios');
// const cron = require('node-cron');

const port = process.env.PORT;
const errorHandler = require('./middlewares/errorHanlder');

app.use(express.json());
app.use(cors());

app.use(fileUpload({ parseNested: true }));
app.use('/api/users', require('./routes/user.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/products', require('./routes/product.route'));
app.use('/api/carts', require('./routes/cart.route'));
app.use('/api/top', require('./routes/top.route'));

app.use(express.static(path.join(__dirname, '../static')));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
