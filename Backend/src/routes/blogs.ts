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
		userId: string,
		useremail:string
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
	c.set('useremail',payload.email);
	await next()
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
				id
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
		let email=c.get('useremail');
		let {title,post}:Posttype=await c.req.json();
		let result=await prisma.posts.create({
			data:{
				userid,
				title,
				post,
				author:email
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
blogrouter.delete('/delete/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
		let userid=c.get('userId');
		let id=c.req.param("id");
        let result=await prisma.posts.delete({
            where:{
                id,
                userid
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
				id:id,
				userid
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