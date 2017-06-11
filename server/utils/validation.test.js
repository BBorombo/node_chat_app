var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string value', () => {
        var text = '';

        var res = isRealString(text);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var text = '    ';

        var res = isRealString(text);
        expect(res).toBe(false);
    });

    it('should allow string with non-space characters ', () => {
        var text = 'Room';

        var res = isRealString(text);
        expect(res).toBe(true);
    });
});