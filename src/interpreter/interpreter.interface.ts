

// IDecoder interface for a decoder it recive a chuck of bytes and return 

import { TrackMessage } from "../models/track-message";
import { GPSEvent } from "../types/events";

// the type 
export interface Interpreter {
    Decode(bytesF: string): TrackMessage

    getAction(cmdRaw: string): GPSEvent
}