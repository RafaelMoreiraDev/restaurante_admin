const { json } = require("sequelize");
const Categoria = require("../models/categoria");

const criarCategoria = async (req, res) => {
  const { nome, descricao } = req.body;
  if (!nome) {
    return res.status(400).json("Informe o nome da catégoria");
  }
  try {
    // verifica se a categoria ja existe
    const categoriaExiste = await Categoria.findOne({
      where: { nome: nome },
    });
    if (categoriaExiste) {
      return res.status(409).json("Categoria ja cadastrada");
    }
    const novaCategoria = await Categoria.create({
      nome,
      descricao,
    });
    return res.status(201).json(novaCategoria);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

// bscar todas as categorias
const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    return res.json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return res.status(501).json({ mensagem: "Erro do servidor" });
  }
};

// atualizar categoria
const atualizarCategoria = async (req, res) => {
  const { nome, descricao } = req.body;
  const { id } = req.params;

  try {
    if (!nome) {
      return res
        .status(400)
        .json({ mensagem: "O nome da categoria é obrigatório" });
    }

    const categoria = await Categoria.findByPk(id); // Busca a categoria pelo ID

    if (!categoria) {
      return res.status(404).json({ mensagem: "Categoria não encontrada" });
    }

    await categoria.update({ nome, descricao });

    return res.status(200).json(categoria);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ mensagem: "Já existe uma categoria com esse nome" });
    }

    console.error("Erro ao atualizar categoria:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

// deletar categoria
const deletarCategoria = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ mensagem: "O id da categoria é obrigatório" });
  }

  try {
    const resultado = await Categoria.destroy({ where: { id } });

    if (resultado === 0) { 
      return res.status(404).json({ mensagem: "Categoria não encontrada" });
    }

    return res.status(204).send(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao deletar categoria" });
  }
};


module.exports = {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
};
