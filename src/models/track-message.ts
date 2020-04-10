import { IMEI } from "../types/imei";

// TrackMessage message of track event
export class TrackMessage {
    constructor(
        public IMEI: IMEI
    ) { }
}