import { Interpreter } from "./interpreter.interface";
import { TrackMessage } from "../models/track-message";


// BalticInterpreter implementation for a BalticInterprter GPS
export class BalticInterpreter extends Interpreter {
    extracData(data: string) {
        throw new Error("Method not implemented.");
    }
    getPingData(dataRaw: string): import("../models/ping_data").PingData {
        throw new Error("Method not implemented.");
    }
    getAction(cmdRaw: string): import("../types/events").GPSEvent {
        throw new Error("Method not implemented.");
    }


}