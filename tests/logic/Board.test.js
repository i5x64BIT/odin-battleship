import Board from "../../src/logic/Board";
import Ship from "../../src/logic/Ship";

describe("Board Creation", () => {
    test("create a board", () => {
        expect(() => Board()).not.toThrow();
        expect(Board()).toBeDefined();
    });
});

let board;
beforeEach(() => (board = Board()));

describe("Getters", () => {
    test("Call getType()", () => expect(board.getType()).toBe("Board"));
    test("Call getShips()", () => expect(board.getShips()).toEqual([]));
    test("Call getHits()", () => expect(board.getHits()).toEqual([]));
});
describe("Add Ship", () => {
    test("Add coordinates to a ship", () => {
        expect(board.addShip(Ship(2), { x: 1, y: 1 }, { x: 1, y: 2 })).toEqual(
            expect.objectContaining({
                coordinates: {
                    start: { x: 1, y: 1 },
                    end: { x: 1, y: 2 },
                },
            })
        );
    });
    test("Add ship to ships array", () => {
        board.addShip(Ship(2), { x: 1, y: 1 }, { x: 3, y: 3 });
        expect(board.getShips()[0]).toBeDefined();
        expect(board.getShips()[0].getSize()).toEqual(2);
        expect(board.getShips()[0].coordinates).toEqual({
            start: { x: 1, y: 1 },
            end: { x: 3, y: 3 },
        });
    });
    test("Throw on no parameters", () => {
        expect(() => board.addShip()).toThrow(TypeError);
    });
    test("Throw on wrong parameter type", () => {
        expect(() => board.addShip({}).toThrow(TypeError));
    });
    test("Throw missing parameter", () => {
        expect(() => board.addShip(Ship(2)).toThrow(TypeError));
    });
    test("Throw on non number values", () => {
        expect(() =>
            board
                .addShip(Ship(2), { x: "1", y: 2 }, { x: "3", y: "3" })
                .toThrow(TypeError)
        );
    });
});
describe("Hits", () => {
    test("Hit the sea", () => {
        board.hit({ x: 1, y: 2 });
        board.hit({ x: 5, y: 5 });
        expect(board.getHits()).toEqual([
            { x: 1, y: 2 },
            { x: 5, y: 5 },
        ]);
    });
    test("Hit a ship", () => {
        board.addShip(Ship(2), { x: 1, y: 1 }, { x: 2, y: 1 });
        board.hit({ x: 1, y: 1 });
        expect(board.getHits()).toEqual([{ x: 1, y: 1 }]);
        expect(board.getShips()[0].getHits()).toBe(1);
    });
    test("Sink a ship", () => {
        board.addShip(Ship(2), { x: 1, y: 1 }, { x: 2, y: 1 });
        board.hit({ x: 1, y: 1 });
        board.hit({ x: 2, y: 1 });
        expect(board.getHits()).toEqual([
            { x: 1, y: 1 },
            { x: 2, y: 1 },
        ]);
        expect(board.getHits().length).toBe(2)
        expect(board.getShips()[0].getHits()).toBe(2);
        expect(board.getShips()[0].getIsSunk()).toBe(true);
    });
});
