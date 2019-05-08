import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import User from '../interfaces/user.interface';
import userModel from '../model/user.model';

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
        if (id.length == 24) {
            this.user.findById(id).then((user) => {
                res.send(user);
            });
        } else {
            this.user.find({'userName': id}).then((user) => {
                res.send(user);
            });
        }
    }

    private modifyUser = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        const userData: User = req.body;

        this.user.updateOne({'_id': id}, {$set: {'allergies': userData.allergies}}).then((user) => {
            console.log('allergies');
        });

        this.user.updateOne({'_id': id}, {$set: {'diets': userData.diets}}).then((user) => {
            console.log('diets');
        });

        // userData.allergies.forEach(element => {
        //     if (!this.user.find().where({$and: [{_id: id}, {allergies: {$in: element}}]})) {
        //         console.log('hi');
        //     }
        //     this.user.updateOne({'_id': id}, {$addToSet: {'allergies': element}}).then((user) => {
        //         console.log("updated allergies!");
        //     });
        // });
        // find element in array within the document
        this.user.find().where({$and: [{fistName: 'Jared'}, {allergies:{$in:{type:'Peanut'}}}]})
        .exec(() => {
            console.log('found');
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