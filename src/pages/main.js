import header from "../components/header";
import gameboard from "../components/gameboard";
export default function (game) {
    header();
    gameboard(game, 'Enemy Sea');
    gameboard(game, "My Sea", game.getPlayer().getShipsOwned());
}
