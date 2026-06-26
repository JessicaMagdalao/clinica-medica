import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    sucesso: true,
    mensagem: 'API de Gestão de Clínica Médica funcionando.'
  });
});

app.get('/health', (req, res) => {
  return res.status(200).json({
    sucesso: true,
    mensagem: 'Servidor ativo e conexão com MongoDB inicializada.'
  });
});

export default app;