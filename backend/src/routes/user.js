import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from '@basicdev04/common-app';
export const userRouter = new Hono();
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        return c.json({
            msg: 'invalid input'
        }, 400);
    }
    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (checkUser) {
            return c.json({
                error: "User already exists"
            }, 401);
        }
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        console.log(jwt);
        return c.json({
            msg: "Logged in successfully",
            jwt: jwt
        });
    }
    catch (e) {
        console.error(e);
        return c.json({ error: "Error creating user" }, 403);
    }
});
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        return c.json({
            msg: "wrong input"
        }, 400);
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (!user) {
            return c.json({
                error: "user not found"
            }, 404);
        }
        if (user.password === body.password) 
        //jwt here
        {
            const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
            return c.json({
                msg: "signed in successfully",
                jwt: jwt
            });
        }
        return c.json({
            error: "Wrong password"
        });
    }
    catch (e) {
        return c.status(403);
    }
});
