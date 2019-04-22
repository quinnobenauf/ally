import 'dotenv/config';
import App from './app';
import UsersController from './model/users.controller';

const app = new App(
    [
        new UsersController()
    ],
);

app.listen();