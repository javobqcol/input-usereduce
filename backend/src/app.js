import express from 'express'
import { router as productRoutes} from './routes/products.routes.js' 

import cors from 'cors'
export const app = express()

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

//middlewares
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(express.json())

const corsOptions = { 
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

app.use(cors(corsOptions));
//app.use(cors)
app.use(productRoutes)


