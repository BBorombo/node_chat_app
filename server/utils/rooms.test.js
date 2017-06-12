var expect = require('expect');

var {Rooms} = require('./rooms');

describe('Handle rooms', () => {
    var rooms;
    beforeEach(() => {
        rooms = new Rooms();
        rooms.rooms = [{
            idName: 'rooma',
            name: 'RoomA'
        }, {
            idName: 'nodecourse',
            name: 'Node Course'
        }, {
            idName: 'salondespds',
            name: 'Salon des pds'
        }]
    });

    it('should add a new Room  ', () => {
        var rooms =  new Rooms();
        var room = {
            idName: 'my room',
            name: 'My Room'
        };

        var res = rooms.addRoom('My Room');
        expect(rooms.rooms.length).toBe(1);
        expect(res.name).toEqual(room.name);
        expect(res.idName).toEqual(room.idName);
    });

});