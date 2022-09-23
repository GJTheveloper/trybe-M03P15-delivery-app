const Sequelize = require('sequelize');
const { Sales, Products, SalesProducts, Users } = require('../database/models');
const HttpException = require('../shared/http.exception');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const getAllSales = async (id, role) => {
  let result = null;
  if (role === 'customer') {
    result = await Sales.findAll({ where: { userId: id } });
  } else if (role === 'seller') {
    result = await Sales.findAll({ where: { sellerId: id } });
  } else result = await Sales.findAll();
  return result;
};

const formatSale = (products) => products.map((item) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price),
    urlImage: item.urlImage,
    quantity: item.SalesProducts.quantity,
    subTotal: item.SalesProducts.quantity * Number(item.price),
  }));

const getSaleById = async (id) => {
  const sale = await Sales.findByPk(id, {
    include: [{ model: Products, as: 'products' }],
  });

  if (!sale) throw new HttpException(404, 'Venda não existe!');

  const seller = await Users.findByPk(sale.sellerId);

  return {
    id: sale.id,
    userId: sale.userId,
    sellerId: sale.sellerId,
    sellerName: seller.name,
    totalPrice: Number(sale.totalPrice),
    deliveryAddress: sale.deliveryAddress,
    deliveryNumber: sale.deliveryNumber,
    saleDate: sale.saleDate,
    status: sale.status,
    products: formatSale(sale.products),
  };
};

const checkTotalPrice = (products) => {
  const initialValue = 0;
  const finalPrice = products.reduce(
    (prevValue, curObj) => prevValue + (curObj.price * curObj.quantity),
    initialValue,
  );

  return finalPrice.toFixed(2);
};

const create = async (newBuy) => {
  const t = await sequelize.transaction();
  const totalPrice = checkTotalPrice(newBuy.products);
  try {
    const sale = await Sales.create({ ...newBuy, totalPrice }, { transaction: t });
    const insert = newBuy
      .products.map((item) => ({ saleId: sale.id, productId: item.id, quantity: item.quantity }));
      await SalesProducts.bulkCreate(insert, { transaction: t });
    await t.commit();

    return {
      id: sale.id,
      ...newBuy,
      products: insert,
    };
  } catch (e) {
    await t.rollback();
    throw new HttpException(400, e.message);
  }
};

const updateStatus = async (id, status) => {
  await Sales.update({ status },
    { where: { id } });
};

module.exports = { getAllSales, getSaleById, create, updateStatus };
