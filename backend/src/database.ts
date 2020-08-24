import {Pool} from 'pg';

export const pool: Pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    password: 'postgresadmin',
    database: 'todomobile',
    port: 5432
});