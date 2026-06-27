import { ObjectId } from 'mongodb';
import { getPacientesCollection } from '../models/pacienteModel.js';

export async function criarPaciente(dados) {
  return getPacientesCollection().insertOne(dados);
}

export async function criarPacientesEmLote(lista) {
  return getPacientesCollection().insertMany(lista);
}

export async function listarPacientes(filtro = {}, projecao = {}) {
  return getPacientesCollection().find(filtro).project(projecao).toArray();
}

export async function buscarPacientePorId(id) {
  if (!ObjectId.isValid(id)) return null;

  return getPacientesCollection().findOne({ _id: new ObjectId(id) });
}

export async function atualizarPaciente(id, dados) {
  if (!ObjectId.isValid(id)) return null;

  return getPacientesCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: dados }
  );
}

export async function removerPacientePorId(id) {
  if (!ObjectId.isValid(id)) return null;

  return getPacientesCollection().deleteOne({ _id: new ObjectId(id) });
}

export async function removerPacientesPorFiltro(filtro) {
  return getPacientesCollection().deleteMany(filtro);
}