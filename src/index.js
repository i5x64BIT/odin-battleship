import "./style.css";
import main from "./pages/main";
import Game from "./logic/Game";
import Player from "./logic/Player";

const game = Game();
const player = Player("Joe");
const enemy = Player("AI");

game.init(player, enemy);

main(game);
