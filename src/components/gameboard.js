import Point from "../logic/Point";

export default (game, title, ships) => {
    const page = document.querySelector(".page-container");

    const titleDiv = document.createElement("h3");
    titleDiv.innerText = title;
    titleDiv.classList = "board-title";

    const board = document.createElement("div");
    board.classList = "board";

    for (let y = 9; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            const newPoint = document.createElement("div");
            newPoint.setAttribute("data-coordinates", `{"x":${x}, "y":${y}}`);
            newPoint.classList = "board-item";

            if (!ships) {
                newPoint.addEventListener("click", function () {
                    if (
                        game
                            .getPlayerBoard()
                            .shoot(game.getEnemyPlayer(), Point(x, y))
                    ) {
                        this.classList.add("player-hit");
                    } else {
                        this.classList.add("player-missed");
                    }
                    this.innerText = "X";
                });
            } else {
                const playerShipCoordinates = ships.reduce(
                    (pointsArray, ship) => {
                        return [...pointsArray, ...ship.coordinates];
                    },
                    []
                );

                if (playerShipCoordinates.length > 0) {
                    if (
                        playerShipCoordinates.find(
                            (e) => e.getX() === x && e.getY() === y
                        )
                    ) {
                        newPoint.classList.add("player-ship");
                    }
                }
            }
            board.appendChild(newPoint);
        }
    }
    page.appendChild(titleDiv);
    page.appendChild(board);
};
