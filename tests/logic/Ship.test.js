import Ship from "../../src/logic/Ship";

describe("Ship creation", () => {
    test("Create ship with correct integer size", () =>
        expect(Ship(2).getSize()).toEqual(2));
    test("Throw error when no arguments passed", () =>
        expect(() => Ship()).toThrow(RangeError));
    test("Create ship with a non integer passed", () => {
        expect(() => Ship("Hello")).toThrow(TypeError);
        expect(() => Ship("2")).toThrow(TypeError);
        expect(() => Ship(true)).toThrow(TypeError);
    });
    test("Create ship with large size", () => {
        expect(() => Ship(100).toThrow(RangeError));
    });
    test("Create ship with negative size", () => {
        expect(() => Ship(-2)).toThrow(RangeError);
    });
    test("Create ship with NaN and it's counterparts", () => {
        expect(() => Ship(NaN)).toThrow(RangeError);
        expect(() => Ship(Infinity)).toThrow(RangeError);
        expect(() => Ship(-Infinity)).toThrow(RangeError);
    });
});
describe('Ship type', () => {
    test('get type', ()=> expect(Ship(2).getType()).toBe('Ship'))
})
describe("Ship hit function", () => {
    let ship;
    beforeEach(() => {
        ship = Ship(2);
    });
    test('isSunk is set to false by default', () => {
        expect(ship.getIsSunk()).toBe(false);
    })
    test("hit function adds to hits size", () => {
        expect(ship.getHits()).toEqual(0);
        ship.hit();
        expect(ship.getHits()).toEqual(1);
    });
    test("hit function changes isSunk", () => {
        ship.hit();
        ship.hit();
        expect(ship.getIsSunk()).toEqual(true);
    });
});
