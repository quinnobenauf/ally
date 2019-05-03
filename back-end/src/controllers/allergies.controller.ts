import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Allergy from '../interfaces/allergy.interface';
import User from 'interfaces/user.interface';
import allergyModel from '../model/allergy.model';
import userModel from '../model/user.model';

class AllergiesController implements Controller {
    public path = '/allergies';
    public router = express.Router();
    private allergy = allergyModel;
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getAllAllergies);
        // this.router.get(`${this.path}/:id`, this.getAllergyById);
        // this.router.put(`${this.path}/:id`, this.modifyAllergy);
        this.router.delete(`${this.path}/:id`, this.deleteAllergy);
        this.router.post(this.path, this.createAllergy);
    }

    private getAllAllergies = (req: express.Request, res: express.Response) => {
        // get user data first and then get allergies (excluding user allergies!)
        const id = req.params.id;
        let allergies: Array<String> = new Array<String>();
        this.user.findById(id).then((r) => {
            r.allergies.forEach(element => {
                allergies.push(element.type);
                // console.log(allergies);
            })
            let query = {"type": {"$nin": allergies}};  
            this.allergy.find(query).then((allergies) => {
                res.send(allergies);
            })
        });

        // let query = {"type": {"$nin": allergies}};
        // console.log(query);

        // this.allergy.find(query).then((allergies) => {
        //     res.send(allergies);
        // });
    }

    private getAllergyById = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.allergy.findById(id).then((allergy) => {
            res.send(allergy);
        });
    }

    // private modifyAllergy = (req: express.Request, res: express.Response) => {
    //     const id = req.params.id;
    //     const allergyData: Allergy = req.body;
    //     this.allergy.findByIdAndUpdate(id, allergyData, { new: true }).then((allergy) => {
    //         res.send(allergy);
    //     });
    // }

    private deleteAllergy = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.allergy.findByIdAndDelete(id).then((successResponse) => {
            if (successResponse) {
                res.send(200);
            } else {
                res.send(400);
            }
        });
    }

    private createAllergy = (req: express.Request, res: express.Response) => {
        const allergyData: Allergy = req.body;
        const createdAllergy = new this.allergy(allergyData);
        createdAllergy.save().then((savedAllergy) => {
            res.send(savedAllergy);
        });
        console.log(allergyData);
    }
}

export default AllergiesController;