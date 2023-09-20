//Variables
let colorSelected = 'black';
let modeSelected;

//JQuery Selectors
const inputRange = document.querySelector("#num-of-cells");
const grid = document.querySelector(".grid-container");
const clearButton = document.querySelector("#clear-button");
const colorPicker = document.querySelector("#color-picker");
const modeButtons = document.querySelectorAll(".mode-choice");



/*Colors the cells depending on the value of the variable modeSelected*/
function coloringMode() {
    switch(modeSelected) {
        case 'rainbow' :
            this.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);  //generate random color
            this.classList.remove('shadow');
            break;
        case 'shadow':
            let rgba = getComputedStyle(this).getPropertyValue("background-color"); //get rgba value of cell
            if (rgba.match(/rgba/)) {
                let opacity = Number(rgba.slice(-3, -1));
                if (opacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`;
                    this.classList.add('shadow');
                }
            } else if (this.classList.contains("shadow") && rgba == "rgb(0, 0, 0)") {  //check if cell is tagged as shadow and black
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  //if cell not tagged as shadow, color with first step of opacity
                }
            break;
        case 'eraser':
            this.style.backgroundColor = 'white';
            this.classList.remove('shadow');
            break;
        case 'color' :
            this.style.backgroundColor = colorSelected;
            this.classList.remove('shadow');
            break;
        default :
            this.style.backgroundColor = colorSelected;
            this.classList.remove('shadow');
            break;
    }
}

/*Change the value of the variable modeSelected depending on which button is clicked
using the data attributes from the HTML document*/
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
            modeSelected = 'color';
            break;
    }
}

/*Clear the grid and change the value of the variable modeSelected
to the default color mode*/
function clear() {
    let squares = document.querySelectorAll(".cell");
    squares.forEach(square => {
        square.style.backgroundColor = "white";
        square.classList.remove('shadow');
    });
}

/*Called when the slider moves and displays the value of the slider 
to indicate the number of cells on each side of the grid.*/
function changeRange(rangeSlider) {
    sliderVal = rangeSlider.value;
    const rangeVal = document.querySelector("#range-value");
    rangeVal.innerHTML = sliderVal + " X " + sliderVal;
    grid.innerHTML = "";
    drawGrid(sliderVal);
}

/*Draw the grid depending on the slider value*/
function drawGrid(cellsNumber) {
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

//Default grid when page loads
drawGrid(16);

//Event Listeners
/*Listen to change of input from the slider
Used arrow function to pass inputRange as a parameter*/
inputRange.addEventListener('input', () => {changeRange(inputRange)});
/*Each modeButton is listening for click to define the selected mode
The color picker button is part of the modeButtons and select the color mode*/
modeButtons.forEach(modeButton => modeButton.addEventListener('click', changeColor))
/*The colorPicker gives the variable colorSelected its value
'input' is the appropriate event for color picker*/
colorPicker.addEventListener('input', (e) => {colorSelected = e.target.value});
clearButton.addEventListener('click', clear);
