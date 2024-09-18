import express from 'express';
import path from 'path';

interface Options {
    port: number;
    pathPublic?: string;
}

export class Server {

    private app = express();
    private readonly pathPublic;
    private readonly port;

    constructor(options: Options) {
        const { pathPublic = 'public', port } = options;
        this.pathPublic =  pathPublic;
        this.port = port;
    }

    async start() {

        //* Middleware


        //* Public Folder
        this.app.use( express.static( this.pathPublic ) );

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${ this.pathPublic }/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}