import { Interpreter } from "./interpreter.interface";
import { TrackMessage } from "../models/track-message";
import { GPSEvent } from "../types/events";

export class TKInterpreter implements Interpreter {
    getAction(cmdRaw: string): GPSEvent {
        switch (cmdRaw) {
            case 'BP05':
                return GPSEvent.LOGIN_REQUEST;
            case 'BP00':
                return GPSEvent.PING;
            case 'BP01':
                return GPSEvent.ALARM;
            default:
                return GPSEvent.OTHER;
                break;
        }
    }


    Decode(bytesF: string): TrackMessage {
        let data = bytesF.toString();
        var parts = this.extracData(data);

        const action: GPSEvent = this.getAction(parts.cmd);


        let message: TrackMessage = new TrackMessage(
            parts.device_id, action
        );
        return message;
    }


    private extracData(data: string): any {
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