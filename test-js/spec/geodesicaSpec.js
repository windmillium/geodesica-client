var worldData = [{
    "name": "Album A",
    "size": "10x20"
}, {
    "name": "Album B",
    "size": "20x40"
}];

describe("World", function () {

    beforeEach(function () {
        this.world = new World(worldData[0]);
    });

    it("creates from data", function () {
        expect(this.world.get('name')).toEqual('Album A');
    });

});
