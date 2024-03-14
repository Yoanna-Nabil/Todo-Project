import express from 'express';
import { initConnection } from './db/connect.js';
import { userRoutes } from './modules/user/user.routes.js';
import { todoRoutes } from './modules/todo/todo.routes.js';
import dotenv  from 'dotenv';
import cors from 'cors';
import pug from 'pug';

let server= express();
server.use(express.json());
server.use(userRoutes);
server.use(todoRoutes);

dotenv.config();

server.use(cors({
    origin: "*",
    methods: "*"
}));

server.use((err, req, res, next) => {
    res.json({message: err.message});
});

server.set("viewengine", 'pug');
server.set("view", './view')

server.use(express.static('./static'));

server.use("*", (req, res, next) => {
    res.json({message: `you can't access ${req.originalUrl}`})
})

initConnection();

server.listen(3000);