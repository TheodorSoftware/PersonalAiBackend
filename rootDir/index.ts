import express, { Request, Response , Application, NextFunction } from 'express';
import chatRouter from './src/routes/chatRouter.router';
import cors from 'cors';

//For env File 

const port = process.env.PORT || 8000;
const app: Application = express();


const allowCrossDomain = function(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(cors());
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});


app.use('/chat',chatRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);  
})
