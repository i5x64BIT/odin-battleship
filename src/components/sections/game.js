import shipSelection from '../shipSelection';
import gameboard from '../gameboard';

export default (game) => {
    const gameSection = document.createElement('div');
    gameSection.classList = 'game-section'
    const enemyBoard = gameboard(game, "Enemy Sea");
    const playerBoard = gameboard(
        game,
        "My Sea",
        game.getPlayer().getShipsOwned()
    );
    gameSection.append(enemyBoard, playerBoard, shipSelection(game));
    
    return gameSection;
}
