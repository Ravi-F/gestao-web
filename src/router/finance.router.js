import express from "express";
import { body } from "express-validator";
import FinanceController from "../controller/finance.controller.js";
import { isAuthenticated } from "../middleware/authMiddleware.js"; // Importar o middleware

const router = new express.Router();
const financeController = new FinanceController();

// Proteger as rotas com o middleware de autenticação
router.get("/perfil", isAuthenticated, financeController.renderPerfil);
router.get("/receitas", isAuthenticated, financeController.renderReceitas);
router.get("/despesas", isAuthenticated, financeController.renderDespesas);

// Rota para cadastrar receitas
router.post(
  "/receitas",
  isAuthenticated,
  body("descricao").notEmpty().trim(),
  body("valor").isNumeric(),
  body("data").isDate(),
  financeController.cadastrarReceita
);

// Rota para exibir o formulário de edição de receitas
router.get("/receitas/edit/:id", isAuthenticated, financeController.renderEditReceita);

// Rota para atualizar receitas
router.post("/receitas/update/:id", isAuthenticated, financeController.atualizarReceita);

// Rota para excluir receitas
router.post("/receitas/delete/:id", isAuthenticated, financeController.excluirReceita);

// Rota para cadastrar despesas
router.post(
  "/despesas",
  isAuthenticated,
  body("descricao").notEmpty().trim(),
  body("valor").isNumeric(),
  body("data").isDate(),
  financeController.cadastrarDespesa
);

// Rota para filtrar receitas por mês
router.get("/receitas/mes", isAuthenticated, financeController.renderReceitasPorMes);

// Rota para filtrar despesas por mês
router.get("/despesas/mes", isAuthenticated, financeController.renderDespesasPorMes);

// Rota para exibir o formulário de edição de despesas
router.get("/despesas/edit/:id", isAuthenticated, financeController.renderEditDespesa);

// Rota para atualizar despesas
router.post("/despesas/update/:id", isAuthenticated, financeController.atualizarDespesa);

// Rota para excluir despesas
router.post("/despesas/delete/:id", isAuthenticated, financeController.excluirDespesa);

export default router;