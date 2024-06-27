const { Router } = require("express");
const {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
} = require("../controllers/categoriaController");

var rotas = Router();

rotas.post("/categorias", criarCategoria);
rotas.put("/categorias/:id", atualizarCategoria);
rotas.get("/categorias", listarCategorias);
rotas.delete("/categorias/:id", deletarCategoria);

module.exports = rotas;
