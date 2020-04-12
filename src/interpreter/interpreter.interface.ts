

// IDecoder interface for a decoder it recive a chuck of bytes and return 

import { TrackMessage } from "../models/track-message";
import { GPSEvent } from "../types/events";
import { PingData } from "../models/ping_data";

// Interpreter its the on who decode the raw message from a gps
// a class that extends this one should defin the way that the data
// its extracted for certaing gps protocol
export abstract class Interpreter {

    // Decode it pars and extract the data from a raw gps message
    Decode(bytesF: string): TrackMessage {
        let data = bytesF.toString();
        let parts = this.extracData(data);
        let pingData: PingData | null = null;

        const action: GPSEvent = this.getAction(parts.cmd);
        // In case that the CMD its actually a ping cmd we need to 
        // extract the data aout of the message
        if (action === GPSEvent.PING) {
            pingData = this.getPingData(parts.data);
        }

        let message: TrackMessage = new TrackMessage(
            parts.device_id,
            action,
            pingData
        );
        
        return message;
    }

    abstract getAction(cmdRaw: string): GPSEvent;
    abstract getPingData(dataRaw: string): PingData;
    // extracData
    abstract extracData(data: string): any;
}