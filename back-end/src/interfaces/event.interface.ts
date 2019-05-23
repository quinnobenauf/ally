import User from './user.interface';

interface Event {
    title: string;
    invited: User[];
    guests: User[];
    date: Date;
    location: String;
    host: User;
}

export default Event;