import * as especialidadeService from '../services/especialidadeService.js';

export async function criar(req, res) {
  try {
    if (!req.body.nome || !req.body.descricao) {
      return res.status(400).json({ mensagem: 'Nome e descrição são obrigatórios.' });
    }

    const resultado = await especialidadeService.criarEspecialidade(req.body);

    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function criarEmLote(req, res) {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ mensagem: 'Envie uma lista de especialidades.' });
    }

    const resultado = await especialidadeService.criarEspecialidadesEmLote(req.body);

    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function listar(req, res) {
  try {
    const filtro = {};
    const projecao = {};

    if (req.query.nome) {
      filtro.nome = req.query.nome;
    }

    if (req.query.campos) {
      req.query.campos.split(',').forEach((campo) => {
        projecao[campo] = 1;
      });
    }

    const especialidades = await especialidadeService.listarEspecialidades(filtro, projecao);

    return res.status(200).json(especialidades);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const especialidade = await especialidadeService.buscarEspecialidadePorId(req.params.id);

    if (!especialidade) {
      return res.status(404).json({ mensagem: 'Especialidade não encontrada.' });
    }

    return res.status(200).json(especialidade);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function atualizar(req, res) {
  try {
    const resultado = await especialidadeService.atualizarEspecialidade(req.params.id, req.body);

    if (!resultado || resultado.matchedCount === 0) {
      return res.status(404).json({ mensagem: 'Especialidade não encontrada.' });
    }

    return res.status(200).json({ mensagem: 'Especialidade atualizada.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function removerPorId(req, res) {
  try {
    const resultado = await especialidadeService.removerEspecialidadePorId(req.params.id);

    if (!resultado || resultado.deletedCount === 0) {
      return res.status(404).json({ mensagem: 'Especialidade não encontrada.' });
    }

    return res.status(200).json({ mensagem: 'Especialidade removida.' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

export async function removerPorFiltro(req, res) {
  try {
    if (!req.query.nome) {
      return res.status(400).json({ mensagem: 'Informe o nome da especialidade.' });
    }

    const resultado = await especialidadeService.removerEspecialidadesPorFiltro({
      nome: req.query.nome
    });

    return res.status(200).json({
      removidos: resultado.deletedCount
    });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}