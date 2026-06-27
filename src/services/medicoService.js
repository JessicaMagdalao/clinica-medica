import { ObjectId } from 'mongodb';
import { getMedicosCollection } from '../models/medicoModel.js';

function converterEspecialidadeId(dados) {
  if (!dados.especialidadeId) return dados;

  return {
    ...dados,
    especialidadeId: new ObjectId(dados.especialidadeId)
  };
}

export async function criarMedico(dados) {
  return getMedicosCollection().insertOne(converterEspecialidadeId(dados));
}

export async function criarMedicosEmLote(lista) {
  return getMedicosCollection().insertMany(lista.map(converterEspecialidadeId));
}

export async function listarMedicos(filtro = {}, projecao = {}) {
  return getMedicosCollection()
    .find(converterEspecialidadeId(filtro))
    .project(projecao)
    .toArray();
}

export async function buscarMedicoPorId(id) {
  if (!ObjectId.isValid(id)) return null;

  return getMedicosCollection().findOne({ _id: new ObjectId(id) });
}

export async function atualizarMedico(id, dados) {
  if (!ObjectId.isValid(id)) return null;

  return getMedicosCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: converterEspecialidadeId(dados) }
  );
}

export async function adicionarHorario(id, horario) {
  if (!ObjectId.isValid(id)) return null;

  return getMedicosCollection().updateOne(
    { _id: new ObjectId(id) },
    { $push: { horariosAtendimento: horario } }
  );
}

export async function removerMedicoPorId(id) {
  if (!ObjectId.isValid(id)) return null;

  return getMedicosCollection().deleteOne({ _id: new ObjectId(id) });
}

export async function removerMedicosPorFiltro(filtro) {
  return getMedicosCollection().deleteMany(converterEspecialidadeId(filtro));
}