import { createServer } from 'net';

import { TrackingServer, TKInterpreter } from '../src';

const server = createServer();

const tkTracker = new TrackingServer(server, new TKInterpreter());
tkTracker.Listen('8081');



tkTracker.on('ping', ({ message, tracker }) => {
    console.log(message);
    console.log(tracker);
});

tkTracker.on('alarm', ({ message, tracker }) => {
    console.log(message);
    console.log(tracker);
})