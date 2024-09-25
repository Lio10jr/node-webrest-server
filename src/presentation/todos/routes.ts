import { Router } from "express";
import { TodosController } from "./controller";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/tood.repository.impl";
import { TodoDatasourceImpl } from "../../infrastructure/datasources/todo.datasource.impl";


export class TodoRoutes {
     
    static get routes(): Router {

        const router = Router();        
        const dataSource = new TodoDatasourceImpl();
        const repositoryPostgres = new TodoRepositoryImpl(dataSource);
        const todoController = new TodosController(repositoryPostgres);

        router.get('/', todoController.getTodos );
        router.get('/:id', todoController.getTodosById );
        router.post('/', todoController.createTodo );
        router.put('/:id', todoController.updateTodo );
        router.delete('/:id', todoController.deleteTodo );

        return router;
    }
}