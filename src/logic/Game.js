import Board from "./Board";
import Point from "./Point";

export default () => {
    const _playerBoard = Board();
    let _player;
    let _enemyPlayer;
    let _selectedDirection = 'up';
    let _selectedSize;
    return {
        init: (player, enemyPlayer) => {
            _player = player;
            _enemyPlayer = enemyPlayer;

            // Listen for player input
            player.addShip(3, Point(7, 1), "up");
            player.addShip(3, Point(5, 7), "right");
            player.addShip(4, Point(3, 7), "down");

            // Listen for enemy input
            enemyPlayer.addShip(3, Point(1, 1), "up");
            enemyPlayer.addShip(3, Point(5, 5), "right");
            enemyPlayer.addShip(4, Point(0, 9), "down");
            enemyPlayer.addShip(2, Point(5, 8), "down");
        },
        getPlayerBoard: () => _playerBoard,
        getPlayer: () => _player,
        getEnemyPlayer: () => _enemyPlayer,
        setSize: (size) => {
            if (!size) throw TypeError("A size is expected");
            _selectedSize = size;
        },
        setDirection: (direction) => {
            if (!direction) throw TypeError("A direction is expected");
            _selectedDirection = direction;
        },
        addShip: function (point) {
            if (!point) throw TypeError("A Point is expected");
            _player.addShip(_selectedSize, point, _selectedDirection);
        },
    };
};
