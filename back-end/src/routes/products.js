const { Router } = require('express');
const Products = require('../controllers/products');
const { authenticateToken } = require('../middlewares/tokenMiddleware');

const productsRoute = Router();

productsRoute.get('/products', authenticateToken, Products.getAllProducts);

module.exports = productsRoute;
