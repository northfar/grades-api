import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from './models/index.js';
import {gradeRouter} from './routes/gradeRouter.js'
(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();
const origins = ['http://localhost:8080', 'http://desafio04-grades-app.herokuapp.com/']

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if(!origin) 
          return callback(null, true)
      if(origins.indexOf(origin) === -1){
        var msg = 'A política de CORS deste site não permite acesso a partir dessa origem'
        return callback(new Error(msg), false)
      }

      return callback(null, true)
    }
  })
);

app.use('/', gradeRouter)

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {});
