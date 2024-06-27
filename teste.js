// let strin =
//   "GUARDA-ROUPA TREVISO 3 PORTAS - ORGANIZAÇÃO E PRATICIDADE PARA SEU QUARTO!!";
// console.log(strin.toLowerCase());

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

(async () => {
  await sequelize.authenticate();
  const itemsTable = await sequelize.getQueryInterface().describeTable("Items");
  console.log(itemsTable);
})();
