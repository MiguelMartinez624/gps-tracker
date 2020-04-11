import { IMEI } from "../types/imei";
import { GPSEvent } from "../types/events";
import { PingData } from "./ping_data";

// TrackMessage message of track event
export class TrackMessage {
    constructor(
        public IMEI: IMEI,
        public event: GPSEvent,
        public pingData: PingData | null
    ) { }
}