'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'sales',
      [
        {
          user_id: 3,
          seller_id: 2,
          total_price: 17.45,
          delivery_address: 'Rua Lazaro Godoy',
          delivery_number: '164',
          status: 'Pendente',
          sale_date: '25-08-22 01:02:03',
        },

        {
          user_id: 3,
          seller_id: 2,
          total_price: 34.85,
          delivery_address: 'Rua Um',
          delivery_number: '111',
          status: 'Preparando',
          sale_date: '25-08-22 02:03:04',
        },
        {
          user_id: 3,
          seller_id: 2,
          total_price: 51.25,
          delivery_address: 'Rua Dois',
          delivery_number: '222',
          status: 'Entregue',
          sale_date: '25-08-22 03:04:05',
        },
        {
          user_id: 3,
          seller_id: 2,
          total_price: 44.00,
          delivery_address: 'Rua Tres',
          delivery_number: '333',
          status: 'Pendente',
          sale_date: '25-08-22 04:05:06',
        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
