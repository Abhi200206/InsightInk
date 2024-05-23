import { Hono } from 'hono';
import { userrouter} from './routes/user';
import { blogrouter } from './routes/blogs';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, jwt, sign, verify } from 'hono/jwt';
import { signupobj, signinobj,payload } from '@vikky77703/common-app';
import { cors } from 'hono/cors';
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    jwt_sec: string
  },
  Variables : {
		userId: string
	}

}>(); 
app.use(cors());
app.route('/api/v1/user', userrouter);
app.route('/api/v1/blog', blogrouter);

export default app

