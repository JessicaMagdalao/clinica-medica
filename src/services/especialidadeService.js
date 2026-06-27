import { ObjectId } from 'mongodb';
import { getEspecialidadesCollection } from '../models/especialidadeModel.js';

export async function criarEspecialidade(dados) {
  return getEspecialidadesCollection().insertOne(dados);
}

export async function criarEspecialidadesEmLote(lista) {
  return getEspecialidadesCollection().insertMany(lista);
}

export async function listarEspecialidades(filtro = {}, projecao = {}) {
  return getEspecialidadesCollection()
    .find(filtro)
    .project(projecao)
    .toArray();
}

export async function buscarEspecialidadePorId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return getEspecialidadesCollection().findOne({
    _id: new ObjectId(id)
  });
}

export async function atualizarEspecialidade(id, dados) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return getEspecialidadesCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: dados }
  );
}

export async function removerEspecialidadePorId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return getEspecialidadesCollection().deleteOne({
    _id: new ObjectId(id)
  });
}

export async function removerEspecialidadesPorFiltro(filtro) {
  return getEspecialidadesCollection().deleteMany(filtro);
}