import { Interpreter } from "./interpreter/interpreter";
import { TrackMessage } from "./models/track-message";
import { Socket } from "net";
import { GPSEvent } from "./types/events";
import { EventEmitter } from "events";

type EventHandler = (e: string, message: TrackMessage, tracker: GPSTracker) => void;

// GPSTracker its the server that takes care of the connection with the gps
export class GPSTracker {

    public output: EventEmitter = new EventEmitter();
    public OnEvent: EventHandler | null = null;

    private _socket: Socket | null = null;



    constructor(private _interpreter: Interpreter) { }

    public connect(socket: Socket): void {

        // handle data incomming
        socket.on('data', (data: Buffer) => {
            const message: TrackMessage = this._interpreter.Decode(data);
            this._handleMessage(message);

        });
    }

    // _handleMessage its take a message and emitted
    private _handleMessage(msg: TrackMessage) {
        switch (msg.event) {
            case GPSEvent.HANDSHAKE:

                break;
            case GPSEvent.PING:
                this.OnEvent('ping', msg, this);
                break;

            case GPSEvent.ALARM:
                this.OnEvent('alarm', msg, this);
                break;

            default:
                break;
        }


    }

}