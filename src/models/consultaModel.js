import { getDatabase } from '../config/database.js';

const COLLECTION = 'consultas';

export function getConsultasCollection() {
  return getDatabase().collection(COLLECTION);
}