import {Pool} from 'pg';

export const pool: Pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgresadmin',
    database: 'todo-mobile',
    port: 5432
});