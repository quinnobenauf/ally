import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as passport from 'passport';
import * as session from 'express-session';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import GooglePassportOAuth from './middlewares/googlePassport.middleware';

class App {
    public app: express.Application;
    public googlePasspport: GooglePassportOAuth;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.connectToDB();
        this.initializeMiddlewares();
        this.initializeErrorHandling();
        this.mountControllers(controllers);
        this.googlePasspport = new GooglePassportOAuth();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(session({ secret: "dogs" }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private mountControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private connectToDB() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true}).then(() =>  {
            console.log("connected to db");
        });
        // mongoose.connect('mongodb://localhost:3000/ally').then(() => { 
        //     console.log('connected to db');
        // });
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    }
}

export default App;