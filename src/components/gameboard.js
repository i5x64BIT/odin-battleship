import Point from "../logic/Point";
import PubSub from "../logic/PubSub";

export default (game, title, ships) => {
    const page = document.querySelector(".page-container");

    const container = document.createElement("div");
    container.classList = "board-container";
    const titleDiv = document.createElement("h3");
    titleDiv.innerText = title;
    titleDiv.classList = "board-title";

    const board = document.createElement("div");
    board.classList = "board";

    if(!ships){

    } else{
        PubSub.subscribe("enemyShot", () => {
            const enemyShots = game.getEnemyBoard().getShots();
            const latestShot = enemyShots[enemyShots.length - 1];

            board.querySelector(`[x="${latestShot.getX()}"][y="${latestShot.getY()}"]`)
                .classList.add('enemy-shot')
        });
    }
    for (let y = 9; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            const newPoint = document.createElement("div");
            newPoint.setAttribute("x", x);
            newPoint.setAttribute("y", y);
            newPoint.classList = "board-item";

            if (!ships) {
                container.style.visibility = "hidden";
                PubSub.subscribe("gameStarted", () => {
                    container.style.visibility = "visible";
                });
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
                        PubSub.publish("userShot");
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
                            classToAdd = "player-placeable";
                        } else {
                            classToAdd = "player-occupied";
                        }
                        boardItem.classList.add(classToAdd);
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
