const salesProducts = require('./salesProducts');

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(4, 2),
      urlImage: { type: DataTypes.STRING, field: 'url_image' },
    },
    {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    },
  );

  return Products;
};
