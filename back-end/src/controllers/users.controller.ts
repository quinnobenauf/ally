import * as express from "express";
import Controller from "../interfaces/controller.interface";
import User from "../interfaces/user.interface";
import userModel from "../model/user.model";
import UserNotFoundException from "../exceptions/UserNotFoundException";

class UsersController implements Controller {
  public path = "/users";
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
    this.router.get(`${this.path}/:id/friends`, this.getFriends);
  }

  private getAllUsers = (req: express.Request, res: express.Response) => {
    this.user.find().then(users => {
      res.send(users);
    });
  };

  private getFriends = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    this.user.findById(id).then(user => {
      this.user
        .find({
          _id: { $in: user.friends }
        })
        .then(friends => {
          res.send(friends);
        });
    });
  };

  private getUserById = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log("Getting user");
    const id = req.params.id;
    if (id.length == 24) {
      this.user.findById(id).then(user => {
        if (user) {
          res.send(user);
        } else {
            this.user.find({'userName': id}).then((user) => {
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            });

        }
      });
    } else {
      this.user.find({ userName: id }).then(user => {
        if (user) {
          res.send(user);
        } else {
          next(new UserNotFoundException(id));
        }
      });
    }
  };

  private modifyUser = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const userData: User = req.body;
    console.log("CONTROLLER FRIENDS: ", userData.friends);
    this.user
      .updateOne(
        { _id: id },
        {
          $set: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            userName: userData.userName,
            password: userData.password,
            email: userData.email,
            phone: userData.phone,
            allergies: userData.allergies,
            diets: userData.diets,
            friends: userData.friends
          }
        }
      )
      .then(user => {
        console.log("UPDATED??");
      });

    // firstName: String,
    // lastName: String,
    // userName: String,
    // password: String,
    // email: String,
    // phone: String,
        // this.user
        // .updateOne({ _id: id }, { $set: { diets: userData.diets } })
        // .then(user => {});

        this.user.updateOne({'_id': id}, {$set: {'friends': userData.friends}}).then((user) => {
            res.send(user);
            console.log('friends');
        });


    // this.user.find().where({$and: [{fistName: 'Jared'}, {allergies:{$in:{type:'Peanut'}}}]})
    // .exec(() => {
    //     console.log('found');
    // });
  };

  private deleteUser = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const id = req.params.id;
    this.user.findByIdAndDelete(id).then(successResponse => {
      if (successResponse) {
        res.send(200);
      } else {
        next(new UserNotFoundException(id));
      }
    });
  };
}

export default UsersController;
