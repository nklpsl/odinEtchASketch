const gridContainer = document.getElementById('gridContainer');
const black = document.getElementById('black');
const white = document.getElementById('white');
const randomColor = document.getElementById('randomColor');
const brushColorInput = document.getElementById('brushColorInput');
const backgroundColorInput = document.getElementById('backgroundColorInput');
const size16 = document.getElementById('size16');
const size32 = document.getElementById('size32');
const size8 = document.getElementById('size8');
const eraser = document.getElementById('eraser');
const toggleBorder = document.getElementById('toggleBorder');
const clear = document.getElementById('clear');

let sideLength = 16;
let currentColor = '#000000';
let backgroundColor = 'rgb(255, 255, 255)';
let paintOnHover = false;
let randomColorBrush = false;
let currentButton = black;
let currentSize = size16

function createGrid() {
    gridContainer.innerHTML ="";
    for(let i = 0; i < sideLength * sideLength; i++){
        let newDiv = document.createElement('div');
        newDiv.style.backgroundColor = backgroundColor;
        newDiv.addEventListener('mouseover', paintBackground);
        gridContainer.appendChild(newDiv);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`;
}

function paintBackground (e) {
    if(paintOnHover){
        e.target.style.backgroundColor = currentColor;
        if(randomColorBrush)
            getRandomColor();
    }
}

function changeButtonClass(e) {
    if(currentButton != "") currentButton.classList.remove('activeButton');
    e.classList.add('activeButton');
    currentButton = e;
}

function getRandomColor () {
    currentColor = '#' + Math.floor(Math.random()*(256*256*256-1)).toString(16);
    brushColorInput.value = currentColor;
    randomColorBrush = true;
}

function changeSizeClass(e){
    currentSize.classList.remove('activeButton');
        e.classList.add('activeButton');
        currentSize = e;
}
gridContainer.addEventListener('mousedown', (e) => {
    paintOnHover = true;
    if(e.target != gridContainer){
        e.target.style.backgroundColor = currentColor;
        if(randomColorBrush)
            getRandomColor();
    }

});

gridContainer.addEventListener('mouseup', () => {
    paintOnHover = false;
});

black.addEventListener('click', () => {
    if(currentButton != black){
        changeButtonClass(black);
        currentColor = '#000000';
        brushColorInput.value = currentColor;
        randomColorBrush = false;
    }
});

white.addEventListener('click', () => {
    if(currentButton != white) {
        currentColor = '#ffffff';
        changeButtonClass(white);
        brushColorInput.value = currentColor;
        randomColorBrush = false;
    }
});

randomColor.addEventListener('click', () => {
    if(currentButton != randomColor){
        changeButtonClass(randomColor);
        getRandomColor();
        console.log(currentButton);
    }
});

eraser.addEventListener('click', () => {
    if(currentButton != eraser) {
        if(currentButton != "") currentButton.classList.remove('activeButton');
        eraser.classList.add('activeButton');
        currentButton = eraser;
        currentColor = backgroundColor;
        randomColorBrush = false;
    }
});

brushColorInput.addEventListener('change', () => {
    currentButton.classList.remove('activeButton');
    currentColor = brushColorInput.value;
    randomColorBrush = false;
    currentButton = "";
});

backgroundColorInput.addEventListener('change', () => {

    let nodes = gridContainer.childNodes;
    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].style.backgroundColor == backgroundColor){
            nodes[i].style.backgroundColor = backgroundColorInput.value;
        }
    }
    let r = parseInt(backgroundColorInput.value.slice(1,3), 16);
    let g = parseInt(backgroundColorInput.value.slice(3,5), 16);
    let b = parseInt(backgroundColorInput.value.slice(5,7), 16);

    backgroundColor = `rgb(${r}, ${g}, ${b})`;
    if(currentButton == eraser) currentColor  = `rgb(${r}, ${g}, ${b})`;
});

size8.addEventListener('click', () => {
    if(sideLength != 8){
        sideLength = 8;
        createGrid();
        changeSizeClass(size8);
    }
});

size16.addEventListener('click', () => {
    if(sideLength != 16) {
        sideLength = 16;
        createGrid();
        changeSizeClass(size16);
    }
});

size32.addEventListener('click', () => {
    if(sideLength != 32){
        sideLength = 32;
        createGrid();
        changeSizeClass(size32);
    }
});

toggleBorder.addEventListener('click', () => {
    if(gridContainer.style.gap == '0px') {
        toggleBorder.innerText = 'Hide Border';
        gridContainer.style.gap = '1px';
    } else {
        toggleBorder.innerText = 'Display Border';
        gridContainer.style.gap = '0px';
    }
});

clear.addEventListener('click', () => {
    let nodes = gridContainer.childNodes;
    for(let i = 0; i < nodes.length; i++){
        nodes[i].style.backgroundColor = backgroundColor;
    }
});

window.addEventListener('load', createGrid);