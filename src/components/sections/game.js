import gameboard from '../gameboard';
import shipSelection from "../shipSelection";
import PubSub from '../../logic/PubSub';


export default (game) => {
    const gameSection = document.createElement('div');
    gameSection.classList = 'game-section'
    const enemyBoard = gameboard(game, "Enemy Sea");
    let playerBoard = gameboard(
        game,
        "My Sea",
        game.getPlayer().getShipsOwned()
    );

    gameSection.append(enemyBoard, playerBoard, shipSelection(game));
    
    const redrawBoard = () => {
        const newBoard = gameboard(
            game,
            "My Sea",
            game.getPlayer().getShipsOwned()
        );
        gameSection.replaceChild(newBoard, playerBoard);
        playerBoard = newBoard;
    };

    PubSub.subscribe("shipsChanged", redrawBoard);

    return gameSection;
}
