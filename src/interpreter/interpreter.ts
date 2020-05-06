

// IDecoder interface for a decoder it recive a chuck of bytes and return 

import { TrackMessage } from "../models/track-message";
import { GPSEvent } from "../types/events";
import { PingData } from "../models/ping_data";

// Interpreter its the on who decode the raw message from a gps
// a class that extends this one should defin the way that the data
// its extracted for certaing gps protocol
export abstract class Interpreter {

    // Decode it pars and extract the data from a raw gps message
    Decode(raw: Buffer): TrackMessage {
        console.log("Raw string", raw.toString())
        let message: TrackMessage | null;
        const action: GPSEvent = this.getAction(raw);
        //According to the type or command will use the corresponded parser
        switch (action) {
            case GPSEvent.LOGIN_REQUEST:
                message = this.parseLoginMessage(raw)
                break;
            case GPSEvent.PING:
                message = this.parsePingMessage(raw)
                break;
            case GPSEvent.ALARM:
                message = this.parseAlarmMessage(raw)
                break;
            default:
                message = this.parseAlarmMessage(raw)
                throw "Unhandled event";

                break;
        }
        return message;
    }

    abstract getAction(cmdRaw: Buffer): GPSEvent;
    // parsePingMessage parse the data from a ping message 
    abstract parsePingMessage(dataRaw: Buffer): TrackMessage;

    // parseLoginMessage parse the data from  a login message
    abstract parseLoginMessage(dataRaw: Buffer): TrackMessage;

    // parseAlarmMessage parse the data from an alarm message9
    abstract parseAlarmMessage(dataRaw: Buffer): TrackMessage;
}