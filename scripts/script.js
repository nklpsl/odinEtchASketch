let sideLength = 16;

const gridContainer = document.getElementById('gridContainer');

function createGrid() {
    for(let i = 0; i < sideLength * sideLength; i++){
        let newDiv = document.createElement('div');
        gridContainer.appendChild(newDiv);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`;
}

createGrid();