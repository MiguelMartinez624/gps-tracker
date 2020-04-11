import { Server, Socket } from "net"
import { IMEI } from "./types/imei";
import { GPSTracker } from "./gps-tracker";
import { Interpreter } from "./interpreter/interpreter.interface";
import { EventEmitter } from "events";
import { TrackMessage } from "./models/track-message";

export class TrackingServer {

    private _units: Map<IMEI, GPSTracker> = new Map<IMEI, GPSTracker>();
    public Output: EventEmitter = new EventEmitter();
    constructor(
        private _server: Server,
        protected interpreter: Interpreter) {

    }

    public Listen(port: string): void {
        this._server.listen(port);
        this._server.on('connection', this._handleIncommingCon.bind(this));


    }
    public _handleIncommingCon(socket: Socket): void {

        const tracker = new GPSTracker(this.interpreter);
        tracker.connect(socket);

        tracker.OnEvent = (message: TrackMessage, tracker: GPSTracker) => {
            //On event will only by called if th connection was succefull   
            this.Output.emit('ping', { message: message, tracker: tracker });
        }

    };

}