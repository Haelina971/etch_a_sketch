let color = "black";
let rainbowOn = false;

/* Change variable color value to the value of the color picker
when color-button is clicked */
const colorButton = document.getElementById("color-button");
colorButton.addEventListener('click', () => {color = colorPicker.value; rainbowOn = false});

/* Change variable color value depending on the color picker
Appropriate event is 'input' to listen to the event */
const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener('input', (e) => {color = e.target.value});


let inputRange = document.getElementById("num-of-cells");
inputRange.addEventListener('input', () => {displayRange(inputRange)});

/* Function called when the slider moves.
Displays the value of the slider to indicate number of cells on each side of the grid. */
function displayRange(rangeSlider) {
    const sliderVal = rangeSlider.value;
    const rangeVal = document.getElementById("range-value");
    rangeVal.innerHTML = sliderVal + " X " + sliderVal;
    grid.innerHTML = "";
    drawGrid(sliderVal);
    return sliderVal;
}

let grid = document.querySelector(".grid-container");
size = displayRange(inputRange);

/*Draw the grid depending on the slider value*/
function drawGrid(cellsNumber) {
    const size = grid.offsetWidth / cellsNumber;
    grid.style.gridTemplateColumns = `repeat(${cellsNumber}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${cellsNumber}, 1fr)`;
    for(let i=0; i < cellsNumber * cellsNumber; i++) {
        cell = document.createElement('div');
        cell.className = "cell";
        grid.appendChild(cell);
    }
    changeColor();
}


/*Change the color of the squares when hovering
depending on the value of the variable constante color and the mode activated*/
function changeColor() {
    let squares = document.querySelectorAll(".cell");
    squares.forEach(square => { 
        square.addEventListener('mouseenter', () => {
            if (rainbowOn) {
                square.style.backgroundColor = color; rainbowMode();
            } else {
                square.style.backgroundColor = color;
            }
        });
    });
}

function selectColor() {
    if (rainbowOn) {
        square.style.backgroundColor = color;rainbowMode();
    } else {
        square.style.backgroundColor = color;
    }
}

/*Clear the grid
The variable color is reset to the color picker value*/
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener('click', () => {clear()});
function clear() {
    let squares = document.querySelectorAll(".cell");
    squares.forEach(square => {
        square.style.backgroundColor = "white";
    });
    if (!rainbowOn) {
        color = colorPicker.value;
    }
}

/* Change variable color value to white when Eraser button is clicked */
const eraserButton = document.getElementById("eraser-button");
eraserButton.addEventListener('click', (e) => {color = "white"});

const rainbowButton = document.getElementById("rainbow-button");
rainbowButton.addEventListener('click', () => {rainbowMode()});
function rainbowMode() {
    rainbowOn = true;
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    color = randomColor;
}



