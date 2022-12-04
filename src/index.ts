import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import http from 'node:http';
import https from 'node:https';
import path from 'path';
import { Server } from 'socket.io';

const NOD_ENV = process.env.NOD_ENV;
const HOST_PORT = process.env.HOST_PORT || 3333;
const MONGODB = process.env.MONGODB;
const DB_NAME_MONGO = process.env.DB_NAME_MONGO;

import { router } from './routes';

const app = express();
const server =
  NOD_ENV !== 'production'
    ? http.createServer(app)
    : https.createServer(
        {
          key: fs.readFileSync('../../cert/key.pem'),
          cert: fs.readFileSync('../../cert/cert.pem'),
        },
        app,
      );
export const io = new Server(server);

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

    server.listen(HOST_PORT, () => {
      if (NOD_ENV !== 'development')
        console.log(`🚀 server running on http://localhost:${HOST_PORT} 🛫`);
    });
  })
  .catch(() => NOD_ENV != 'production' && console.log('Error connect on db'));
