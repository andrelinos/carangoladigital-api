import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import path from 'path';
import { Server } from 'socket.io';

import { router } from './routes';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

const NOD_ENV = process.env.NOD_ENV;

const HOST_PORT = process.env.HOST_PORT || 3333;

// CONFIG REMOTE
const MONGODB = process.env.MONGODB;
const DB_NAME_MONGO = process.env.DB_NAME_MONGO;

mongoose
  .connect(MONGODB || '', {
    dbName: DB_NAME_MONGO,
  })
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });

    const folderPath = path.resolve(__dirname, '..', 'uploads');

    app.use('/uploads', express.static(folderPath));
    app.use(express.json());
    app.use(router);

    server.listen(HOST_PORT || '3333', () => {
      if (NOD_ENV != 'production')
        console.log(`🚀 server running on http://localhost:${HOST_PORT} 🛫`);
    });
  })
  .catch(() => NOD_ENV != 'production' && console.log('Error connect on db'));
