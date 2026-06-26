import { getDatabase } from '../config/database.js';

const COLLECTION = 'pacientes';

export function getPacientesCollection() {
  return getDatabase().collection(COLLECTION);
}