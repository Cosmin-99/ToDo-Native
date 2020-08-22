import {Request, Response} from 'express';
import {pool} from '../database';
import {QueryResult} from 'pg';


export const getTodos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM todo');
        console.log(response);

        return res.status(200).json(response.rows);

    } catch (err){
        console.log(err);

        return res.status(500).json("Server error , can't sent your data !!!")
    }
}

export const getTodosByStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
        const status: string = req.params.status;
        const response: QueryResult = await pool.query('SELECT * FROM todo WHERE status LIKE $1', [status]);

        return res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);

        return res.status(500).json("Server error, failed to get data !!!");
    }
}

export const addTodos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {titlu, responsabil, status, dataFinalizare, termenFinalizare} = req.body;
        const response: QueryResult = await pool.query('INSERT INTO todo ("titlu", "responsabil", "status", "dataFinalizare", "termenFinalizare") VALUES ($1, $2, $3, $4, $5) ', [titlu, responsabil, status, dataFinalizare, termenFinalizare]);

        console.log(response);
        return res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);

        return res.status(500).json("Server error, can't add data !");
    }
}

export const updateTodos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: number = parseInt(req.params.id);
        const {titlu, responsabil, status, dataFinalizare, termenFinalizare} = req.body;

        const response: QueryResult = await pool.query('UPDATE todo SET "titlu" = $1, "status" = $2, "responsabil" = $3, "dataFinalizare" = $4, "termenFinalizare" = $5 WHERE id = $6',[titlu,status,responsabil,dataFinalizare,termenFinalizare,id]);

        return res.status(200).json("Todo updated successfully !");
    } catch (err) {
        console.log(err);

        return res.status(500).json("Error update Todo !!!");
    }
}

export const deleteTodos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: number = parseInt(req.params.id);

        const response: QueryResult = await pool.query('DELETE FROM todo WHERE id = $1',[id]);

        return res.status(200).json("Todo deleted successfully !");
    } catch (err) {
        console.log(err);

        return res.status(500).json("Error , todo deleted failed !!!");
    }
}