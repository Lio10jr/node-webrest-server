import { DeleteTodo, DeleteTodoUseCase } from './../../domain/use-cases/delete-todo';
import { Request, Response } from "express";
import { CreateTodoDtos, UpdateTodoDtos } from "../../domain/dtos";
import { CreateTodo, CustomError, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }


    private handleError = (res: Response, error: unknown) => {
        if ( error instanceof CustomError ) {
            res.status(error.statusCode).json({ e: error.message});
            return;
        }

        res.status(500).json({ messaje: 'Internal server error'});
    }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todo => res.json(todo))
            .catch(e => this.handleError(res, e))
    };

    public getTodosById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(e => this.handleError(res, e))

    };

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDtos] = CreateTodoDtos.create(req.body);

        if (error) return res.status(400).json({ message: `${error}` });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDtos!)
            .then(todo => res.status(201).json(todo))
            .catch(e => this.handleError(res, e))
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDtos] = UpdateTodoDtos.update({ ...req.body, id });

        if (error) return res.status(400).json({ message: `${error}` });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDtos!)
            .then(todo => res.json(todo))
            .catch(e => this.handleError(res, e))

    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(e => this.handleError(res, e))

    }

}