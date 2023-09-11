import Board from "./Board";
import Point from "./Point";
import PubSub from "./PubSub";

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

            _enemyPlayer.populate();
        },
        getPlayerBoard: () => _playerBoard,
        getPlayer: () => _player,
        getEnemyPlayer: () => _enemyPlayer,
        setSize: (size) => {
            if (!size) throw TypeError("A size is expected");
            _selectedSize = size;
        },
        getSize: () => _selectedSize,
        setDirection: (direction) => {
            if (!direction) throw TypeError("A direction is expected");
            _selectedDirection = direction;
        },
        getDirection: () => _selectedDirection,
        addShip: function (point) {
            if (!point) throw TypeError("A Point is expected");
            _player.addShip(_selectedSize, point, _selectedDirection);
            PubSub.publish('shipsChanged');
        },
    };
};
