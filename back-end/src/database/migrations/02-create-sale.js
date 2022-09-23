'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'sales',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'users',
            key: 'id',
          },
          field: 'user_id',
        },
        sellerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'users',
            key: 'id',
          },
          field: 'seller_id',
        },
        totalPrice: {
          allowNull: false,
          type: Sequelize.DECIMAL(9, 2),
          field: 'total_price',
        },
        deliveryAddress: {
          allowNull: false,
          type: Sequelize.STRING,
          field: 'delivery_address',
        },
        deliveryNumber: {
          allowNull: false,
          type: Sequelize.STRING,
          field: 'delivery_number',
        },
        saleDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
          field: 'sale_date',
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        underscored: true,
        timestamps: false,
      },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('sales');
  },
};
