//Variables
let colorSelected;
let modeSelected;

//JQuery Selectors
const inputRange = document.querySelector("#num-of-cells");
const grid = document.querySelector(".grid-container");
const clearButton = document.querySelector("#clear-button");
const colorPicker = document.querySelector("#color-picker");
const modeButtons = document.querySelectorAll(".mode-choice");

//Event Listeners
/*Each modeButton is listening for click to define the selected mode
The color picker button is part of the modeButtons and select the color mode*/
modeButtons.forEach(modeButton => modeButton.addEventListener('click', changeColor))
/*The colorPicker gives the variable colorSelected its value
'input' is the appropriate event for color picker*/
colorPicker.addEventListener('input', (e) => {colorSelected = e.target.value});
clearButton.addEventListener('click', clear);

/*Colors the cells depending on the value of the variable modeSelected*/
function coloringMode() {
    switch(modeSelected) {
        case 'rainbow' :
            this.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            break;
        case 'shadow':

            break;
        case 'eraser':
            this.style.backgroundColor = 'white';
            break;
        case 'color' :
            this.style.backgroundColor = colorSelected;
            break;
        default :
            this.style.backgroundColor = 'black';
            break;
    }
}

/*Change the value of the variable modeSelected depending on which button is clicked*/
function changeColor(e) {
    switch(e.target.dataset.choice) {
        case 'rainbow':
            modeSelected = 'rainbow';
            break;
        case 'shadow' :
            modeSelected = 'shadow';
            break;
        case 'eraser' :
            modeSelected = 'eraser';
            break;
        case 'color' :
            modeSelected = 'color';
            break;
        default:
            modeSelected = color;
            break;
    }
}

/*Clear the grid and change the value of the variable modeSelected
to the default color mode*/
function clear() {
    let squares = document.querySelectorAll(".cell");
    squares.forEach(square => {
        square.style.backgroundColor = "white";
    });
    modeSelected = "color";
}

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
    let squares = document.querySelectorAll(".cell");
    squares.forEach(square => square.addEventListener('mouseover', coloringMode))
}




// shadowButton.addEventListener('click', () => {shadowMode()});
// function shadowMode() {
//     shadowOn = true;
//     const r = parseInt(backColor.substr(1, 2), 16)
//     const g = parseInt(backColor.substr(3, 2), 16)
//     const b = parseInt(backColor.substr(5, 2), 16)
//     const a = parseInt(backColor.substr(7, 2), 16)
//     if (a = "") {
//         color = "#" + r + g + b + 0.1;
//     } else {
//         color = "#" + r + g + b + (a+10);
//     }
// } 


