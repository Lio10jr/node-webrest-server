import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    pathPublic?: string;
    routers: Router;
}

export class Server {

    private app = express();
    private readonly pathPublic;
    private readonly port;
    private readonly routers;

    constructor(options: Options) {
        const { pathPublic = 'public', port, routers } = options;
        this.pathPublic =  pathPublic;
        this.port = port;
        this.routers = routers;
    }

    async start() {

        //* Middleware
        this.app.use ( express.json() );
        this.app.use ( express.urlencoded({ extended: true })); // allow x-www-form-urlencoded

        //* Public Folder
        this.app.use( express.static( this.pathPublic ) );

        //* Routers
        this.app.use( this.routers );

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${ this.pathPublic }/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}