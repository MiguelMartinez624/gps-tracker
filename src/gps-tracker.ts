import { Interpreter } from "./interpreter/interpreter.interface";
import { IMEI } from "./types/imei";

// GPSTracker its the server that takes care of the connection with the gps
export class GPSTracker {

    private _units: Map<IMEI, any> = new Map<IMEI, any>();

    constructor(private _interpreter: Interpreter) { }


    public ListenAndTracK(): void {

    }

}