import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

const sql: NeonQueryFunction<false, false> = neon(
    process.env.DB_URL ||
        'postgres://username:password@localhost:5432/database_name',
);

export default sql;
