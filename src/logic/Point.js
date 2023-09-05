export default (x, y) => {
    if (typeof x !== "number" || typeof y !== "number" || isNaN(x) || isNaN(y)) {
        throw new TypeError("Number arguments are expected");
    }
    
    if (x < 0 || x > 10 || y < 0 || y > 10)
        throw new RangeError(
            "x and y coordinates are required to be between 0-10"
        );
    
    const _x = x;
    const _y = y;

    return { getX: () => _x, getY: () => _y, getType: () => 'Point' };
};
