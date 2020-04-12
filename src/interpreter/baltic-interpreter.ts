import { Interpreter } from "./interpreter.interface";
import { TrackMessage } from "../models/track-message";
import { Util } from "../util/util";


// BalticInterpreter implementation for a BalticInterprter GPS
export class BalticInterpreter extends Interpreter {
    extracData(data: string | Buffer) {
        let extracted: any = {
            imei: Util.HexToInt(<Buffer>data.slice(0, 8))
        }

    }
    getPingData(dataRaw: string): import("../models/ping_data").PingData {
        throw new Error("Method not implemented.");
    }
    getAction(cmdRaw: string): import("../types/events").GPSEvent {
        throw new Error("Method not implemented.");
    }


}