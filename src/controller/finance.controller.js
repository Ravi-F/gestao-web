import { Op, Sequelize } from "sequelize";
import { validationResult } from "express-validator";
import Receita from "../database/model/receita.model.js";
import Despesa from "../database/model/despesa.model.js";

class FinanceController {
  async renderReceitas(req, res) {
    const receitas = await Receita.findAll({
      where: { usuarioId: req.user.id },
    });

    // Converter o valor para número
    const receitasComValorNumerico = receitas.map((receita) => {
      return {
        ...receita.dataValues,
        valor: parseFloat(receita.valor), // Converte o valor para número
      };
    });

    res.render("receitas", { receitas: receitasComValorNumerico });
  }

  async renderDespesas(req, res) {
    const despesas = await Despesa.findAll({
      where: { usuarioId: req.user.id },
    });

    // Converter o valor para número
    const despesasComValorNumerico = despesas.map((despesa) => {
      return {
        ...despesa.dataValues,
        valor: parseFloat(despesa.valor), // Converte o valor para número
      };
    });

    res.render("despesas", { despesas: despesasComValorNumerico });
  }

  async cadastrarReceita(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render("receitas", { errors: result.array() });
    }

    const { descricao, valor, data } = req.body;
    await Receita.create({
      descricao,
      valor: parseFloat(valor),
      data,
      usuarioId: req.user.id,
    });
    res.redirect("/receitas");
  }

  async cadastrarDespesa(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render("despesas", { errors: result.array() });
    }

    const { descricao, valor, data } = req.body;
    await Despesa.create({ descricao, valor, data, usuarioId: req.user.id });
    res.redirect("/despesas");
  }

  // Adicione isso ao seu FinanceController
  async renderPerfil(req, res) {
    const receitas = await Receita.findAll({
      where: { usuarioId: req.user.id },
    });

    // Converter o valor das receitas para número
    const receitasComValorNumerico = receitas.map((receita) => {
      return {
        ...receita.dataValues,
        valor: parseFloat(receita.valor), // Converte o valor para número
      };
    });

    const despesas = await Despesa.findAll({
      where: { usuarioId: req.user.id },
    });

    // Converter o valor das despesas para número
    const despesasComValorNumerico = despesas.map((despesa) => {
      return {
        ...despesa.dataValues,
        valor: parseFloat(despesa.valor), // Converte o valor para número
      };
    });

    res.render("perfil", {
      receitas: receitasComValorNumerico,
      despesas: despesasComValorNumerico,
    });
  }
  // Métodos para editar e excluir receitas e despesas 

  async renderEditReceita(req, res) {
    const { id } = req.params;
    const receita = await Receita.findOne({
      where: { id, usuarioId: req.user.id },
    });
    if (!receita) {
      return res.status(404).send("Receita não encontrada");
    }
    res.render("editReceita", { receita });
  }

  async renderEditDespesa(req, res) {
    const { id } = req.params;
    const despesa = await Despesa.findOne({
      where: { id, usuarioId: req.user.id },
    });
    if (!despesa) {
      return res.status(404).send("Despesa não encontrada");
    }
    res.render("editDespesa", { despesa });
  }

  async excluirReceita(req, res) {
    const { id } = req.params;
    await Receita.destroy({ where: { id, usuarioId: req.user.id } });
    res.redirect("/receitas");
  }

  async excluirDespesa(req, res) {
    const { id } = req.params;
    await Despesa.destroy({ where: { id, usuarioId: req.user.id } });
    res.redirect("/despesas");
  }

  async atualizarReceita(req, res) {
    const { id } = req.params;
    const { descricao, valor, data } = req.body;

    // Atualiza a receita no banco de dados
    await Receita.update(
      { descricao, valor: parseFloat(valor), data },
      { where: { id, usuarioId: req.user.id } }
    );

    // Redireciona para a lista de receitas
    res.redirect("/receitas");
  }

  async atualizarDespesa(req, res) {
    const { id } = req.params;
    const { descricao, valor, data } = req.body;

    // Atualiza a despesa no banco de dados
    await Despesa.update(
      { descricao, valor: parseFloat(valor), data },
      { where: { id, usuarioId: req.user.id } }
    );

    // Redireciona para a lista de despesas
    res.redirect("/despesas");
  }

  async renderReceitasPorMes(req, res) {
    const { mes, ano } = req.query; // Obtém o mês e o ano da query string
    const receitas = await Receita.findAll({
      where: {
        usuarioId: req.user.id,
        data: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("EXTRACT", Sequelize.literal("MONTH FROM data")),
              mes
            ),
            Sequelize.where(
              Sequelize.fn("EXTRACT", Sequelize.literal("YEAR FROM data")),
              ano
            ),
          ],
        },
      },
    });

    const receitasComValorNumerico = receitas.map((receita) => {
      return {
        ...receita.dataValues,
        valor: parseFloat(receita.valor),
      };
    });

    res.render("receitas", { receitas: receitasComValorNumerico });
}

  async renderDespesasPorMes(req, res) {
    const { mes, ano } = req.query;
    const despesas = await Despesa.findAll({
      where: {
        usuarioId: req.user.id,
        data: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("EXTRACT", Sequelize.literal("MONTH FROM data")),
              mes
            ),
            Sequelize.where(
              Sequelize.fn("EXTRACT", Sequelize.literal("YEAR FROM data")),
              ano
            ),
          ],
        },
      },
    });

    const despesasComValorNumerico = despesas.map((despesa) => {
      return {
        ...despesa.dataValues,
        valor: parseFloat(despesa.valor),
      };
    });

    res.render("despesas", { despesas: despesasComValorNumerico });
  }
}

export default FinanceController;
