import { Interpreter } from "./interpreter.interface";
import { TrackMessage } from "../models/track-message";
import { Util } from "../util/util";
import { PingData } from "../models/ping_data";
import { GPSEvent } from "../types/events";


// BalticInterpreter implementation for a BalticInterprter GPS
export class BalticInterpreter extends Interpreter {
    extracData(data: string | Buffer) {
        let extracted: any = {};

        if (data instanceof Buffer) {
            extracted = {
                imei: Util.HexToInt(<Buffer>data.slice(0, 8)),
                date: Util.HexToDate(<Buffer>data.slice(13, 17)),
                data: <Buffer>data.slice(23, 40).reverse()
            }
        }

        return extracted;
    }
    getPingData(dataRaw: string | Buffer): PingData {
        let data: PingData = new PingData();
        
        if (dataRaw instanceof Buffer) {
            data.speed = Util.HexToInt(dataRaw.slice(8,9));
            data.orientation = Util.HexToInt(dataRaw.slice(6,7)) * 2;
            data.latitude = Util.HexToIEEE754(dataRaw.slice(9, 13));
            data.longitude = Util.HexToIEEE754(dataRaw.slice(13));
        }
      
        return data;
    }


    getAction(cmdRaw: string): GPSEvent {
        throw new Error("Method not implemented.");
    }


}