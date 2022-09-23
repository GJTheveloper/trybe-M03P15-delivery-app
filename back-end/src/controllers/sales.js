const salesService = require('../services/sales');

const getAllSales = async (req, res) => {
  const { id, role } = req.user.data;

  const sales = await salesService.getAllSales(id, role);

  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const response = await salesService.getSaleById(id);

  res.status(200).json(response);
};

const create = async (req, res) => {
  const newBuy = req.body;

  const response = await salesService.create(newBuy);

  res.status(201).json(response);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await salesService.updateStatus(id, status);

  res.status(200).json({ message: 'Done!' });
};

module.exports = { getAllSales, getSaleById, create, updateStatus };
