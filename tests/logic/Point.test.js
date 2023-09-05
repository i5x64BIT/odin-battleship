import Point from "../../src/logic/Point";

describe('Create Point', () => {
    const point = Point(1, 3);

    test('call getX() and getY()', () => {
        expect(point.getX()).toBe(1);
        expect(point.getY()).toBe(3);
    })
    test('call getType()', () => {
        expect(point.getType()).toBe('Point')
    })
})
describe("Point Errors", () => {
    test('throw when no arguments', () => {
        expect(() => Point()).toThrow(TypeError);
    });
    test("throw when wrong types", () => {
        expect(() => Point("1", 2)).toThrow(TypeError);
        expect(() => Point(1, "2")).toThrow(TypeError);
        expect(() => Point(1, NaN)).toThrow(TypeError);
        expect(() => Point(NaN, 2)).toThrow(TypeError);
    });
    test("throw when high numbers", () => {
        expect(() => Point(Infinity, 2)).toThrow(RangeError);
        expect(() => Point(1, Infinity)).toThrow(RangeError);
    });
    test("throw when low numbers", () => {
        expect(() => Point(-Infinity, 2)).toThrow(RangeError);
        expect(() => Point(1, -Infinity)).toThrow(RangeError);
    });
});