import * as express from "express";
import Controller from "../interfaces/controller.interface";
import Event from "../interfaces/event.interface";
import eventModel from "../model/event.model";
import userModel from "../model/user.model";
import allergyModel from "../model/allergy.model";
import Allergy from "../interfaces/allergy.interface";
import User from "../interfaces/user.interface";

class EventsController implements Controller {
  public path = "/events";
  public router = express.Router();
  private event = eventModel;
  private user = userModel;
  private allergy = allergyModel;
  private allergies: Allergy[] = new Array<Allergy>();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
    this.router.get(`${this.path}/host/:id`, this.getEventsByHost);
    this.router.get(`${this.path}/:id`, this.getEventById);
    this.router.put(`${this.path}/:id`, this.modifyEvent);
    this.router.delete(`${this.path}/:id`, this.deleteEvent);
    this.router.post(this.path, this.createEvent);
    this.router.get(`${this.path}/:id/allergies`, this.getGuestAllergies);
    this.router.get(`${this.path}/:id/diets`, this.getGuestDiets);
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
    let query = { host: id };
    this.event.find(query).then(events => {
      res.send(events);
    });
  };

  private modifyEvent = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const eventData: Event = req.body;
    this.event
      .updateOne(
        { _id: id },
        {
          $set: {
            guests: eventData.guests,
            title: eventData.title,
            host: eventData.host,
            date: eventData.date,
            location: eventData.location
          }
        }
      )
      .then(event => {
        if (event) {
          res.send(200);
        } else {
          res.send(400);
        }
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

  private getGuestAllergies = (req: express.Request, res: express.Response) => {
    var allergies = [];
    const eventId = req.params.id;
    this.event.findById(eventId).then(event => {
      this.user.find({ _id: { $in: event.guests } }).then(guests => {
        guests.forEach(guest => {
          guest.allergies.forEach(async allergy => {
            await allergies.push(allergy);
          });
        });
        res.send(allergies);
      });
    });
  };

  private getGuestDiets = (req: express.Request, res: express.Response) => {
    var diets = [];
    const eventId = req.params.id;
    this.event.findById(eventId).then(event => {
      this.user.find({ _id: { $in: event.guests } }).then(guests => {
        guests.forEach(guest => {
          guest.diets.forEach(async diet => {
            await diets.push(diet);
          });
        });
        res.send(diets);
      });
    });
  };
}

export default EventsController;
