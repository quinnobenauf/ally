import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Diet from '../interfaces/diet.interface';
import dietModel from '../model/diet.model';

class DietsController implements Controller {
    public path = '/diets';
    public router = express.Router();
    private diet = dietModel;

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllDiets);
        this.router.get(`${this.path}/:id`, this.getDietById);
        this.router.put(`${this.path}/:id`, this.modifyDiet);
        this.router.delete(`${this.path}/:id`, this.deleteDiet);
        this.router.post(this.path, this.createDiet);
    }

    private getAllDiets = (req: express.Request, res: express.Response) => {
        this.diet.find().then((diets) => {
            res.send(diets)
        });
    }

    private getDietById = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.diet.findById(id).then((diet) => {
            res.send(diet);
        });
    }

    private modifyDiet = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        const dietData: Diet = req.body;
        this.diet.findByIdAndUpdate(id, dietData, { new: true }).then((diet) => {
            res.send(diet);
        });
    }

    private deleteDiet = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.diet.findByIdAndDelete(id).then((successResponse) => {
            if (successResponse) {
                res.send(200);
            } else {
                res.send(400);
            }
        });
    }

    private createDiet = (req: express.Request, res: express.Response) => {
        const dietData: Diet = req.body;
        const createdDiet = new this.diet(dietData);
        createdDiet.save().then((savedDiet) => {
            res.send(savedDiet);
        });
        console.log(dietData);
    }
}

export default DietsController;