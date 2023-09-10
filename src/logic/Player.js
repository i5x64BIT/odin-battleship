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
            if (pointsArray.length > 0 && this.isOccupied(pointsArray)) {
                throw RangeError(
                    "Some of the ships points are already occupied"
                );
            }
            this._data = [...this._data, ...pointsArray];
        },
        get: function () {
            return this._data;
        },
        isOccupied: function (pointsArray) {
            for (let point of pointsArray) {
                const a = this._data.some((p) => p.json() === point.json());
                if (a) return a;
            }
        },
    };

    return {
        getType: () => "Player",
        getName: () => _name,
        getShipsLeft: () => _shipsLeft,
        getShipsOwned: () => _shipsOwned,
        getOccupied: () => _occupiedPoints.get(),
        getShip: (size, start, direction) => {
            let isPlaceable;
            let currentShipPoints = [];
            if (!size || typeof size !== "number" || isNaN(size))
                throw new TypeError("A size of type number is expected");
            if (!start || start.getType() !== "Point")
                throw new TypeError("A Point object is expected");

            switch (direction) {
                case "up":
                    for (let i = 0; i < size; i++) {
                        if (start.getY() + i > 9) break;
                        const point = Point(start.getX(), start.getY() + i);
                        currentShipPoints.push(point);
                    }
                    break;
                case "down":
                    for (let i = 0; i < size; i++) {
                        if (start.getY() - i < 0 ) break;
                        const point = Point(start.getX(), start.getY() - i);
                        currentShipPoints.push(point);
                    }
                    break;
                case "right":
                    for (let i = 0; i < size; i++) {
                        if (start.getX() + i > 9 ) break;
                        const point = Point(start.getX() + i, start.getY());
                        currentShipPoints.push(point);
                    }
                    break;
                case "left":
                    for (let i = 0; i < size; i++) {
                        if (start.getX() - i < 0 ) break;
                        const point = Point(start.getX() - i, start.getY());
                        currentShipPoints.push(point);
                    }
                    break;
                default:
                    throw TypeError(
                        `Direction must be up, down, right or left. ${direction} passed`
                    );
            }
            isPlaceable =
                !_occupiedPoints.isOccupied(currentShipPoints) &&
                currentShipPoints.length === size;
            const newShip = Object.assign({}, Ship(size), {
                coordinates: currentShipPoints,
                isPlaceable,
            });
            return newShip;
        },
        addShip: function (size, start, direction) {
            const newShip = this.getShip(size, start, direction);
            if(!newShip.isPlaceable){
                throw new RangeError("Ship is exceeding the board or colliding with another ship, please start, direction and size")
            }
            if (!newShip.isPlaceable) return;
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

            _occupiedPoints.add(newShip.coordinates);
            _shipsLeft[type]--;
            _shipsOwned.push(newShip);
        },
    };
}
