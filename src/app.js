import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    sucesso: true,
    mensagem: 'API de Gestão de Clínica Médica funcionando.'
  });
});

export default app;