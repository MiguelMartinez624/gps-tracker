import { Interpreter } from "./interpreter/interpreter.interface";
import { TrackMessage } from "./models/track-message";
import { Socket } from "net";
import { GPSEvent } from "./types/events";
import { EventEmitter } from "events";

type EventHandler = (message: TrackMessage, tracker: GPSTracker) => void;

// GPSTracker its the server that takes care of the connection with the gps
export class GPSTracker {

    public output: EventEmitter = new EventEmitter();
    public OnEvent: EventHandler | null = null;

    private _socket: Socket | null = null;



    constructor(private _interpreter: Interpreter) { }

    public connect(socket: Socket): void {

        // handle data incomming
        socket.on('data', (data: Buffer) => {
            const firstMsg = data.toString();
            const message: TrackMessage = this._interpreter.Decode(firstMsg);
            this._handleMessage(message);

        });
    }

    private _handleMessage(msg: TrackMessage) {
        switch (msg.Event) {
            case GPSEvent.HANDSHAKE:

                break;

            default:
                break;
        }


    }

}