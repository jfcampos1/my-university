require('dotenv').config();


const config = {
  default: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1',
    operatorsAliases: false,
  },
  development: {
    extend: 'default',
    database: 'my_university_dev',
  },
  test: {
    extend: 'default',
    database: 'my_university_test',
  },
  production: {
    extend: 'default',
  },
};

Object.keys(config).forEach((configKey) => {
  const configValue = config[configKey];
  if (configValue.extend) {
    config[configKey] = Object.assign({}, config[configValue.extend], configValue);
  }
});

module.exports = config;
