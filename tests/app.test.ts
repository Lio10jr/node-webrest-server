import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server'); // ayuda a que el Server sea un moch y poder evaluar todos sus argumentos

describe('should call server with argumnets and start', () => {

    test('should work', async () => {
        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);

        expect(Server).toHaveBeenCalledWith({
            pathPublic: envs.PATH_PUBLIC,
            port: envs.PORT,
            routers: expect.any(Function),
        })

        expect(Server.prototype.start).toHaveBeenCalledTimes(1);
    })
})