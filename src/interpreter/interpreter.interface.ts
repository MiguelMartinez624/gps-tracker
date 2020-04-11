

// IDecoder interface for a decoder it recive a chuck of bytes and return 

import { TrackMessage } from "../models/track-message";
import { GPSEvent } from "../types/events";
import { PingData } from "../models/ping_data";

// the type 
export interface Interpreter {

    Decode(bytesF: string): TrackMessage

    getAction(cmdRaw: string): GPSEvent;
    getPingData(dataRaw: string): PingData;
}