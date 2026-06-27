import express from 'express';
import * as controller from '../controllers/medicoController.js';

const router = express.Router();

router.post('/', controller.criar);
router.post('/lote', controller.criarLote);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.patch('/:id', controller.atualizar);
router.patch('/:id/horarios', controller.adicionarHorario);
router.delete('/filtro', controller.removerPorFiltro);
router.delete('/:id', controller.removerPorId);

export default router;