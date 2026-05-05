import sql from '../db';

export async function getAllUsers() {
    return await sql`SELECT * FROM users`;
}

export async function getUserById(id: number) {
    const users = await sql`SELECT * FROM users WHERE id = ${id}`;
    return users;
}

export async function updateUser(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
) {
    if (!!firstname) {
        await sql`UPDATE users SET firstname = ${firstname} WHERE id = ${id}`;
    }
    if (!!lastname) {
        await sql`UPDATE users SET lastname = ${lastname} WHERE id = ${id}`;
    }
    if (!!email) {
        await sql`UPDATE users SET email = ${email} WHERE id = ${id}`;
    }
    if (!!password) {
        await sql`UPDATE users SET password = ${password} WHERE id = ${id}`;
    }

    if (!!firstname || !!lastname || !!email || !!password) {
        await sql`UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
    }

    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    return result;
}

export async function deleteUser(id: number) {
    await sql`DELETE FROM users WHERE id = ${id}`;
}
