import express , {Application} from 'express';
import bodyParser from 'body-parser';
import {router} from './routes/todoRoutes';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(router);

app.listen(5000, () => console.log('Server running on port ', 5000));