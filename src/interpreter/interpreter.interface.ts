

// IDecoder interface for a decoder it recive a chuck of bytes and return 

import { TrackMessage } from "../models/track-message";

// the type 
export interface Interpreter {
    Decode(bytesF: string): TrackMessage
}