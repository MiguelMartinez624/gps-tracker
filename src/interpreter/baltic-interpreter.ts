import { Interpreter } from "./interpreter.interface";
import { TrackMessage } from "../models/track-message";


// BalticInterpreter implementation for a BalticInterprter GPS
export class BalticInterpreter implements Interpreter {
    Decode(bytesF: string[]): TrackMessage {
        throw new Error("Method not implemented.");
    }

}