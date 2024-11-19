// import express from "express";
// import cors from "cors";
// import pino from 'pino-http';
// import dotenv from 'dotenv';
// import { env } from "./utils/env.js";
// import router from './routers/index.js';
// import { errorHandler } from "./middlewares/errorHandler.js";
// import { notFoundHandler } from "./middlewares/notFoundHandler.js";
// import cookieParser from 'cookie-parser';

// import { UPLOAD_DIR } from "./constants/index.js";

// import { swaggerDocs } from "./middlewares/swaggerDocs.js";

// dotenv.config();
// const PORT = Number(env("PORT", 3000));


// export const setupServer = () => {
//     const app = express();

//     app.use(express.json());
//     app.use(cors());
//     app.use(cookieParser());

//     app.use(
//         pino({
//           transport: {
//             target: 'pino-pretty',
//           },
//         }),
//     );

//     app.use('/uploads', express.static(UPLOAD_DIR));
//     app.use('/api-docs', swaggerDocs());

//     app.use(router);

//     app.use(notFoundHandler);
//     app.use(errorHandler);


//     app.listen(PORT, () => {
//         console.log(`This server is running on PORT ${PORT}`);
//     });
// };
import path from 'node:path';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';

import routers from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { swaggerDocs } from './middlewares/swaggerDocs.js';

const app = express();

app.use('/api-docs', swaggerDocs());

app.use('/photos', express.static(path.resolve('src', 'public/photos')));

export const setupServer = async () => {
  try {
    await initMongoConnection();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }

  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/', routers);

  app.use(notFoundHandler);
  app.use(errorHandler);
};

export default app;

