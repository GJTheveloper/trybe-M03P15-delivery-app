require('dotenv').config();

const options = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

module.exports = {
  development: {
    ...options,
    database: 'delivery-app-test'
  },
  test: {
    ...options,
    database: 'delivery-app-test'
  },
};
