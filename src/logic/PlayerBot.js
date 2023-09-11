import Player from "./Player";
import Point from "./Point";

export default (name) => {
    const _bot = Player(name);
    return Object.assign({}, _bot, {
        populate: () => {
            for (let type in _bot.getShipsLeft()) {
                while (_bot.getShipsLeft()[type] > 0) {
                    let _size;
                    switch (type) {
                        case "sm":
                            _size = 2;
                            break;
                        case "md":
                            _size = 3;
                            break;
                        case "lg":
                            _size = 4;
                            break;
                        case "xl":
                            _size = 5;
                            break;
                    }

                    let _direction = Math.floor(Math.random() * 4 + 1);
                    switch (_direction) {
                        case 1:
                            _direction = "up";
                            break;
                        case 2:
                            _direction = "right";
                            break;
                        case 3:
                            _direction = "down";
                            break;
                        case 4:
                            _direction = "left";
                            break;
                    }
                    let _ship;
                    do {
                        const x = Math.floor(Math.random() * 9 + 1);
                        const y = Math.floor(Math.random() * 9 + 1);
                        _ship = _bot.getShip(_size, Point(x, y), _direction);
                    } while (!_ship.isPlaceable);

                    _bot.addShip(
                        _size,
                        _ship.coordinates[0],
                        _direction
                    );
                }
            }
        },
    });
};
