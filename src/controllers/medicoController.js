import * as medicoService from '../services/medicoService.js';

export async function criar(req, res) {
  try {
    if (!req.body.nome || !req.body.crm || !req.body.especialidadeId) {
      return res.status(400).json({ mensagem: 'Nome, CRM e especialidadeId são obrigatórios.' });
    }

    const resultado = await medicoService.criarMedico(req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function criarLote(req, res) {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ mensagem: 'Envie uma lista de médicos.' });
    }

    const resultado = await medicoService.criarMedicosEmLote(req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function listar(req, res) {
  try {
    const filtro = {};
    const projecao = {};

    if (req.query.nome) filtro.nome = req.query.nome;
    if (req.query.crm) filtro.crm = req.query.crm;
    if (req.query.especialidadeId) filtro.especialidadeId = req.query.especialidadeId;
    if (req.query.especialidade) filtro.especialidade = req.query.especialidade;

    if (req.query.campos) {
      req.query.campos.split(',').forEach((campo) => {
        projecao[campo] = 1;
      });
    }

    const medicos = await medicoService.listarMedicos(filtro, projecao);
    return res.status(200).json(medicos);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const medico = await medicoService.buscarMedicoPorId(req.params.id);

    if (!medico) {
      return res.status(404).json({ mensagem: 'Médico não encontrado.' });
    }

    return res.status(200).json(medico);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function atualizar(req, res) {
  try {
    const resultado = await medicoService.atualizarMedico(req.params.id, req.body);

    if (!resultado || resultado.matchedCount === 0) {
      return res.status(404).json({ mensagem: 'Médico não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Médico atualizado.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function adicionarHorario(req, res) {
  try {
    if (!req.body.diaSemana || !req.body.inicio || !req.body.fim) {
      return res.status(400).json({ mensagem: 'diaSemana, inicio e fim são obrigatórios.' });
    }

    const resultado = await medicoService.adicionarHorario(req.params.id, req.body);

    if (!resultado || resultado.matchedCount === 0) {
      return res.status(404).json({ mensagem: 'Médico não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Horário adicionado.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function removerPorId(req, res) {
  try {
    const resultado = await medicoService.removerMedicoPorId(req.params.id);

    if (!resultado || resultado.deletedCount === 0) {
      return res.status(404).json({ mensagem: 'Médico não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Médico removido.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function removerPorFiltro(req, res) {
  try {
    const filtro = {};

    if (req.query.nome) filtro.nome = req.query.nome;
    if (req.query.crm) filtro.crm = req.query.crm;
    if (req.query.especialidadeId) filtro.especialidadeId = req.query.especialidadeId;
    if (req.query.especialidade) filtro.especialidade = req.query.especialidade;

    if (Object.keys(filtro).length === 0) {
      return res.status(400).json({ mensagem: 'Informe um filtro para remover.' });
    }

    const resultado = await medicoService.removerMedicosPorFiltro(filtro);
    return res.status(200).json({ removidos: resultado.deletedCount });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}