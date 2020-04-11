import { Interpreter } from "./interpreter.interface";

export class TKInterpreter implements Interpreter {
    Decode(bytesF: string): import("../models/track-message").TrackMessage {
        throw new Error("Method not implemented.");
    }

}