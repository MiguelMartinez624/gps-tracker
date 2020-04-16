import { Interpreter } from "./interpreter";
import { GPSEvent } from "../types/events";
import { PingData } from "../models/ping_data";
import { TrackMessage } from "../models/track-message";
import { Util } from "../util/util";

export class ConcoxInterpreter extends Interpreter {
    parsePingMessage(dataRaw: Buffer): TrackMessage {
        let imei = Util.HexToInt(dataRaw.slice(5, 13))
        let message: TrackMessage = new TrackMessage(
            imei,
            GPSEvent.PING,
            this._getPingData(dataRaw.slice(3)));



        return message;
    }

    parseLoginMessage(dataRaw: Buffer): TrackMessage {
        let str = dataRaw.slice(4, 12).toString('hex');
        let imei = parseInt(str)
        let message: TrackMessage = new TrackMessage(imei, GPSEvent.LOGIN_REQUEST, null);

        return message;
    }
    parseAlarmMessage(dataRaw: Buffer): TrackMessage {
        throw new Error("Method not implemented.");
    }

    getAction(cmdRaw: Buffer): GPSEvent {
        let cmd = cmdRaw.slice(3, 4);
        switch (cmd.toString('hex')) {
            case '01':
                return GPSEvent.LOGIN_REQUEST;
            case '12':
                return GPSEvent.PING;
            case '16':
                return GPSEvent.ALARM;
            default:
                return GPSEvent.OTHER;
                break;
        }
    }
    private _getPingData(dataRaw: Buffer): PingData {
        let pingData = new PingData();
        // pingData.date=dataRaw.
        return pingData;
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