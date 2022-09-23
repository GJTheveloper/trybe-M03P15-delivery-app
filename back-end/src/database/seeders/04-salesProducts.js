module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'sales_products',
      [
        {
          sale_id: 1,
          product_id: 11,
          quantity: 5,
        },
        {
          sale_id: 2,
          product_id: 10,
          quantity: 4,
        },
        {
          sale_id: 2,
          product_id: 9,
          quantity: 2,
        },
        {
          sale_id: 2,
          product_id: 8,
          quantity: 1,
        },
        {
          sale_id: 3,
          product_id: 5,
          quantity: 7,
        },
        {
          sale_id: 3,
          product_id: 6,
          quantity: 8,
        },
        {
          sale_id: 4,
          product_id: 1,
          quantity: 20,
        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};
