import patata from 'pg'

const { Pool } = patata;

export const pool = new Pool()