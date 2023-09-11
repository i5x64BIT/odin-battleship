import "./style.css";
import main from "./pages/main";
import Game from "./logic/Game";
import Player from "./logic/Player";
import PlayerBot from "./logic/PlayerBot";

const game = Game();
const player = Player("Joe");
const enemy = PlayerBot("AI");

game.init(player, enemy);
game.start();

main(game);
