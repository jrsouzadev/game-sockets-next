import dotenv from 'dotenv';
import next, { NextApiHandler } from 'next'
import { NextServer } from 'next/dist/server/next';
import express, { Express } from 'express';
import http from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { generateId } from './utils';

export class AppServer {

    readonly id: string;

    private nextApp: NextServer;
    private handler: NextApiHandler;

    private expressApp: Express;
    private httpServer: http.Server;
    private socketServer: SocketServer;
    private port: string | number;
    private env: string;

    constructor(config: ServerConfigOptions) {
        dotenv.config()

        this.id = `server_${generateId()}`;
        this.port = config.port || 3333;
        this.env = config.env || 'development';

        this.nextApp = next({ dev: this.env !== 'production' })
        this.handler = this.nextApp.getRequestHandler()

        this.expressApp = express();
        this.httpServer = http.createServer(this.expressApp);
        this.socketServer = new SocketServer(this.httpServer);
    }

    startServer() {
        this.nextApp.prepare().then(async () => {
            this.socketServer.on('connection', (socket: Socket) => {
                console.log(`Socket connected: socket ID ${socket.id}`);

                socket.on('disconnect', () => {
                    console.log(`Socket disconnected: id ${socket.id}`);
                })
            });

            this.expressApp.all('*', (req: any, res: any) => this.handler(req, res));

            this.httpServer.listen(this.port, () => {
                console.log(`Server started on http://localhost:${this.port}`);
            });
        });
    }
}


