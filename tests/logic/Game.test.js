import Game from "../../src/logic/Game";
import Player from "../../src/logic/Player";
import PlayerBot from "../../src/logic/PlayerBot";

let game;
describe("Getters", () => {
    beforeAll(() => {
        game = Game();
        game.init(Player("Player"), PlayerBot("Enemy"));
    });
    test("call getPlayerBoard", () =>
        expect(game.getPlayerBoard().getType()).toBe("Board"));
    test("call getPlayer", () => {
        expect(game.getPlayer().getName()).toBe("Player");
    });
    test("call getEnemyPlayer", () => {
        expect(game.getEnemyPlayer().getName()).toBe("Enemy");
    });
});
describe("call init()", () => {
    beforeAll(() => {
        game = Game();
    });
    test("throw when no parameters", () =>
        expect(() => game.init()).toThrow(TypeError));
    test("throw when wrong type", () => {
        expect(() => game.init(1, 3)).toThrow(TypeError);
        expect(() => game.init("Player", "Enemy")).toThrow(TypeError);
    });
    test("Throw when missing a parameter", () => {
        expect(() => game.init(Player("Joe"))).toThrow(TypeError);
    });
});
