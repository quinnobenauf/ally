import * as express from "express";
import Controller from "../interfaces/controller.interface";
import Event from "../interfaces/event.interface";
import eventModel from "../model/event.model";
import userModel from "../model/user.model";

class EventsController implements Controller {
  public path = "/events";
  public router = express.Router();
  private event = eventModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllEvents);
        this.router.get(`${this.path}/host/:id`, this.getEventsByHost);
        this.router.get(`${this.path}/:id`, this.getEventById);
        this.router.delete(`${this.path}/:id`, this.deleteEvent);
        this.router.post(this.path, this.createEvent);
    }

  private getAllEvents = (req: express.Request, res: express.Response) => {
    this.event.find().then(events => {
      res.send(events);
    });
  };

  private getEventById = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    if (id.length == 24) {
      this.event.findById(id).then(event => {
        res.send(event);
      });
    } else {
      this.event.find({ type: id }).then(event => {
        res.send(event);
      });
    }
  };

  private getEventsByHost = (req: express.Request, res: express.Response) => {

        const id = req.params.id;
        let query = {'host': id};
        this.event.find(query).then((events) => {
            res.send(events);
        });
  };

  private deleteEvent = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    this.event.findByIdAndDelete(id).then(successResponse => {
      if (successResponse) {
        res.send(200);
      } else {
        res.send(400);
      }
    });
  };

  private createEvent = (req: express.Request, res: express.Response) => {
    const eventData: Event = req.body;
    const createdEvent = new this.event(eventData);
    createdEvent.save().then(savedEvent => {
      res.send(savedEvent);
    });
    console.log(eventData);
  };
}

export default EventsController;
