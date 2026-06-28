import express from 'express';

import especialidadeRoutes from './routes/especialidadeRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import medicoRoutes from './routes/medicoRoutes.js';
import consultaRoutes from './routes/consultaRoutes.js';
import relatorioRoutes from './routes/relatorioRoutes.js';

const app = express();

app.use(express.json());
app.use('/especialidades', especialidadeRoutes);
app.use('/medicos', medicoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/consultas', consultaRoutes);
app.use('/relatorios', relatorioRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({
    sucesso: true,
    mensagem: 'API de Gestão de Clínica Médica funcionando.'
  });
});

export default app;