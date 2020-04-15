import { expect } from "chai";
import { TKInterpreter } from "../../src";
import { TrackMessage } from "../../src/models/track-message";
import { GPSEvent } from "../../src/types/events";

describe('tk-interpreter', function () {
    const decoder: TKInterpreter = new TKInterpreter();
    const message: string = `013612345678BR00080612A2232.9828N11404.9297E000.0022828000.0000000000L000230AA`;
    const decodedMessage: TrackMessage = decoder.Decode(Buffer.alloc(message.length, message));

    it('decode CMD', () => {
        expect(decodedMessage.event).equals(GPSEvent.PING);
    });

    it('decode IMEI', () => {
        expect(decodedMessage.IMEI).equals("13612345678");
    });

    it('decode Ping Data should be null', () => {
        expect(decodedMessage.pingData).not.equals(null);
    });
});