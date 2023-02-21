import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
// import connection from './config/connectDB';
require('dotenv').config();

import bodyParser from 'body-parser';

const app = express();

// Sử dụng body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

// config view engine
configViewEngine(app);

// test connection db
// connection();

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log('JWT Backend is running on the port = ' + PORT);
});
