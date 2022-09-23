const { Router } = require('express');

const sales = require('../controllers/sales');

const { authenticateToken } = require('../middlewares/tokenMiddleware');

const salesRoute = Router();

salesRoute.get('/sales', authenticateToken, sales.getAllSales);
salesRoute.get('/sales/:id', authenticateToken, sales.getSaleById);
salesRoute.post('/checkout', authenticateToken, sales.create);
salesRoute.put('/status/:id', authenticateToken, sales.updateStatus);

module.exports = salesRoute;
