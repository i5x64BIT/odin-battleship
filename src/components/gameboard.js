import Point from "../logic/Point";

export default (game, title, ships) => {
    const page = document.querySelector(".page-container");

    const container = document.createElement("div");
    container.classList = "board-container";
    const titleDiv = document.createElement("h3");
    titleDiv.innerText = title;
    titleDiv.classList = "board-title";

    const board = document.createElement("div");
    board.classList = "board";

    for (let y = 9; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            const newPoint = document.createElement("div");
            newPoint.setAttribute("x", x);
            newPoint.setAttribute("y", y);
            newPoint.classList = "board-item";

            if (!ships) {
                newPoint.addEventListener(
                    "click",
                    function () {
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
                    },
                    { once: true }
                );
            } else {
                let classToAdd;
                newPoint.addEventListener("mouseover", () => {
                    const tmpShip = game
                        .getPlayer()
                        .getShip(
                            game.getSize(),
                            Point(x, y),
                            game.getDirection()
                        );
                    for (let point of tmpShip.coordinates) {
                        const boardItem = board.querySelector(
                            `[x="${point.getX()}"][y="${point.getY()}"]`
                        );
                        if (tmpShip.isPlaceable) {
<<<<<<< HEAD
<<<<<<< HEAD
                            classToAdd = "player-placeable";
                            boardItem.classList.add(classToAdd);
                        } else {
                            classToAdd = "player-occupied";
=======
                            classToAdd = "player-occupied";
                            boardItem.classList.add(classToAdd);
                        } else {
                            classToAdd = "player-placeable";
>>>>>>> 348699c (Add board hover)
=======
                            classToAdd = "player-placeable";
                            boardItem.classList.add(classToAdd);
                        } else {
                            classToAdd = "player-occupied";
>>>>>>> 0905635 (Fix hover)
                            boardItem.classList.add(classToAdd);
                        }
                    }
                });
                newPoint.addEventListener("mouseout", () => {
                    const items = board.querySelectorAll(".board-item");
                    items.forEach((item) => item.classList.remove(classToAdd));
                });
                newPoint.addEventListener("click", function () {
                    game.addShip(Point(x, y));
                });
                if (
                    game
                        .getPlayer()
                        .getOccupied()
                        .find((e) => e.getX() === x && e.getY() === y)
                ) {
                    newPoint.classList.add("player-ship");
                }
            }
            board.appendChild(newPoint);
        }
    }
    container.append(titleDiv, board);
    return container;
};
