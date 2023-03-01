require('dotenv').config();
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import cookieParser from 'cookie-parser';

// import connection from './config/connectDB';

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

// config cookie-parser
app.use(cookieParser());

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
  return res.send('404 not found');
});

app.listen(PORT, () => {
  console.log('JWT Backend is running on the port = ' + PORT);
});
