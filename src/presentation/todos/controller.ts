import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy Milk', createdAt: new Date() },
    { id: 2, text: 'Buy Bread', createdAt: new Date() },
    { id: 3, text: 'Buy coffe', createdAt: new Date() },
    { id: 4, text: 'Buy chiken', createdAt: new Date() },
];

export class TodosController {

    constructor() {}

    public getTodos = (req: Request, res: Response) => {
        res.status(200).json(todos)
    };

    public getTodosById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if ( isNaN(id) ) res.status(400).json({ message: 'ID is not a number'});

        const todo = todos.find(todo => todo.id === id);
        ( todo )
            ? res.status(200).json(todo)
            : res.status(404).json({ messaje: `TODO with id ${ id } not found` });
    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if ( !text ) return res.status(400).json({ message: `text Property is required` });

        const todo = {
            id: todos.length + 1,
            text: text,
            createdAt: new Date(),
        }

        todos.push( todo );
        res.status(200).json({ message: `TODO created succesfully!`})
    }

    public updateTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;
        const { text } = req.body;

        if ( isNaN(id) ) return res.status(400).json({ messaje: `ID property is not a number`});
        
        if ( !text ) return res.status(400).json({ messaje: `text property is required`});

        let todoIndex = todos.findIndex( todo => todo.id === id );

        if ( todoIndex!!= -1 ){
            todos[todoIndex].text = text;
            return res.status(200).json({ message: `TODO with id ${ id } updated succefully`});
        } else {
            res.status(404).json({ message: `TODO with id ${ id } is not found`});
        }

    }

    public deleteTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;

        if ( isNaN(id) ) return res.status(400).json({ message: `ID should be a number`});

        const indexTodo = todos.findIndex( todo => todo.id === id );

        if ( indexTodo != -1 ) {
            todos.splice(indexTodo, 1);
            return res.status(200).json({ message: `TODO with id ${ id } deleted`})
        } else {
            return res.status(404).json({ message: `TODO with id ${ id } not found`})
        }
    }

}