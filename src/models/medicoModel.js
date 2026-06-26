import { getDatabase } from '../config/database.js';

const COLLECTION = 'medicos';

export function getMedicosCollection() {
  return getDatabase().collection(COLLECTION);
}