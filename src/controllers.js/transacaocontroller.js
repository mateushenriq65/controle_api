const pool = require('../db');

exports.criarTransacao = async (req, res) => {
  const { descricao, valor, tipo } = req.body;

  try {
    const resultado = await pool.query(
      'INSERT INTO transacoes (descricao, valor, tipo) VALUES ($1, $2, $3) RETURNING *',
      [descricao, valor, tipo]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar transação', detalhes: err.message });
  }
};

exports.listarTransacoes = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM transacoes ORDER BY data_transacao DESC');
    res.json(resultado.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar transações' });
  }
};

exports.obterTransacaoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query('SELECT * FROM transacoes WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Transação não encontrada' });
    }
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar transação' });
  }
};

exports.atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, tipo } = req.body;

  try {
    const resultado = await pool.query(
      'UPDATE transacoes SET descricao = $1, valor = $2, tipo = $3 WHERE id = $4 RETURNING *',
      [descricao, valor, tipo, id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Transação não foi encontrada' });
    }
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar transação' });
  }
};

exports.deletarTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query('DELETE FROM transacoes WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Transação não encontrada' });
    }
    res.json({ mensagem: 'Transação deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar transação' });
  }
};

exports.resumoFinanceiro = async (req, res) => {
  try {
    const entradas = await pool.query("SELECT SUM(valor) AS total FROM transacoes WHERE tipo = 'entrada'");
    const saidas = await pool.query("SELECT SUM(valor) AS total FROM transacoes WHERE tipo = 'saida'");

    const totalEntradas = parseFloat(entradas.rows[0].total) || 0;
    const totalSaidas = parseFloat(saidas.rows[0].total) || 0;

    res.json({
      total_entradas: totalEntradas,
      total_saidas: totalSaidas,
      saldo: totalEntradas - totalSaidas,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao calcular resumo financeiro' });
  }
};

