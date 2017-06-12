class Rooms {

    constructor() {
        this.rooms = [];
    }

    addRoom(name){
        var room = {
            idName: Rooms.nameToId(name),
            name
        };
        this.rooms.push(room);
        return room;
    }

    getRoomName(idName){
        var room = this.rooms.filter((room)  => room.idName = idName)[0];
        return room.idName;
    }

    getRoom(id){
        return this.rooms.filter((room)  => room.idName = id)[0];
    }

    static nameToId(name){
        return name.trim().toLowerCase();
    }

}

module.exports = {Rooms};