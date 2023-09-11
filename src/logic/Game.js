import Board from "./Board";
import Point from "./Point";
import PubSub from "./PubSub";

export default () => {
    const _playerBoard = Board();
    const _enemyBoard = Board();
    let _player;
    let _enemyPlayer;
    let _selectedDirection = "up";
    let _selectedSize;
    return {
        init: (player, enemyPlayer) => {
            _player = player;
            _enemyPlayer = enemyPlayer;

            _enemyPlayer.populate();

            const shipsLeft = _player.getShipsLeft();
            const totalShips = Object.keys(shipsLeft).reduce(
                (total, key) => total + shipsLeft[key],
                0
            );
            // Wait for player action
            const callback = function () {
                if (_player.getShipsOwned().length === totalShips) {
                    PubSub.publish("gameStarted");

                    PubSub.subscribe("userShot", () => {
                        let point;
                        do {
                            const x = Math.floor(Math.random() * 9 + 1);
                            const y = Math.floor(Math.random() * 9 + 1);
                            point = Point(x, y);
                            console.log(console.log(point.json()));
                        } while (
                            _enemyBoard
                                .getShots()
                                .some((p) => p.json() === point.json())
                        );

                        _enemyBoard.shoot(_player, point);
                        PubSub.publish('enemyShot');
                    });
                } else {
                    continueTimeout = setTimeout(callback, 500);
                }
            };
            let continueTimeout = setTimeout(callback, 500);
        },
        getPlayerBoard: () => _playerBoard,
        getPlayer: () => _player,
        getEnemyPlayer: () => _enemyPlayer,
        getEnemyBoard: () => _enemyBoard,
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
            PubSub.publish("shipsChanged");
        },
    };
};
