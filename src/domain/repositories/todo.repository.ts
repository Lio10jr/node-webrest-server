import { UpdateTodoDtos } from './../dtos/todos/update.dto';
import { CreateTodoDtos } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDtos): Promise<TodoEntity>;

    abstract update(updateTodoDto: UpdateTodoDtos): Promise<TodoEntity>;

    //todo: Paginación
    abstract getAll(): Promise<TodoEntity[]>;
    
    abstract findById(id: number): Promise<TodoEntity>;

    abstract delete(id: number): Promise<TodoEntity>;
}