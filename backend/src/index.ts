import { userRouter } from './routes/user';
import { Hono } from 'hono';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

app.use('*',cors({
  origin:'*',
  allowMethods:['GET','POST','PUT','DELETE'],
  allowHeaders:['Content-Type','Authorization']
}));

app.route('/api/v1/user',userRouter);
app.route('api/v1/blog',blogRouter);

export default app;