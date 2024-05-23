import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { signupobj, signinobj } from '@vikky77703/common-app';
export const userrouter = new Hono();
userrouter.get('/me', async (c) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
        return c.json({ bool: false });
    }
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.jwt_sec);
    if (!payload) {
        return c.json({ bool: false });
    }
    return c.json({ bool: true });
});
userrouter.post('/signin', async (c) => {
    let { email, password } = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        let { success } = signinobj.safeParse({ email, password });
        if (!success) {
            return c.json({ result: "invalid input types given" });
        }
        let result = await prisma.user.findFirst({
            where: {
                email,
                password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        console.log(result);
        if (result) {
            const token = await sign({ id: result.id, email: result.email, name: result.name }, c.env?.jwt_sec);
            console.log(token);
            return c.json({ result: result, token, bool: true });
        }
        else {
            return c.json({ result: "no user found " });
        }
    }
    catch (err) {
        return c.json({ result: "error while logging in" });
    }
});
userrouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    let { email, password, name } = await c.req.json();
    try {
        let { success } = signupobj.safeParse({ email, password, name });
        if (!success) {
            return c.json({ result: "invalid input types given" });
        }
        let result = await prisma.user.create({
            data: {
                email,
                password,
                name
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        const token = await sign({ id: result.id, email: result.email, name: result.name }, c.env?.jwt_sec);
        console.log(token);
        return c.json({ result: result, token, bool: true });
    }
    catch (err) {
        console.log("error: ", err);
        return c.json({ result: "error while signup!" });
    }
});
