"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodos = exports.updateTodos = exports.addTodos = exports.getTodosByStatus = exports.getTodos = void 0;
const database_1 = require("../database");
exports.getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM todo');
        console.log(response);
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Server error , can't sent your data !!!");
    }
});
exports.getTodosByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        const response = yield database_1.pool.query('SELECT * FROM todo WHERE status LIKE $1', [status]);
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Server error, failed to get data !!!");
    }
});
exports.addTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titlu, responsabil, status, dataFinalizare, termenFinalizare } = req.body;
        const response = yield database_1.pool.query('INSERT INTO todo ("titlu", "responsabil", "status", "dataFinalizare", "termenFinalizare") VALUES ($1, $2, $3, $4, $5) ', [titlu, responsabil, status, dataFinalizare, termenFinalizare]);
        console.log(response);
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Server error, can't add data !");
    }
});
exports.updateTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { titlu, responsabil, status, dataFinalizare, termenFinalizare } = req.body;
        const response = yield database_1.pool.query('UPDATE todo SET "titlu" = $1, "status" = $2, "responsabil" = $3, "dataFinalizare" = $4, "termenFinalizare" = $5 WHERE id = $6', [titlu, status, responsabil, dataFinalizare, termenFinalizare, id]);
        return res.status(200).json("Todo updated successfully !");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Error update Todo !!!");
    }
});
exports.deleteTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query('DELETE FROM todo WHERE id = $1', [id]);
        return res.status(200).json("Todo deleted successfully !");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Error , todo deleted failed !!!");
    }
});
