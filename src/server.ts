import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import parser from 'body-parser';
import cors from 'cors';
import './database';

const app = express();

app.use(cors());
app.use(parser.json());
app.use(routes);

app.listen(3333, () =>{
    console.log('App started on port 3333');
});