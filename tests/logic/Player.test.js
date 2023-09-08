import Player from "../../src/logic/Player";
import Point from "../../src/logic/Point";

describe("Create a player", () => {
    test("no parameters passed", () => {
        expect(() => Player()).toThrow(TypeError);
    });
    test("get player name", () => {
        expect(Player("Joe").getName()).toEqual("Joe");
    });
});
describe("Test Getters", () => {
    let player = Player("Joe");
    test("Get type", () => expect(player.getType()).toBe("Player"));
    test("Get ships left", () => {
        expect(player.getShipsLeft()).toEqual({
            xl: 1,
            lg: 1,
            md: 2,
            sm: 1,
        });
    });
    test("Get ships owned", () => {
        expect(player.getShipsOwned()).toEqual([]);
    });
});

describe("Add a ship effects", () => {
    let player;
    beforeEach(() => {
        player = Player("Joe");
        player.addShip(4, Point(1, 5), "up");
    });
    test("subtract from shipsLeft", () => {
        expect(player.getShipsLeft()).toEqual({
            xl: 1,
            lg: 0,
            md: 2,
            sm: 1,
        });
    });
    test("add a ship with coordinates to ownedShips", () => {
        expect(player.getShipsOwned()[0].coordinates).toBeDefined();
        expect(player.getShipsOwned()[0].coordinates[0].getY()).toBe(5);
        expect(player.getShipsOwned()[0].coordinates[3].getY()).toBe(8);
    });
});
describe("Add a ship errors", () => {
    let player;
    beforeEach(() => (player = Player("Joe")));

    test("Throw when no parameters", () => {
        expect(() => {
            player.addShip();
        }).toThrow(TypeError);
    });
    test("Throw when types are wrong", () => {
        expect(() => {
            player.addShip("4", Point(1,5), "up");
        }).toThrow(TypeError);
        expect(() => {
            player.addShip(4, { x: 1, y: 5 }, "up");
        }).toThrow(TypeError);
        expect(() => {
            player.addShip(4, Point(1, 5), NaN);
        }).toThrow(TypeError);
    });
    test("Throw when size to big", () => {
        expect(() => {
            player.addShip(10, Point(1,5), "up");
        }).toThrow(RangeError);
    });
    test("Throw when argument's content not expected", () => {
        expect(() => {
            player.addShip(4, Point(1, 5), "LEFT");
        }).toThrow(TypeError);
    });
    test("Throw when end index is overflowing the board", () => {
        expect(() => {
            player.addShip(4, Point(99, 99), "up");
        }).toThrow(RangeError);
        expect(() => {
            player.addShip(4, Point(99, 99), "right");
        }).toThrow(RangeError);
    })
    test("Throw when end index is below zero", () => {
        expect(() => {
            player.addShip(4, Point(0, 0), "down");
        }).toThrow(RangeError);
        expect(() => {
            player.addShip(4, Point(0, 0), "left");
        }).toThrow(RangeError);
    });
    test("Throw on overlaping ships", () => {
        expect(() => {
            player.addShip(3, Point(1, 1), "up");
            player.addShip(3, Point(1, 1), "right");
        }).toThrow(RangeError);
        expect(() => {
            player.addShip(3, Point(7, 6), "up");
            player.addShip(3, Point(5, 7), "right");
        }).toThrow(RangeError)
    })
    test("Throw when adding more ships then specified", () => {
        expect(() => {
            player.addShip(2, Point(0, 0), "up");
            player.addShip(2, Point(1, 0), "up");
            player.addShip(2, Point(3, 0), "up");
        }).toThrow(RangeError)
    })
});
