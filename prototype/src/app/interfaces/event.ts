import { User } from "./user";

export class Event {
    _id: string;
    title: string;
    host: string;
    guests: User[] = new Array<User>();
    date: string;
    location: string;
}
