require('dotenv').config();
require('./db/mongoose');
// const fs = require('fs-extra');

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
const axios = require('axios');
const cron = require('node-cron');

const port = process.env.PORT;
const errorHandler = require('./middlewares/errorHanlder');

app.use(express.json());
app.use(cors());

app.use(fileUpload({ parseNested: true }));
app.use('/api/users', require('./routes/user.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/products', require('./routes/product.route'));
app.use('/api/carts', require('./routes/cart.route'));

// app.delete('/delete', (req, res) => {
//   const staticPath = path.join(__dirname, '../static');

//   fs.remove(staticPath);

//   res.send({
//     status: 1,
//   });
// });
cron.schedule('* * * * *', function() {
  axios
    .get('https://sell-old-items.herokuapp.com/api/categories')
    .then(function(response) {
      // handle success
      console.log(response.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
});

app.use(express.static(path.join(__dirname, '../static')));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
