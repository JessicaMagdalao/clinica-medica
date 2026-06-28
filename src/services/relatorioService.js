import { getConsultasCollection } from '../models/consultaModel.js';

export async function consultasPorEspecialidade() {
  return getConsultasCollection().aggregate([
    { $match: { status: 'realizada' } },
    { $group: { _id: '$especialidade', total: { $sum: 1 } } },
    { $project: { _id: 0, especialidade: '$_id', total: 1 } },
    { $sort: { total: -1 } }
  ]).toArray();
}

export async function consultasPorMedico() {
  return getConsultasCollection().aggregate([
    { $match: { status: 'realizada' } },
    {
      $lookup: {
        from: 'medicos',
        localField: 'medicoId',
        foreignField: '_id',
        as: 'medico'
      }
    },
    { $unwind: '$medico' },
    { $group: { _id: '$medico.nome', total: { $sum: 1 } } },
    { $project: { _id: 0, medico: '$_id', total: 1 } },
    { $sort: { total: -1 } }
  ]).toArray();
}

export async function consultasPorPaciente() {
  return getConsultasCollection().aggregate([
    { $match: { status: 'realizada' } },
    {
      $lookup: {
        from: 'pacientes',
        localField: 'pacienteId',
        foreignField: '_id',
        as: 'paciente'
      }
    },
    { $unwind: '$paciente' },
    { $group: { _id: '$paciente.nome', total: { $sum: 1 } } },
    { $project: { _id: 0, paciente: '$_id', total: 1 } },
    { $limit: 10 }
  ]).toArray();
}

export async function faturamentoPorStatus() {
  return getConsultasCollection().aggregate([
    { $match: { valor: { $gt: 0 } } },
    { $group: { _id: '$status', total: { $sum: '$valor' } } },
    { $project: { _id: 0, status: '$_id', total: 1 } },
    { $sort: { total: -1 } }
  ]).toArray();
}