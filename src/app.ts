import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

function main() {
    const serve = new Server({
        port: envs.PORT,
        pathPublic: envs.PATH_PUBLIC
    });
    serve.start();
}