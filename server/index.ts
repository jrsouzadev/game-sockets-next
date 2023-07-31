import { AppServer } from './server';

const config: ServerConfigOptions = {
  port: parseInt(process.env.PORT || '3333', 10),
  env: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}

const server = new AppServer(config)

server.startServer()