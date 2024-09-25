import { CreateTodoDtos, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDtos } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly todoDatasource: TodoDatasource,
    ){}

    create(createTodoDto: CreateTodoDtos): Promise<TodoEntity> {
        return this.todoDatasource.create(createTodoDto);
    }

    update(updateTodoDto: UpdateTodoDtos): Promise<TodoEntity> {
        return this.todoDatasource.update(updateTodoDto);
    }

    getAll(): Promise<TodoEntity[]> {
        return this.todoDatasource.getAll();
    }

    findById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.findById(id);
    }
    
    delete(id: number): Promise<TodoEntity> {
        return this.todoDatasource.delete(id);
    }

}