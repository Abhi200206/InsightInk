import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { payloadtype,Posttype } from '../Types';
import { signupobj, signinobj,payload,Post } from '@vikky77703/common-app';
export const blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    jwt_sec: string
  },
  Variables : {
		userId: string
	}

}>();
blogrouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload:payloadtype = await verify(token, c.env.jwt_sec);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
});
blogrouter.get('/me',(c)=>{
	return c.json({bool:true});
});
blogrouter.get('/:id',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	  }).$extends(withAccelerate());
	  try{
		let id=c.req.param("id");
		let userid=c.get('userId');
		let result=await prisma.posts.findUnique({
			where:{
				id,
				userid
			},
		});
		return c.json({result});
	  }
	  catch(err)
	  {
		console.log(err);
		return c.json({err});
	  }

});

blogrouter.post('/add',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	  }).$extends(withAccelerate());
	  try{
		let userid=c.get('userId');
		let {title,post}:Posttype=await c.req.json();
		let result=await prisma.posts.create({
			data:{
				userid,
				title,
				post
			},
			select:{
				id:true,
				userid:true
			}
		});
		return c.json({result});
	  }
	  catch(err)
	  {
		console.log(err);
		return c.json({err});
	  }

});
blogrouter.put('/put/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	  }).$extends(withAccelerate());
	  try{
		let userid=c.get('userId');
		let id=c.req.param("id");
		let {title,post}:Posttype=await c.req.json();
		let result=await prisma.posts.update({
			where:{
				id:id
			},
			data:{
				title,
				post
			},
			select:{
				id:true,
				userid:true
			}
		});
		return c.json({result});
	  }
	  catch(err)
	  {
		console.log(err);
		return c.json({err});
	  }
});
blogrouter.get('/all/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	  }).$extends(withAccelerate());
	  try{
		let userid=c.get('userId');
		let result=await prisma.posts.findMany({
			where:{
				userid
			}
		});
		return c.json({result});
	  }
	  catch(err)
	  {
		return c.json({err});
	  }
});