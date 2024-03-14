import express from 'express';
import { deletedTodo, newTodo, updatedTodo } from './todo.controller.js';
import { auth, restrictTo } from '../../middleware/auth.js';

export const todoRoutes= express.Router();

todoRoutes.post('/todos', auth(), restrictTo("User"), newTodo);
todoRoutes.patch('/todos/:id', updatedTodo);
todoRoutes.delete('/todos/:id', deletedTodo);