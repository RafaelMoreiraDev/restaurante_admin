const { Router } = require("express");
const rotas = Router();

const {
  cadastrarItem,
  listarItem,
  produtosDaCategoria,
  editarItem,
  deletarItem,
  buscarItemFront
} = require("../controllers/itemController");

rotas.post("/produtos", cadastrarItem);
rotas.get("/produtos", listarItem);
rotas.get("/produtos/categorias/:idCategoria", produtosDaCategoria);
rotas.put("/produtos/:idProduto", editarItem);
rotas.delete("/produtos/:idProduto", deletarItem);
rotas.get("/produtos/categorias", buscarItemFront)
module.exports = rotas;
