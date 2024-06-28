const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./config/config");
const rotasCategoria = require("./routes/categorias");
const rotasItem = require("./routes/itens");
const Item = require("./models/item");

const PORT = process.env.PORT || 3002;

const app = express();
app.use(
  cors({
    origin: "*", // Permite todas as origens
    methods: ["GET", "POST", "PUT", "DELETE"], // Permite todos os métodos
    allowedHeaders: ["Content-Type", "Authorization"], // Permite cabeçalhos específicos
  })
);
app.use(express.json());

// Teste a conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
})();

app.use(express.urlencoded({ extended: true }));
app.use(rotasCategoria);
app.use(rotasItem);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// npx sequelize migration:generate --name create-categoria
// npx sequelize migration:generate --name create-item
