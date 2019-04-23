import 'dotenv/config';
import App from './app';
import UsersController from './model/users.controller';
import AllergiesController from './model/allergies.controller';
import DietsController from 'model/diet.controller';

const app = new App(
    [
        new UsersController(),
        new AllergiesController(),
        new DietsController()
    ],
);

app.listen();