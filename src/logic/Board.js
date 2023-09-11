export default function () {
    const _type = "Board";
    let _shots = [];
    let _hits = 0;
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
                        enemyShip.coordinates[i].json() ===
                        point.json()
                    ) {
                        enemyShip.hit();
                        _hits++;
                        return true;
                    }
                }
            }
            return false;
        },
        getHits: () => _hits,
    };
}
