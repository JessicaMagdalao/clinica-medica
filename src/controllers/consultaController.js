import * as consultaService from '../services/consultaService.js';

export async function criar(req, res) {
  try {
    if (
      !req.body.pacienteId ||
      !req.body.paciente ||
      !req.body.medicoId ||
      !req.body.medico ||
      !req.body.especialidade ||
      !req.body.dataHora ||
      !req.body.status
    ) {
      return res.status(400).json({
        mensagem: 'pacienteId, paciente, medicoId, medico, especialidade, dataHora e status são obrigatórios.'
      });
    }

    const resultado = await consultaService.criarConsulta(req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function criarLote(req, res) {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ mensagem: 'Envie uma lista de consultas.' });
    }

    const resultado = await consultaService.criarConsultasEmLote(req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function listar(req, res) {
  try {
    const filtro = {};
    const projecao = {};

    if (req.query.pacienteId) filtro.pacienteId = req.query.pacienteId;
    if (req.query.paciente) filtro.paciente = req.query.paciente;
    if (req.query.medicoId) filtro.medicoId = req.query.medicoId;
    if (req.query.medico) filtro.medico = req.query.medico;
    if (req.query.status) filtro.status = req.query.status;
    if (req.query.especialidade) filtro.especialidade = req.query.especialidade;

    if (req.query.campos) {
      req.query.campos.split(',').forEach((campo) => {
        projecao[campo] = 1;
      });
    }

    const consultas = await consultaService.listarConsultas(filtro, projecao);
    return res.status(200).json(consultas);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const consulta = await consultaService.buscarConsultaPorId(req.params.id);

    if (!consulta) {
      return res.status(404).json({ mensagem: 'Consulta não encontrada.' });
    }

    return res.status(200).json(consulta);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function atualizar(req, res) {
  try {
    const resultado = await consultaService.atualizarConsulta(req.params.id, req.body);

    if (!resultado || resultado.matchedCount === 0) {
      return res.status(404).json({ mensagem: 'Consulta não encontrada.' });
    }

    return res.status(200).json({ mensagem: 'Consulta atualizada.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function removerPorId(req, res) {
  try {
    const resultado = await consultaService.removerConsultaPorId(req.params.id);

    if (!resultado || resultado.deletedCount === 0) {
      return res.status(404).json({ mensagem: 'Consulta não encontrada.' });
    }

    return res.status(200).json({ mensagem: 'Consulta removida.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function removerPorFiltro(req, res) {
  try {
    const filtro = {};

    if (req.query.status) filtro.status = req.query.status;
    if (req.query.especialidade) filtro.especialidade = req.query.especialidade;
    if (req.query.medico) filtro.medico = req.query.medico;
    if (req.query.paciente) filtro.paciente = req.query.paciente;

    if (Object.keys(filtro).length === 0) {
      return res.status(400).json({
        mensagem: 'Informe status, especialidade, médico ou paciente para remover.'
      });
    }

    const resultado = await consultaService.removerConsultasPorFiltro(filtro);
    return res.status(200).json({ removidos: resultado.deletedCount });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}