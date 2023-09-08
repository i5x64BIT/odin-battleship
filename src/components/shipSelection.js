export default (game) => {
    const page = document.querySelector(".page-container");

    const container = document.createElement("div");
    container.classList = "ship-selection";

    const directionBtn = document.createElement("button");
    const smBtn = document.createElement("button");
    const mdBtn = document.createElement("button");
    const lgBtn = document.createElement("button");
    const xlBtn = document.createElement("button");

    directionBtn.id = "directionBtn";
    smBtn.id = "smBtn";
    mdBtn.id = "mdBtn";
    lgBtn.id = "lgBtn";
    xlBtn.id = "xlBtn";

    directionBtn.innerText = "🧭";
    smBtn.innerText = "Small";
    mdBtn.innerText = "Medium";
    lgBtn.innerText = "Large";
    xlBtn.innerText = "XL";

    const directionValues = (function () {
        let _data = ["up", "right", "down", "left"];
        let _selected = 0;
        return {
            get: () => _data[_selected],
            next: () => {
                _selected++;
                if (_selected === _data.length) _selected = 0;
            },
        };
    })();
    game.setDirection(directionValues.get());
    directionBtn.addEventListener("click", function () {
        directionValues.next();
        game.setDirection(directionValues.get());
    });
    let selectedSize;
    const clickHandler = function () {
        const siblings = document.querySelectorAll(`.btn:not([${this.id}])`);
        siblings.forEach((s) => s.classList.remove("active"));
        this.classList.add("active");
        switch (this.id) {
            case "smBtn":
                selectedSize = 2;
                break;
            case "mdBtn":
                selectedSize = 3;
                break;
            case "lgBtn":
                selectedSize = 4;
                break;
            case "xlBtn":
                selectedSize = 5;
                break;
            default:
                throw TypeError("Uknown ship type was clicked");
        }
        game.setSize(selectedSize);
    };
    smBtn.onclick =
        mdBtn.onclick =
        lgBtn.onclick =
        xlBtn.onclick =
            clickHandler;
    container.append(smBtn, mdBtn, lgBtn, xlBtn, directionBtn);
    const childArray = Array.from(container.children);
    childArray.forEach((e) => (e.classList = "btn"));
    smBtn.click();
    return container;
};
