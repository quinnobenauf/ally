import * as express from "express";
import Controller from "../interfaces/controller.interface";
import Event from "../interfaces/event.interface";
import eventModel from "../model/event.model";
import userModel from "../model/user.model";
import Allergy from "../interfaces/allergy.interface";
import User from "../interfaces/user.interface";

class EventsController implements Controller {
  public path = "/events";
  public router = express.Router();
  private event = eventModel;
  private user = userModel;
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
    const eventId = req.params.id;
    this.event.findById(eventId).then(event => {
      console.log("EVENT: ", event);
      event.guests.forEach(guest => {
        console.log("GUEST: ", guest);
        this.user.findById(guest).then(user => {
          user.allergies.forEach(allergy => {
            console.log("ALLERGY: ", allergy);
            this.allergies.push(allergy);
          });
        });
      });
      this.allergies.forEach(allergy => {
        console.log("ALLERGIES ARRAY: ", allergy);
      });
      // this res might be getting called too early
      // need to wait for function to finish before sending res
      res.send(this.allergies);
    });
  };
}

export default EventsController;
