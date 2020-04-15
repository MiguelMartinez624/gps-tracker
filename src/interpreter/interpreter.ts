

// IDecoder interface for a decoder it recive a chuck of bytes and return 

import { TrackMessage } from "../models/track-message";
import { GPSEvent } from "../types/events";
import { PingData } from "../models/ping_data";

// Interpreter its the on who decode the raw message from a gps
// a class that extends this one should defin the way that the data
// its extracted for certaing gps protocol
export abstract class Interpreter {

    // Decode it pars and extract the data from a raw gps message
    Decode(raw: string): TrackMessage {

        let message: TrackMessage | null;
        const action: GPSEvent = this.getAction(raw);
        let pingData: PingData | null = null;

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
                break;
        }




        return message;
    }

    abstract getAction(cmdRaw: string): GPSEvent;
    abstract parsePingMessage(dataRaw: string): TrackMessage;
    abstract parseLoginMessage(dataRaw: string): TrackMessage;
    abstract parseAlarmMessage(dataRaw: string): TrackMessage;
    // extracData
    abstract extracData(data: string): any;
}