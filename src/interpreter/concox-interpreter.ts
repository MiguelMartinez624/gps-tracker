import { Interpreter } from "./interpreter";
import { GPSEvent } from "../types/events";
import { PingData } from "../models/ping_data";

export class ConcoxInterpreter extends Interpreter {
    parsePingMessage(dataRaw: string): import("../models/track-message").TrackMessage {
        throw new Error("Method not implemented.");
    }
    parseLoginMessage(dataRaw: string): import("../models/track-message").TrackMessage {
        throw new Error("Method not implemented.");
    }
    parseAlarmMessage(dataRaw: string): import("../models/track-message").TrackMessage {
        throw new Error("Method not implemented.");
    }
    getAction(cmdRaw: string): GPSEvent {
        throw new Error("Method not implemented.");
    }
    getPingData(dataRaw: string): PingData {
        throw new Error("Method not implemented.");
    }
    extracData(data: string | Buffer) {
        let extracted: any = {}
        if (data instanceof Buffer) {
            extracted = {
             }
        }

        return extracted;
    }

}