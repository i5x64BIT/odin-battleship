export default () => {
    const page = document.querySelector('.page-container');

    const header = document.createElement("div");
    header.classList = 'header'
    header.innerHTML = "<h1>Haswell's Battleship</h1>";
    page.appendChild(header);
};
