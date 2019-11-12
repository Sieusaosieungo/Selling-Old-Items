require('dotenv').config();
require('./db/mongoose');

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const errorHandler = require('./middlewares/errorHanlder');

app.use(express.json());
app.use(cors());
app.use('/api/users', require('./routes/user.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/products', require('./routes/product.route'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
