import { Server, Socket } from "net"
import { IMEI } from "./types/imei";
import { GPSTracker } from "./gps-tracker";
import { Interpreter } from "./interpreter/interpreter.interface";
import { EventEmitter } from "events";
import { TrackMessage } from "./models/track-message";

export class TrackingServer extends EventEmitter {

    private _units: Map<IMEI, GPSTracker> = new Map<IMEI, GPSTracker>();
    constructor(
        private _server: Server,
        protected interpreter: Interpreter) {
        super()
    }

    public Listen(port: string): void {
        this._server.listen(port);
        this._server.on('connection', this._handleIncommingCon.bind(this));


    }

    // _handleIncommingCon handle socket connection, creating a gps tracker
    // and listening for events
    public _handleIncommingCon(socket: Socket): void {

        const tracker = new GPSTracker(this.interpreter);
        tracker.connect(socket);

        //Register event handler so the server an bubble up
        tracker.OnEvent = (ev: string, message: TrackMessage, tracker: GPSTracker) => {
            //On event will only by called if th connection was succefull   
            this.emit(ev, { message: message, tracker: tracker });
        }

    };

}