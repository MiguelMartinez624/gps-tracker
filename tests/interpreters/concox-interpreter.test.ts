import { expect } from "chai";

import { ConcoxInterpreter } from "../../src";
import { GPSEvent } from "../../src/types/events";

describe('concex-interpreter login Command', function () {
    const decoder: ConcoxInterpreter = new ConcoxInterpreter();
    let msg = decoder.Decode(Buffer.alloc(255, "78780D01012345678901234500018CDD0D0A", 'hex'));

    it('command should be  Login Request', () => {

        expect(msg.event).equals(GPSEvent.LOGIN_REQUEST);
    });

    it('command should contain a EMEI', () => {

        expect(msg.IMEI).equals(123456789012345);
    });


});


describe('concex-interpreter ping (Location Data) Command', function () {
    const decoder: ConcoxInterpreter = new ConcoxInterpreter();
    let raw = "78781f12100906120d08cb002bf2e80c2d3ed00cd07301fe0a475500c49c02866b110d0a".trim()
    let buffer = Buffer.alloc(raw.length, raw, 'hex');
    const msg = decoder.Decode(buffer);
   
    it('command should be Ping', () => {

        expect(msg.event).equals(GPSEvent.PING);
    });
    it('command contain Date', () => {

        expect(msg.pingData.date).equals("2016-9-6 18:13:8");
    });
});

