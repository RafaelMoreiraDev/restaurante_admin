const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Categoria = require("./categoria");

const Item = sequelize.define("Item", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: DataTypes.TEXT,
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imagem: DataTypes.STRING,
  CategoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Categoria',  // Use o nome da tabela em vez do modelo diretamente
      key: 'id'
    }
  },
});

// Exportamos o modelo sem a associação aqui para evitar dependências circulares
module.exports = Item;
