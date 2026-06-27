import express from 'express';
import * as controller from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/', controller.criar);
router.post('/lote', controller.criarLote);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.patch('/:id', controller.atualizar);
router.delete('/filtro', controller.removerPorFiltro);
router.delete('/:id', controller.removerPorId);

export default router;