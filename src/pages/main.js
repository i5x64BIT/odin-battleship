import header from "../components/sections/header";
import battleship from '../components/sections/game'

export default function (game) {
    const page = document.querySelector('.page-container');

    page.append(header(), battleship(game));
}
