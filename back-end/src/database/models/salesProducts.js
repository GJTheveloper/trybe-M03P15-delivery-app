const sale = require('./sales');
const product = require('./product');

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'SalesProducts',
    {
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        primaryKey: true,
        field: 'sale_id'
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        primaryKey: true,
        field: 'product_id'
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'sales_products',
    },
  );

  SalesProducts.associate = (models) => {
    models.Sales.belongsToMany(models.Products, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return SalesProducts;
};
