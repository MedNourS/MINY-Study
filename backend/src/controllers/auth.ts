import sql from '../db';
import bcrypt from 'bcrypt';

export async function registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
        INSERT INTO users (firstname, lastname, email, password)
        VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})
        RETURNING *
    `;
    return result;
}

export async function loginUser(email: string, password: string) {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;

    const user = users[0];
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    return user;
}
