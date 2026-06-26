import { getDatabase } from '../config/database.js';

const COLLECTION = 'especialidades';

export function getEspecialidadesCollection() {
  return getDatabase().collection(COLLECTION);
}