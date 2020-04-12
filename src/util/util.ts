
/**
 * Util utilities func 
 */
export class Util {

    public static HexToInt(array: Buffer): number {
        let value = 0;
        for (let i = array.length - 1; i >= 0; i--) {
            value = (value * 256) + array[i];

        }
        return value;
    }

    public static MinuteToDecimal(pos: number, pos_i: string): number {
        if (typeof (pos_i) === 'undefined') pos_i = 'N';
        var dg = pos / 100;
        var minutes = pos - (dg * 100);
        var res = (minutes / 60) + dg;
        return (pos_i.toUpperCase() === 'S' || pos_i.toUpperCase() === 'W') ? res * -1 : res;
    }
}