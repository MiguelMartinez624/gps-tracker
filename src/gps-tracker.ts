import { Interpreter } from "./interpreter/interpreter";
import { TrackMessage } from "./models/track-message";
import { Socket } from "net";
import { GPSEvent } from "./types/events";
import { EventEmitter } from "events";
import { IMEI } from "./types/imei";

type EventHandler = (e: string, message: TrackMessage, tracker: GPSTracker) => void;

// GPSTracker its the server that takes care of the connection with the gps
export class GPSTracker {

    public output: EventEmitter = new EventEmitter();
    public OnEvent: EventHandler | null = null;

    public imei: IMEI;

    private _socket: Socket | null = null;



    constructor(private _interpreter: Interpreter) { }

    public connect(socket: Socket): void {

        // handle data incomming
        socket.on('data', (data: Buffer) => {
            const message: TrackMessage = this._interpreter.Decode(data);
            this._handleMessage(message);
            if (message.IMEI) {
                this.OnEvent('connected', message, this);
            }
        });
    }

    // _handleMessage its take a message and emitted
    private _handleMessage(msg: TrackMessage) {
        switch (msg.event) {
            case GPSEvent.HANDSHAKE:
                this.OnEvent('handshake', msg, this);
                break;
            case GPSEvent.LOGIN_REQUEST:
                this.imei = msg.IMEI;
                this.OnEvent('login', msg, this);
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