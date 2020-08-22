"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
exports.router = express_1.Router();
exports.router.get('/todo', todoController_1.getTodos);
exports.router.get('/todo/:status', todoController_1.getTodosByStatus);
exports.router.post('/todo', todoController_1.addTodos);
exports.router.put('/todo/:id', todoController_1.updateTodos);
exports.router.delete('/todo/:id', todoController_1.deleteTodos);
