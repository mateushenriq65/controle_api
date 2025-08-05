const express = require ('express')
const app = express()
app.use(express.json())


const transacoesRoutes = require ('./routes/transacaoroutes')

app.get('/',(req, res) =>{
  res.send('bem vindo!')

} )

app.use('/transacao',transacoesRoutes)

app.get('/resumo',transacoesRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

