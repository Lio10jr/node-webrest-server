import { Request, Response } from "express";
import { CreateTodoDtos, UpdateTodoDtos } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await this.todoRepository.getAll();
            res.status(200).json(todos);
        } catch (e) {
            res.status(400).json({e});
        }
    };

    public getTodosById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
        
            res.status(200).json(todo);
        } catch (e) {
            res.status(400).json({e});
        }

    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDtos] = CreateTodoDtos.create(req.body);

        if (error) return res.status(400).json({ message: `${error}` });

        try {

            const todo = await this.todoRepository.create(createTodoDtos!);

            res.status(200).json({ todo, message: `TODO created succesfully!` })
        } catch (e) {
            res.status(400).json({e})
        }
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDtos] = UpdateTodoDtos.update({ ...req.body, id });

        if (error) return res.status(400).json({ message: `${error}` });

        try {
            const todo = await this.todoRepository.update(updateTodoDtos!);
        
            return res.status(200).json({ todo, message: `TODO with id ${id} updated succefully` });
        } catch (e) {
            return res.status(400).json({e})
        }

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.delete(id);
        
            return res.status(200).json({ todo, message: `TODO with id ${id} deleted` })
        } catch (e) {
            return res.status(400).json({e})
        }

    }

}