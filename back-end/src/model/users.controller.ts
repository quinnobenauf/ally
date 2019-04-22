import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import User from '../interfaces/user.interface';
import userModel from './users.model';

class UsersController implements Controller {
    public path = '/users';
    public router = express.Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.put(`${this.path}/:id`, this.modifyUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
        this.router.post(this.path, this.createUser);
    }

    private getAllUsers = (req: express.Request, res: express.Response) => {
        this.user.find().then((users) => {
            res.send(users);
        });
    }

    private getUserById = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.user.findById(id).then((user) => {
            res.send(user);
        });
    }

    private modifyUser = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        const userData: User = req.body;
        this.user.findByIdAndUpdate(id, userData, { new: true }).then((user) => {
            res.send(user);
        });
    }

    private deleteUser = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.user.findByIdAndDelete(id).then((successResponse) => {
            if (successResponse) {
                res.send(200);
            } else {
                res.send(404);
            }
        });
    }

    private createUser = (req: express.Request, res: express.Response) => {
        const userData: User = req.body;
        const createdUser = new this.user(userData);
        createdUser.save().then((savedUser) => {
            res.send(savedUser);
        });
        console.log(userData);
    }
}

export default UsersController;