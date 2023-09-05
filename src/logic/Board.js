export default function () {
    const _type = "Board";
    let _shots = [];

    return {
        getType: () => _type,
        getShots: () => _shots,
        shoot: (enemyPlayer, point) => {
            if (!enemyPlayer || enemyPlayer.getType() !== "Player")
                throw new TypeError(
                    `A Player object is expected, ${enemyPlayer} passed`
                );
            if (!point || point.getType() !== "Point")
                throw new TypeError("A Point object is required");
            
            _shots.push(point);
            for (let enemyShip of enemyPlayer.getShipsOwned()) {
                for (let i = 0; i < enemyShip.getSize(); i++) {
                    if (
                        JSON.stringify(enemyShip.coordinates[i]) ===
                        JSON.stringify(point)
                    ) {
                        enemyShip.hit();
                        return true;
                    }
                }
            }
            return false;
        },
    };
}
