import express from 'express';
import * as controller from '../controllers/relatorioController.js';

const router = express.Router();

router.get('/especialidades', controller.consultasPorEspecialidade);
router.get('/medicos', controller.consultasPorMedico);
router.get('/pacientes', controller.consultasPorPaciente);
router.get('/faturamento', controller.faturamentoPorStatus);

export default router;