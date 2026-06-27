import { ObjectId } from 'mongodb';
import { getConsultasCollection } from '../models/consultaModel.js';

function prepararDados(dados) {
  const dadosPreparados = { ...dados };

  if (dadosPreparados.pacienteId) {
    dadosPreparados.pacienteId = new ObjectId(dadosPreparados.pacienteId);
  }

  if (dadosPreparados.medicoId) {
    dadosPreparados.medicoId = new ObjectId(dadosPreparados.medicoId);
  }

  if (dadosPreparados.dataHora) {
    dadosPreparados.dataHora = new Date(dadosPreparados.dataHora);
  }

  return dadosPreparados;
}

export async function criarConsulta(dados) {
  return getConsultasCollection().insertOne(prepararDados(dados));
}

export async function criarConsultasEmLote(lista) {
  return getConsultasCollection().insertMany(lista.map(prepararDados));
}

export async function listarConsultas(filtro = {}, projecao = {}) {
  return getConsultasCollection()
    .find(prepararDados(filtro))
    .project(projecao)
    .toArray();
}

export async function buscarConsultaPorId(id) {
  if (!ObjectId.isValid(id)) return null;

  return getConsultasCollection().findOne({ _id: new ObjectId(id) });
}

export async function atualizarConsulta(id, dados) {
  if (!ObjectId.isValid(id)) return null;

  return getConsultasCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: prepararDados(dados) }
  );
}

export async function removerConsultaPorId(id) {
  if (!ObjectId.isValid(id)) return null;

  return getConsultasCollection().deleteOne({ _id: new ObjectId(id) });
}

export async function removerConsultasPorFiltro(filtro) {
  return getConsultasCollection().deleteMany(prepararDados(filtro));
}