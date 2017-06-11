var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Me';
        var text = 'Hello';

        var res = generateMessage(from,text);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from,text});

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Me';
        var latitude = 1;
        var longitude = 1;
        var url = 'https://www.google.com/maps?q=1,1';

        var res = generateLocationMessage(from,longitude, latitude);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from,url});

    });
});