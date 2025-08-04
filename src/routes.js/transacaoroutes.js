const express = require('express');
const router = express.Router();
const transacoesController = require('../controllers/transacoesController');

router.post('/', transacoesController.criarTransacao);
router.get('/', transacoesController.listarTransacoes);
router.get('/resumo/geral', transacoesController.resumoFinanceiro);
router.get('/:id', transacoesController.obterTransacaoPorId);
router.put('/:id', transacoesController.atualizarTransacao);
router.delete('/:id', transacoesController.deletarTransacao);

module.exports = router;
