import { expect } from "chai";

import { BalticInterpreter } from "../../src";

describe('baltic-interpreter extract data from raw', function () {
    const decoder: BalticInterpreter = new BalticInterpreter();
    var raw = '085a629c834601008600a59b41c760ed5c0bc0d39204201909de41f95a5742001c72e400000000008000ed030101010903570b003000000040110583040d001200001f0c1a03c605004d690b0000416766ed5c0bc0d39204201909de41f95a5742001b72e400000000008000ee030101010903570b003000000040110583040d001200001f0c1a03c605004d690b0000a0';
    let data = decoder.extracData(Buffer.alloc(raw.length, raw, 'hex'));

    it('extract emei', () => {
        expect(data.imei).equals(359006055062024);
    });

    it('extract date', () => {
        expect(<Date>data.date.toISOString()).equals('2014-03-05T14:03:04.000Z');
    });

    it('extract data to be  17 byte', () => {
        expect(data.data.length).equals(17);
    });


});

describe('baltic-interpreter extract ping data from raw', function () {
    const decoder: BalticInterpreter = new BalticInterpreter();
    var raw = '085a629c834601008600a59b41c760ed5c0bc0d39204201909de41f95a5742001c72e400000000008000ed030101010903570b003000000040110583040d001200001f0c1a03c605004d690b0000416766ed5c0bc0d39204201909de41f95a5742001b72e400000000008000ee030101010903570b003000000040110583040d001200001f0c1a03c605004d690b0000a0';
    let temp = decoder.extracData(Buffer.alloc(raw.length, raw, 'hex'));
    let data = decoder.getPingData(temp.data);
  
    it('extract latitud', () => {
        expect(data.latitude).equals(53.83884048461914);
    });
    it('extract longitud', () => {
        expect(data.longitude).equals(27.75444221496582);
    });
    it('extract speed', () => {
        expect(data.speed).equals(0);
    });
    it('extract orintation', () => {
        expect(data.orientation).equals(228);
    });

   

});