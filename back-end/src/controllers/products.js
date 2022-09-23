const ProductService = require('../services/products');

const getAllProducts = async (req, res) => {
  const products = await ProductService.getAllProducts();

  return res.status(200).json(products);
};

module.exports = { getAllProducts };
