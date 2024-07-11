import { Hono } from 'hono';
// import { blogRouter } from './routes/blog';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt'; // Replace with your actual JWT verification import
import { createPostInput, updatePostInput } from '@basicdev04/common-app';
export const blogRouter = new Hono();
blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
    if (!jwt) {
        c.status(401);
        return c.json({ error: "jwt not found" });
    }
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
        c.status(401);
        return c.json({ error: "not verified" });
    }
    if (typeof payload.id !== 'string') {
        c.status(400); // Bad request
        return c.json({ error: "Invalid token payload" });
    }
    c.set('userId', payload.id);
    await next();
});
blogRouter.post('/create', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        return c.json({
            msg: "wrong inputs"
        }, 400);
    }
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            author: body.author,
            authorId: userId,
        }
    });
    return c.json({
        msg: 'blog created successfully',
        id: post.id
    });
});
blogRouter.get('/post/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const post = await prisma.post.findUnique({
        where: {
            id
        }
    });
    return c.json(post);
});
blogRouter.put('/update', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        return c.json({
            msg: "wrong inputs"
        }, 400);
    }
    await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    });
    return c.text('updated post');
});
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany({});
    return c.json(posts);
});
