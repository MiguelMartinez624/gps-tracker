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
            this._getPingData(dataRaw.slice(4))
        );

        return message;
    }

    parseLoginMessage(dataRaw: Buffer): TrackMessage {
        let str = dataRaw.slice(4, 12).toString('hex');
        let imei = parseInt(str)
        let message: TrackMessage = new TrackMessage(imei, GPSEvent.LOGIN_REQUEST, null);

        return message;
    }
    parseAlarmMessage(dataRaw: Buffer): TrackMessage {
        let imei = Util.HexToInt(dataRaw.slice(5, 13))
        let message: TrackMessage = new TrackMessage(
            imei,
            GPSEvent.PING,
            this._getPingData(dataRaw.slice(4))
        );



        return message;
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

        pingData.date = this._extractDate(dataRaw.slice(0, 6));
        pingData.latitude = parseInt(dataRaw.slice(7, 11).toString('hex'), 16) / 1800000;
        pingData.longitude = parseInt(dataRaw.slice(11, 15).toString('hex'), 16) / 1800000;
        pingData.speed = parseInt(dataRaw.slice(15, 16).toString('hex'), 16);


        // let tempbuf = new Buffer(bytes.toString('hex'),'')
        let cursorBytes = Util.Hex2bin(dataRaw.slice(16, 18).toString('hex'));
        pingData.orientation = parseInt(cursorBytes.slice(6),2) ;
        return pingData;
    }

    private _extractDate(raw: Buffer): any {    
        let year = Util.HexToInt(raw.slice(0, 1));
        let month = Util.HexToInt(raw.slice(1, 2));
        let day = Util.HexToInt(raw.slice(2, 3));
        let hour = Util.HexToInt(raw.slice(3, 4));
        let minute = Util.HexToInt(raw.slice(4, 5));
        let second = Util.HexToInt(raw.slice(5));

        let date = `20${year}-${month}-${day} ${hour}:${minute}:${second}`;

        return date;
    }

}