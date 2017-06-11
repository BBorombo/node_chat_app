var expect = require('expect');

var {Users} = require('./users');

describe('addUser', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id:1,
            name: 'Mike',
            room: 'Node Course'
        },{
            id:2,
            name: 'Jen',
            room: 'React Course'
        }, {
            id:3,
            name: 'Julie',
            room: 'Node Course'
        }]
    });

    it('should add new User ', () => {
        var users =  new Users();
        var user = {
            id : 1,
            name: 'Erwan',
            room: 'My Room'
        };

        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var res = users.removeUser(2);
        expect(res.id).toBe(2);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var res = users.removeUser(230);
        expect(res).toNotExist();
    });

    it('should find user', () => {
        var res = users.getUser(2);
        expect(res).toEqual(users.users[1]);
    });

    it('should not find a user', () => {
        var res = users.removeUser(230);
        expect(res).toNotExist();
    });


    it('should return names for node course ', () => {
        var res = users.getUserList('Node Course');
        expect(res).toEqual(['Mike', 'Julie']);
    });


    it('should return names for react course ', () => {
        var res = users.getUserList('React Course');
        expect(res).toEqual(['Jen']);
    });

});