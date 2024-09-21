import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateTodoDtos, UpdateTodoDtos, DeleteTodoDtos, FindByIdTodosDtos } from "../../domain/dtos";

export class TodosController {

    private readonly prisma;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
    }

    public getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await this.prisma.todo.findMany();
            res.status(200).json(todos);
        } catch (e) {
            throw e
        }
    };

    public getTodosById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, findByIdTodosDtos] = FindByIdTodosDtos.find({id});

        if (error) res.status(400).json({ message: error });

        const todo = await this.prisma.todo.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        res.status(200).json(todo);

    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDtos] = CreateTodoDtos.create(req.body);

        if (error) return res.status(400).json({ message: `${error}` });

        try {

            const todo = await this.prisma.todo.create({
                data: createTodoDtos!
            });

            res.status(200).json({ todo, message: `TODO created succesfully!` })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({ message: `TODO with id  not found` })
                }
            }
            throw e
        }
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDtos] = UpdateTodoDtos.update({ ...req.body, id });

        if (error) return res.status(400).json({ message: `${error}` });


        const todoExits = await this.prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todoExits) return res.status(404).json({ message: `Todo not found` });

        const todo = await this.prisma.todo.update({
            where: {
                id: id
            },
            data: updateTodoDtos!.values
        });
        return res.status(200).json({ todo, message: `TODO with id ${id} updated succefully` });

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, deleteTodosDtos] = DeleteTodoDtos.delete({ id });

        if (error) return res.status(400).json({ message: `${error}` });

        const todoExits = await this.prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todoExits) return res.status(404).json({ message: `Todo not found` });

        const todo = await this.prisma.todo.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({ todo, message: `TODO with id ${id} deleted` })

    }

}