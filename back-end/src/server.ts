import 'dotenv/config';
import App from './app';
import UsersController from './controllers/users.controller';
import AllergiesController from './controllers/allergies.controller';
import DietsController from './controllers/diets.controller';
import EventsController from './controllers/events.controller';

const app = new App(
    [
        new UsersController(),
        new AllergiesController(),
        new DietsController(),
        new EventsController()
    ],
);

app.listen();