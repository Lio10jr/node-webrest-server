import { AppRoutes } from './../src/presentation/routes';
import { envs } from './../src/config/envs';
import { Server } from '../src/presentation/server';



export const serverTest = new Server({
    port: envs.PORT,
    routers: AppRoutes.routes
})