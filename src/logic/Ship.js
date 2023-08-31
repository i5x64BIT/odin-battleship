export default function (size) {
    if (!size) {
        throw new RangeError("Ship.js: Missing ship size");
    }
    if(typeof size !== 'number') throw new TypeError(`Ship.js: size should be of type number. ${typeof size} passed`)
    if (size > 4)
        throw new RangeError(
            `Shipt.js: The size can be 2-4, ${size} is too big`
        );
    if (size < 2)
        throw new RangeError(
            `Shipt.js: The size can be 2-4, ${size} is too small`
        );
    const _type = 'Ship';
    const _size = size;
    let _hits = 0;
    let _isSunk = false;
    return {
        getType: () => _type,
        getSize: () => _size,
        getHits: () => _hits,
        getIsSunk: () => _isSunk,
        hit: function () {
            _hits++;
            if (_hits === _size) _isSunk = true;
        },
        
    };
}
