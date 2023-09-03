export default function () {
    const _type = "Board";
    let _ships = [];
    let _hits = [];
    const _checkBounds = (point) => {
        if (point.x < 0 || point.x > 10 || point.y < 0 || point.y > 10)
            throw new RangeError(
                "x and y coordinates are required to be between 0-10"
            );
    };
    const _traverseShip = (ship, point) => {
        // Works on traditional ships, no diagonals
        if (JSON.stringify(ship.coordinates.start) === JSON.stringify(point)) {
            ship.hit();
            return;
        }
        for (
            let i = ship.coordinates.start.x;
            i <= ship.coordinates.end.x;
            i++
        ) {
            if (
                JSON.stringify({
                    x: i,
                    y: ship.coordinates.start.y,
                }) === JSON.stringify(point)
            ) {
                ship.hit();
                return;
            }
        }
        for (
            let i = ship.coordinates.start.y;
            i <= ship.coordinates.end.y;
            i++
        ) {
            if (
                JSON.stringify({
                    x: ship.coordinates.start.x,
                    y: i,
                }) === JSON.stringify(point)
            ) {
                ship.hit();
                return;
            }
        }
    };
    return {
        getType: () => _type,
        getShips: () => _ships,
        getHits: () => _hits,
        addShip: function (ship, start, end) {
            if (arguments.length < 3)
                throw new TypeError(
                    "A ship, start coordinates and end coordinates are expected. for example: (Ship(2), { x:1, y:1 }, { x:1, y:2 })"
                );
            if (ship.getType() != "Ship")
                throw new RangeError(
                    `A ship is expected, ${typeof ship} passed`
                );
            _checkBounds(start);
            _checkBounds(end);
            const newShip = Object.assign({}, ship, {
                coordinates: { start, end },
            });
            _ships.push(newShip);
            return newShip;
        },
        hit: (point) => {
            _checkBounds(point);
            _hits.push(point);
            _ships.forEach((ship) => {
                _traverseShip(ship, point);
            });
        },
    };
}
