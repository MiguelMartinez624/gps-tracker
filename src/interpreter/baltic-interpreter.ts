import { Interpreter } from "./interpreter.interface";
import { TrackMessage } from "../models/track-message";


// BalticInterpreter implementation for a BalticInterprter GPS
export class BalticInterpreter implements Interpreter {
    getAction(cmdRaw: string): import("../types/events").GPSEvent {
        throw new Error("Method not implemented.");
    }
    Decode(bytesF: string): TrackMessage {
        throw new Error("Method not implemented.");
    }

}