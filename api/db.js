import pkg from 'pg';

const { Pool } = pkg;

export const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog',
    password: '123456',
    port: 5432
})

export default db;