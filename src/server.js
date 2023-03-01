import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import { createJWT, verifyToken } from './middleware/JWTAction';
// import connection from './config/connectDB';
require('dotenv').config();

import bodyParser from 'body-parser';

const app = express();

// Sử dụng body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

// config CORS
configCors(app);

// config view engine
configViewEngine(app);

// test connection db
// connection();

// test JWT
// createJWT();
// let decodedData = verifyToken(
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJpYyIsImFkZHJlc3MiOiJoYSBub2kiLCJpYXQiOjE2Nzc0OTEyMDR9.oKqTKs5pC1NRNPeJZj5moR4a1_L5ytp7h6b8B6vESFs'
// );
// console.log('decodedData,decodedData', decodedData);

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log('JWT Backend is running on the port = ' + PORT);
});
