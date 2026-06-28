import * as relatorioService from '../services/relatorioService.js';

async function responder(res, funcao) {
  try {
    const resultado = await funcao();
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export function consultasPorEspecialidade(req, res) {
  return responder(res, relatorioService.consultasPorEspecialidade);
}

export function consultasPorMedico(req, res) {
  return responder(res, relatorioService.consultasPorMedico);
}

export function consultasPorPaciente(req, res) {
  return responder(res, relatorioService.consultasPorPaciente);
}

export function faturamentoPorStatus(req, res) {
  return responder(res, relatorioService.faturamentoPorStatus);
}