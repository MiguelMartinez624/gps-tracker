import { Interpreter } from "./interpreter";
import { GPSEvent } from "../types/events";
import { PingData } from "../models/ping_data";
import { TrackMessage } from "../models/track-message";

export class ConcoxInterpreter extends Interpreter {
    parsePingMessage(dataRaw: Buffer): TrackMessage {
        throw new Error("Method not implemented.");
    }
    parseLoginMessage(dataRaw: Buffer): TrackMessage {
        throw new Error("Method not implemented.");
    }
    parseAlarmMessage(dataRaw: Buffer): TrackMessage {
        throw new Error("Method not implemented.");
    }
    getAction(cmdRaw: Buffer): GPSEvent {
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