interface Event {
    title: string;
    host: string;
    invited: [string];
    guests: [string];
    date: Date;
    location: string;
}

export default Event;