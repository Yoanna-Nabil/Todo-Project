import express from 'express';
import { createUser, deletedUser, getUser, login, updatedUer, viewUsers } from './user.controller.js';

export const userRoutes= express.Router();

userRoutes.post('/users', createUser);
userRoutes.get('/users', getUser);
userRoutes.patch('/users/:id', updatedUer);
userRoutes.delete('/users/:id', deletedUser);
userRoutes.post('/users/login', login);

userRoutes.get('/viewUsers', viewUsers);