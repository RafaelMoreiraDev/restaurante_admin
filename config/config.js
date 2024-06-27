const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

module.exports = sequelize;

// module.exports = {
//   development: {
//     dialect: "sqlite",
//     storage: "./database.sqlite",
//   },
//   test: {
//     dialect: "sqlite",
//     storage: "./database.sqlite",
//   },
//   production: {
//     dialect: "sqlite",
//     storage: "./database.sqlite",
//   },
// };
