import { expect } from "chai";
import { TrackMessage } from "../../src/models/track-message";
import { GPSEvent } from "../../src/types/events";
import { StringDecoder } from "string_decoder";

describe('tk-interpreter', function () {
    // const decoder: TKInterpreter = new TKInterpreter();

    it('decode CMD', () => {
        var raw = '085a629c834601008600a59b41c760ed5c0bc0d39204201909de41f95a5742001c72e400000000008000ed030101010903570b003000000040110583040d001200001f0c1a03c605004d690b0000416766ed5c0bc0d39204201909de41f95a5742001b72e400000000008000ee030101010903570b003000000040110583040d001200001f0c1a03c605004d690b0000a0';
        const buf2 = Buffer.from(raw, 'hex');
        console.time('test')
        // let imei: any = buf2.slice(0, 8).reverse();
        // let value =parseInt(imei.toString("hex"), 16)
        //imey    
        let value = 0;
        for (let i = 7; i >= 0; i--) {
            value = (value * 256) + buf2[i];

        }
        // console.log(value)
        console.timeEnd('test')

        // Prints: this is a tÃ©st

        // let raw = "af b7 ac 79 f0 3f 01 00 09 00 a5 81 06 d6 7a 76 51 00 f0 f7"
        // let buffer = Buffer.from(raw.split(','),2);
        // // buffer.write(data, "hex")
        // var str = '';
        // for (var i = 0; i < buffer.length; i++) {
        //     if (buffer[i] < 16) {
        //         str += '0';
        //     }
        //     str += buffer[i].toString(16);
        // }

        // console.log(str)
        // expect(decodedMessage.event).equals(GPSEvent.PING);
    });


});