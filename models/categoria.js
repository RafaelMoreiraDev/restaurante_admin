const { DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

const Categoria = sequelize.define("Categoria", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descricao: DataTypes.TEXT,
}, {
  tableName: 'Categoria', 
});


const Item = require('./item'); // Certifique-se de que o Item é importado corretamente aqui
Categoria.hasMany(Item, { foreignKey: "CategoriaId" }); // Defina a associação


module.exports = Categoria;
