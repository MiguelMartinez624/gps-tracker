import { expect } from "chai";

import { BalticInterpreter } from "../../src";
import { GPSEvent } from "../../src/types/events";

describe('baltic-interpreter extract data from raw', function () {
    const decoder: BalticInterpreter = new BalticInterpreter();
    var raw = '085a629c834601008600a59b41c760ed5c0bc0d39204201909de41f95a5742001c72e400000000008000ed030101010903570b003000000040110583040d001200001f0c1a03c605004d690b0000416766ed5c0bc0d39204201909de41f95a5742001b72e400000000008000ee030101010903570b003000000040110583040d001200001f0c1a03c605004d690b0000a0';
    let decodedMessage = decoder.Decode(Buffer.alloc(raw.length, raw, 'hex'));

    it('decode CMD', () => {

        expect(decodedMessage.event).equals(GPSEvent.PING);
    });

    it('decode IMEI', () => {

        expect(decodedMessage.IMEI).equals(359006055062024);
    });

    it('decode Ping Data should be null', () => {

        expect(decodedMessage.pingData).not.equals(null);
    });


});

