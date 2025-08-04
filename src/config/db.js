const { Pool } = require('pg');

const pool = new Pool({

    user: 'postgres',
    host: 'localhost',
    database: 'controle_caixa',
    passoword: 'wcc@2023',
    port: 5432,
});

pool.conect()

.then(() => console.log('conectado ao postgreSQL!'))
.catch(err => console.error('Erro na conexão ao banco de dados:', err));


module.exports = pool;
                    











