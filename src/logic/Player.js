import Ship from "./Ship";
import Point from "./Point";

export default function (name) {
    if (!name) throw new TypeError("A name is expected");
    let _name = name;
    let _shipsLeft = {
        xl: 1,
        lg: 1,
        md: 2,
        sm: 1,
    };
    let _shipsOwned = [];

    let _occupiedPoints = {
        _data: [],
        add: function (pointsArray) {
            this._data = [...this._data, ...pointsArray];
        },
        get: function () {
            return this._data;
        },
        isOccupied: function (point) {
            this._data.some((p) => p.json() === point.json()) ? true : false;
        },
    };

    return {
        getType: () => "Player",
        getName: () => _name,
        getShipsLeft: () => _shipsLeft,
        getShipsOwned: () => _shipsOwned,
        getOccupied: () => _occupiedPoints.get(),
        addShip: (size, start, direction) => {
            if (!size || typeof size !== "number" || isNaN(size))
                throw new TypeError("A size of type number is expected");
            if (!start || start.getType() !== "Point")
                throw new TypeError("A Point object is expected");
            let type;
            switch (size) {
                case 2:
                    type = "sm";
                    break;
                case 3:
                    type = "md";
                    break;
                case 4:
                    type = "lg";
                    break;
                case 5:
                    type = "xl";
                    break;
                default:
                    throw new RangeError(
                        `Ship size must be between 2-5, ${size} passed`
                    );
            }
            if (!_shipsLeft[type])
                throw new RangeError(
                    `Trying to create many ships of type ${type}.`
                );

            let currentShipPoints = [];
            switch (direction) {
                case "up":
                    for (let i = 0; i < size; i++) {
                        const point = Point(start.getX(), start.getY() + i);
                        if (!_occupiedPoints.isOccupied(point))
                            currentShipPoints.push(point);
                    }
                    break;
                case "down":
                    for (let i = 0; i < size; i++) {
                        const point = Point(start.getX(), start.getY() - i);
                        if (!_occupiedPoints.isOccupied(point))
                            currentShipPoints.push(point);
                    }
                    break;
                case "right":
                    for (let i = 0; i < size; i++) {
                        const point = Point(start.getX() + i, start.getY());
                        if (!_occupiedPoints.isOccupied(point))
                            currentShipPoints.push(point);
                    }
                    break;
                case "left":
                    for (let i = 0; i < size; i++) {
                        const point = Point(start.getX() - i, start.getY());
                        if (!_occupiedPoints.isOccupied(point))
                            currentShipPoints.push(point);
                    }
                    break;
                default:
                    throw TypeError(
                        `Direction must be up, down, right or left. ${direction} passed`
                    );
            }

            _occupiedPoints.add(currentShipPoints);
            const newShip = Object.assign({}, Ship(size), {
                coordinates: currentShipPoints,
            });
            _shipsLeft[type]--;
            _shipsOwned.push(newShip);
        },
    };
}
