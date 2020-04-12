import { Interpreter } from "./interpreter.interface";
import { TrackMessage } from "../models/track-message";
import { GPSEvent } from "../types/events";
import { PingData } from "../models/ping_data";
import { Util } from "../util/util";

export class TKInterpreter extends Interpreter {
    constructor() { super(); }

    getAction(cmdRaw: string): GPSEvent {
        switch (cmdRaw) {
            case 'BP05':
                return GPSEvent.LOGIN_REQUEST;
            case 'BR00':
                return GPSEvent.PING;
            case 'BO01':
                return GPSEvent.ALARM;
            default:
                return GPSEvent.OTHER;
                break;
        }
    }
    
    getPingData(dataRaw: string): PingData {

        let data: PingData = new PingData();
        let rawDate = dataRaw.substr(0, 6);

        data.time = dataRaw.substr(33, 6);
        data.speed = parseFloat(dataRaw.substr(28, 5));
        data.orientation = dataRaw.substr(39, 6);

        // data.availability = dataRaw.substr(6, 1);

        let datetime = "20" + rawDate.substr(0, 2) + "/" + rawDate.substr(2, 2) + "/" + rawDate.substr(4, 2);
        datetime += " " + data.time.substr(0, 2) + ":" + data.time.substr(2, 2) + ":" + data.time.substr(4, 2)
        data.date = datetime

        data.latitude = Util.MinuteToDecimal(parseFloat(dataRaw.substr(7, 9)), dataRaw.substr(16, 1));
        data.longitude = Util.MinuteToDecimal(parseFloat(dataRaw.substr(17, 9)), dataRaw.substr(27, 1));
        // data.io_state = dataRaw.substr(45, 8);
        // data.mile_post = dataRaw.substr(53, 1);
        // data.mile_data = parseInt(dataRaw.substr(54, 8), 16);

        return data

    }
    // extracData slice the cuck of data into piezes of information
    extracData(data: string): any {
        var cmd_start = data.indexOf("B"); //al the incomming messages has a cmd starting with 'B'
        if (cmd_start > 13)
            throw "Device ID is longer than 12 chars!";
        var parts = {
            "start": data.substr(0, 1),
            "device_id": data.substring(1, cmd_start),
            "cmd": data.substr(cmd_start, 4),
            "data": data.substring(cmd_start + 4, data.length - 1),
            "finish": data.substr(data.length - 1, 1)
        };
        return parts;
    }


}