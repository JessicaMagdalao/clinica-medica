import * as pacienteService from '../services/pacienteService.js';

export async function criar(req, res) {
  try {
    if (!req.body.nome || !req.body.cpf || !req.body.telefone) {
      return res.status(400).json({ mensagem: 'Nome, CPF e telefone são obrigatórios.' });
    }

    const resultado = await pacienteService.criarPaciente(req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function criarLote(req, res) {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ mensagem: 'Envie uma lista de pacientes.' });
    }

    const resultado = await pacienteService.criarPacientesEmLote(req.body);
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
    if (req.query.cpf) filtro.cpf = req.query.cpf;

    if (req.query.campos) {
      req.query.campos.split(',').forEach((campo) => {
        projecao[campo] = 1;
      });
    }

    const pacientes = await pacienteService.listarPacientes(filtro, projecao);
    return res.status(200).json(pacientes);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const paciente = await pacienteService.buscarPacientePorId(req.params.id);

    if (!paciente) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado.' });
    }

    return res.status(200).json(paciente);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function atualizar(req, res) {
  try {
    const resultado = await pacienteService.atualizarPaciente(req.params.id, req.body);

    if (!resultado || resultado.matchedCount === 0) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Paciente atualizado.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function removerPorId(req, res) {
  try {
    const resultado = await pacienteService.removerPacientePorId(req.params.id);

    if (!resultado || resultado.deletedCount === 0) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Paciente removido.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function removerPorFiltro(req, res) {
  try {
    const filtro = {};

    if (req.query.nome) filtro.nome = req.query.nome;
    if (req.query.cpf) filtro.cpf = req.query.cpf;

    if (Object.keys(filtro).length === 0) {
      return res.status(400).json({ mensagem: 'Informe nome ou CPF para remover.' });
    }

    const resultado = await pacienteService.removerPacientesPorFiltro(filtro);
    return res.status(200).json({ removidos: resultado.deletedCount });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}