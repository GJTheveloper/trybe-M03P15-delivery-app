require('express-async-errors');
const cors = require('cors');
const express = require('express');
const userRoute = require('../routes/user');
const productsRoute = require('../routes/products');
const errorMiddleware = require('../middlewares/errorMiddleware');
const salesRoute = require('../routes/sales');

const app = express();
app.use(express.static('public'));
app.use(cors({
  origin: '*',
}));

app.use(express.json());
app.use(userRoute);
app.use(salesRoute);
app.use(productsRoute);
app.use(errorMiddleware);

module.exports = app;
