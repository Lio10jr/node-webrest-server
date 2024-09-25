import { DeleteTodo, DeleteTodoUseCase } from './../../domain/use-cases/delete-todo';
import { Request, Response } from "express";
import { CreateTodoDtos, UpdateTodoDtos } from "../../domain/dtos";
import { CreateTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todo => res.json(todo))
            .catch(e => res.status(400).json({ e }))
    };

    public getTodosById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(e => res.status(400).json({ e }))

    };

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDtos] = CreateTodoDtos.create(req.body);

        if (error) return res.status(400).json({ message: `${error}` });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDtos!)
            .then(todo => res.json(todo))
            .catch(e => res.status(400).json({ e }))
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDtos] = UpdateTodoDtos.update({ ...req.body, id });

        if (error) return res.status(400).json({ message: `${error}` });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDtos!)
            .then(todo => res.json(todo))
            .catch(e => res.status(400).json({ e }))

    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(e => res.status(400).json({ e }))

    }

}