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
const port = process.env.HOST_PORT || 3333;

// CONFIG LOCAL
const MONGODB_URL_LOCAL = process.env.MONGODB_URL_LOCAL;
const LOCAL_PORT = process.env.LOCAL_PORT;

// CONFIG REMOTE
const MONGODB_URL = process.env.MONGODB_URL;
const REMOTE_PORT = process.env.REMOTE_PORT;

const database =
  NOD_ENV !== 'production'
    ? `${MONGODB_URL_LOCAL}:${LOCAL_PORT}`
    : `${MONGODB_URL}`;

const databasename =
  NOD_ENV !== 'production' ? 'carangoladigital' : 'carangdx007';

mongoose
  .connect(database, {
    dbName: databasename,
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

    server.listen(port || '3333', () => {
      if (NOD_ENV != 'production')
        console.log(`🚀 server running on http://localhost:${port} 🛫`);
    });
  })
  .catch(() => NOD_ENV != 'production' && console.log('Error connect on db'));
