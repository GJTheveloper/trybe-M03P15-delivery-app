const salesProducts = require('./salesProducts');

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'Sales',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        field: 'user_id',
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        field: 'seller_id',
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
        field: 'total_price',
      },
      deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
      deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
      saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'sale_date',
      },
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    },
  );

  return Sales;
};
