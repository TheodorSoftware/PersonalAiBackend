import userRouter from './routes/userRouter.router';
import cors from 'cors';
import dbConnection from './connection/dbConnection';
import express, { Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import redisInit  from './services/redisService.service';

dotenv.config();

const port = process.env.PORT || 8000;
const app: Application = express();
dbConnection;

const allowCrossDomain = function(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

redisInit();

app.use(cors());
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth',userRouter);

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);  
  })
  