import Board from "../../src/logic/Board";
import Player from "../../src/logic/Player";
import Point from "../../src/logic/Point";

describe("Board Creation", () => {
    test("create a board", () => {
        expect(() => Board()).not.toThrow();
        expect(Board()).toBeDefined();
    });
});

let board;
let enemyPlayer;

beforeEach(() => {
    board = Board();
    enemyPlayer = Player("Joe");
    enemyPlayer.addShip(2, Point(1, 1), "up");
});

describe("Getters", () => {
    test("Call getType()", () => expect(board.getType()).toBe("Board"));
    test("Call getShots()", () => expect(board.getShots()).toEqual([]));
});
describe("Shots", () => {
    beforeEach(() => {});
    test("Update shots", () => {
        board.shoot(enemyPlayer, Point(1, 1));
        board.shoot(enemyPlayer, Point(1, 1));
        expect(board.getShots().length).toBe(2);
    });
    test("Hit a ship", () => {
        board.shoot(enemyPlayer, Point(1, 1));
        expect(enemyPlayer.getShipsOwned()[0].getHits()).toBe(1);
    });
    test("Sink a ship", () => {
        board.shoot(enemyPlayer, Point(1, 1));
        board.shoot(enemyPlayer, Point(1, 2));
        expect(enemyPlayer.getShipsOwned()[0].getIsSunk()).toBe(true);
    });
});
describe("Shot errors", () => {
    test("shoot() with no arguments", () => {
        expect(() => board.shoot()).toThrow(TypeError);
    });
    test("shoot() with wrong types", () => {
        expect(() => board.shoot("{}", Point(1, 1))).toThrow(TypeError);
        expect(() => board.shoot(enemyPlayer, "{ x: 1, y: 1 }")).toThrow(
            TypeError
        );
        expect(() => board.shoot(enemyPlayer, { x: 1, y: 1 })).toThrow(
            TypeError
        );
        expect(() => board.shoot(Board(), Point(1, 1))).toThrow(TypeError);
    });
    test("shoot() with wrong points", () => {
        expect(() => board.shoot()).toThrow(TypeError);
    });
});
