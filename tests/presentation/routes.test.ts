import request from 'supertest';
import { serverTest } from '../server-test';
import { prisma } from '../../src/data/postgres/postgres';

describe('test in the routes de TODOs', () => {

    beforeAll(async () => {
        await serverTest.start();
    });

    afterAll(async () => {
        await serverTest.close();
    });

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    })

    let todo1 = { text: 'todo 1', completedAt: new Date() };
    let todo2 = { text: 'todo 2', completedAt: new Date() };

    test('should return all Todos', async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        })
        const { body } = await request(serverTest.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
    });

    test('should return a values todo in /api/todos/:id', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(serverTest.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            completedAt: new Date(todo.completedAt).toJSON(),
            id: todo.id,
            text: todo.text,
        })
    });

    test('should return a 404 Bad Request in /api/todos/:id', async () => {

        const { body } = await request(serverTest.app)
            .get(`/api/todos/85`)
            .expect(404);

        expect(body).toEqual({
            "e": "Todo with 85 not found",
        })
    });

    test('should return a new todo in /api/todos', async () => {

        const { body } = await request(serverTest.app)
            .post(`/api/todos`)
            .send(todo1)
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: new Date(todo1.completedAt).toJSON()
        })
    });

    test('should return a error Bad Request because property text is required', async () => {
        const { body } = await request( serverTest.app )
        .post('/api/todos')
        .send({ })
        .expect(400);

        expect(body).toEqual({ message: 'text property is required' })
    });

    test('should return a error Bad Request because text property must be a string value', async () => {
        const { body } = await request( serverTest.app )
        .post('/api/todos')
        .send({ text: 8})
        .expect(400);
        
        expect(body).toEqual({ message: 'text property should be a String value' })
    });

    test('should return a error Bad Request because completedAt is Invalid Date', async () => {
        const { body } = await request( serverTest.app )
        .post('/api/todos')
        .send({ text:'New Todo', completedAt: 'gg'})
        .expect(400);
        
        expect(body).toEqual({ message: 'CompletedAt must be a valid date' })
    });

    test('should return a 404 not found in /api/todos/:id', async () => {
    

        const todoUpdate = { text: 'update todo', completedAt: new Date()};
        
        const { body } = await request( serverTest.app )
        .put(`/api/todos/69`)
        .send(todoUpdate)
        .expect(404);

        expect(body).toEqual({ "e": "Todo with 69 not found", });
    });

    test('should return the todo update in /api/todos/:id', async () => {
        
        const todo = await prisma.todo.create({
            data: todo1
        });

        const todoUpdate = { text: 'update todo', completedAt: new Date()};
        
        const { body } = await request( serverTest.app )
        .put(`/api/todos/${todo.id}`)
        .send(todoUpdate)
        .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todoUpdate.text,
            completedAt: new Date(todoUpdate.completedAt).toJSON()
        });
    });

    test('should return a Bad Request because Id must be a valid number', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const todoUpdate = { text: 'update todo', completedAt: new Date()};
        
        const { body } = await request( serverTest.app )
        .put(`/api/todos/d`)
        .send(todoUpdate)
        .expect(400);

        expect(body).toEqual({ message: 'Id must be a valid number'});
    });

    test('should return a Bad Request because text property must be a valid string', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const todoUpdate = { text: 69, completedAt: new Date()};
        
        const { body } = await request( serverTest.app )
        .put(`/api/todos/${todo.id}`)
        .send(todoUpdate)
        .expect(400);

        expect(body).toEqual({ message: 'Text property should be a string'});
    });

    test('should return a Bad Request because completedAt property must be a valid Date value', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const todoUpdate = { completedAt: 'ff'};
        
        const { body } = await request( serverTest.app )
        .put(`/api/todos/${todo.id}`)
        .send(todoUpdate)
        .expect(400);

        expect(body).toEqual({ message: 'CompletedAt must be a valid date'});
    });

    test('Should return a 404 in /api/todos/:id', async () => {
        const { body } = await request( serverTest.app )
        .delete('/api/todos/69')
        .expect(404);

        expect(body).toEqual({ e: "Todo with 69 not found",})
    });

    test('Should return a todo deleted in /api/todos/:id', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request( serverTest.app )
        .delete(`/api/todos/${todo.id}`)
        .expect(200);

        expect(body).toEqual({
            completedAt: new Date(todo.completedAt).toJSON(),
            id: todo.id,
            text: todo.text,
        })
    });
})