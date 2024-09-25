import { prisma } from "../../data/postgres/postgres";
import { CreateTodoDtos, TodoDatasource, TodoEntity, UpdateTodoDtos } from "../../domain";


export class TodoDatasourceImpl implements TodoDatasource {

    async create(createTodoDto: CreateTodoDtos): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(todo);
    }

    async update(updateTodoDto: UpdateTodoDtos): Promise<TodoEntity> {

        await this.findById( updateTodoDto.id);

        const todoUpdate = await prisma.todo.update({
            where: {
                id: updateTodoDto.id
            },
            data: updateTodoDto!.values
        });
      
        return TodoEntity.fromObject(todoUpdate);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map( TodoEntity.fromObject );
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst(
            {
                where: {
                    id: id
                }
            }
        )

        if ( !todo ) throw `Todo with ${id} not found`;

        return TodoEntity.fromObject(todo);
    }

    async delete(id: number): Promise<TodoEntity> {
        await this.findById( id );

        const todo = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        return TodoEntity.fromObject(todo);
    }

}