import express from 'express'
import dotenv from 'dotenv'
import blogRouter from './routes/blog.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
dotenv.config()
const server = express();
server.use(express.json())
server.use('/user', userRouter)
server.use('/auth', authRouter);
server.use('/blog', blogRouter);

server.listen(8080);