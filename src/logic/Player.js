export default function(name){
    if(!name) throw new TypeError('A name is expected')
    const _type = 'Player';
    let _name = name;
    let _shipsLeft = {
        lg: 1,
        md: 2,
        sm: 1
    }
    let _shipsOwned = [];

    return {
        getType: () => _type,
        getName: () => _name,
        getShipsLeft: () => _shipsLeft,
        getShipsOwned: () => _shipsOwned,
        addShip: (ship, type) => {
            if(!type) throw new TypeError('A ship object and a type is expected')
            if(_shipsLeft[type] === undefined) throw new TypeError(`Expected type: lg, md, sm. ${type} passed`);
            if(_shipsLeft[type] === 0) throw new RangeError(`The limit of ${type} was reached, please try another`);
            if(!ship.getType || ship.getType() !== 'Ship') throw new TypeError(`A ship object is expected, ${typeof ship} passed`);

            ship.type = type;
            _shipsLeft[type]--;
            _shipsOwned.push(ship);
        }
    };
}