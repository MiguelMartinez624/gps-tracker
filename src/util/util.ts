
/**
 * Util utilities func 
 */
export class Util {

    public static HexToIEEE754(data: Buffer): any {
        let array = new Uint8Array(data);
        let view = new DataView(array.buffer);

        return view.getFloat32(0, false);
    }

    public static HexToInt(array: Buffer): number {
        let value = 0;
        for (let i = array.length - 1; i >= 0; i--) {
            value = (value * 256) + array[i];

        }
        return value;
    }

    public static HexToDate(array: Buffer): Date {

        let str = array.reverse().toString('hex').slice(0, 7);
        let value: number = parseInt('0x' + str) * 2 + 1199145600;

        return new Date(value * 1000);
    }

    public static MinuteToDecimal(pos: number, pos_i: string): number {
        if (typeof (pos_i) === 'undefined') pos_i = 'N';
        var dg = pos / 100;
        var minutes = pos - (dg * 100);
        var res = (minutes / 60) + dg;
        return (pos_i.toUpperCase() === 'S' || pos_i.toUpperCase() === 'W') ? res * -1 : res;
    }
}