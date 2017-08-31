import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
//Importando models e routes
import Game from './app/models/game';
import { getGames, getGame, postGame, deleteGame } from './app/routes/game';

const app = express();  //Nosso servidor express
const port = process.env.PORT || 8080

//DB conexão no Mongoose
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }
}
mongoose.Promise = global.Promise;
mongoose.connect('MOngoConnectionString', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

//Midleware Body Parser
app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));