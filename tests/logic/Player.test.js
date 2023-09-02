import Player from "../../src/logic/Player";
import Ship from "../../src/logic/Ship";

describe("Create a player", () => {
    test("no parameters passed", () => {
        expect(() => Player()).toThrow(TypeError);
    });
    test("get player name", () => {
        expect(Player("Joe").getName()).toEqual("Joe");
    });
});
describe('Test Getters', () => {
    let player = Player('Joe');
    test('Get type', () => expect(player.getType()).toBe('Player'))
    test('Get ships left', () => {
        expect(player.getShipsLeft()).toEqual({
            lg: 1,
            md: 2,
            sm: 1
        })
    })
    test('Get ships owned', () => {
        expect(player.getShipsOwned()).toEqual([])
    })
});
describe("Add a ship", () => {
    let player;
    beforeEach(() => {
        player = Player("Joe");
    });
    test("Add a ship", () => {
        player.addShip(Ship(4), 'lg');
        expect(player.getShipsOwned()[0]).toEqual(expect.objectContaining({ type:"lg" }))
        expect(player.getShipsLeft()).toEqual({
            lg:0,
            md:2,
            sm:1
        });
    });
    test("Throw when no parameters", () => {
        expect(() => {
            player.addShip();
        }).toThrow(TypeError);
    });
    test("Throw when missing a type", () => {
        expect(() => {
            player.addShip(Ship(2));
        }).toThrow(TypeError);
    });
    test("Throw when missing a ship", () => {
        expect(() => {
            player.addShip('lg');
        }).toThrow(TypeError);
    });
    test("Throw when wrong type", () => {
        expect(() => {
            player.addShip(Ship(2), 'large');
        }).toThrow(TypeError);
    });
    test("Throw when the object passed isn't a ship", () => {
        expect(() => {
            player.addShip({ size: 10 }, 'lg');
        }).toThrow(TypeError);
    });
});
