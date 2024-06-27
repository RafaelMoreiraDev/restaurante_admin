const { where } = require("sequelize");
const Item = require("../models/item");
const Categoria = require("../models/categoria");

// cadastrar um item
const cadastrarItem = async (req, res) => {
  const { nome, descricao, preco, imagem, categoriaId } = req.body;
  if (!nome) {
    return res.status(400).json("Informe o nome do Item");
  }
  try {
    // verifica se o item ja existe
    const itemExiste = await Item.findOne({
      where: { nome: nome },
    });
    if (itemExiste) {
      return res.status(409).json("Item ja cadastrado");
    }
    const novoItem = await Item.create({
      nome,
      descricao: descricao || null,
      preco: parseFloat(preco),
      imagem: imagem || null,
      categoriaId: parseInt(categoriaId),
    });
    return res.status(201).json(novoItem);
  } catch (error) {
    console.error("Erro ao cadastrar item:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

// Listar todos os produtos
const listarItem = async (req, res) => {
  try {
    const produtos = await Item.findAll();
    return res.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar Itens:", error);
    return res.status(501).json({ mensagem: "Erro do servidor" });
  }
};

// listar produtos da categoria
const produtosDaCategoria = async (req, res) => {
  const { idCategoria } = req.params;
  if (!idCategoria) {
    return res.status(400).json({ mensagem: "Id da categoria é necesário" });
  }
  try {
    const produtosDaCategoria = await Item.findAll({
      where: { CategoriaId: idCategoria },
    });
    console.log(produtosDaCategoria);
    if (produtosDaCategoria.length < 1) {
      return res
        .status(201)
        .json({ mensagem: "não existe produtos cadastrado nesta catégoria" });
    }
    return res.json(produtosDaCategoria);
  } catch (error) {
    console.error("Erro ao buscar Itens:", error);
    return res.status(501).json({ mensagem: "Erro do servidor" });
  }
};

// editar item
const editarItem = async (req, res) => {
  const { idProduto } = req.params;
  const { nome, descricao, preco, imagem, categoriaId } = req.body;

  if (!idProduto || !nome || isNaN(preco)) {
    return res
      .status(400)
      .json({ mensagem: "Id, nome e preço válido do item são necessários" });
  }

  try {
    const itemExiste = await Item.findByPk(idProduto);
    if (!itemExiste) {
      return res.status(404).json({ mensagem: "Item não encontrado" });
    }
    await itemExiste.update({ nome, descricao, preco, imagem, categoriaId });
    return res.status(200).json(itemExiste);
  } catch (error) {
    console.error("Erro ao atualizar Item:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

// deletar item
const deletarItem = async (req, res) => {
  const { idProduto } = req.params;
  if (!idProduto) {
    return res.status(400).json({ mensagem: "Id do item é necessário" });
  }
  try {
    const resultado = await Item.destroy({ where: { id: idProduto } });

    if (resultado === 0) {
      return res.status(404).json({ mensagem: "Item não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar Item:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const buscarItemFront = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      include: [{
        model: Item,
        attributes: ['id', 'nome', 'descricao', 'preco', 'imagem'],
      }],
    });

    // console.log('Categorias:', JSON.stringify(categorias, null, 2));

    const cardapio = {};

    categorias.forEach(categoria => {
      cardapio[categoria.nome] = categoria.Items.map(item => ({
        // id: `${item.id}-${item.nome.toLowerCase().replace(/\s+/g, '-')}`, 
        img: item.imagem,
        name: item.nome,
        dsc: item.descricao,
        price: item.preco,
      }));
    });

    res.status(200).json(cardapio);
  } catch (error) {
    console.error("Erro ao buscar cardápio:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


module.exports = {
  cadastrarItem,
  listarItem,
  produtosDaCategoria,
  editarItem,
  deletarItem,
  buscarItemFront,
};
