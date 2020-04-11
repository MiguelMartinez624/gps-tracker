import { IMEI } from "../types/imei";
import { GPSEvent } from "../types/events";

// TrackMessage message of track event
export class TrackMessage {
    constructor(
        public IMEI: IMEI,
        public Event: GPSEvent
    ) { }
}