import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

function main() {
    const serve = new Server({
        port: envs.PORT,
        pathPublic: envs.PATH_PUBLIC,
        routers: AppRoutes.routes
    });
    serve.start();
}