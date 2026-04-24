import sql from '../db';

export async function getAllUsers() {
    return await sql`SELECT * FROM users`;
}
