	/*----- constants -----*/
    const COLORS = {
        0: '#f9ebeb',     // pale pink
        2: '#f9d3d3',
        4: '#f8bbbb',
        8: '#f79f9f',
        16: '#f68282',
        32: '#f56565',
        64: '#f34848',
        128: '#f22b2b',
        256: '#f10d0d',
        512: '#ec0000',
        1024: '#d90000',
        2048: '#c40000'   // stronger pink
    };

    class Tile {
        constructor(x, y, num) {

            this.tileElem = document.createElement("div");
            this.tileElem.classList.add("tile");
            grid.append(this.tileElem);

            this.num = num;
            this.tileElem.innerText = this.num;
            this.tileElem.style.backgroundColor = COLORS[num];
            this.tileElem.style.transition = "left 0.5s, top 0.5s";

            this.x = x;
            this.y = y;


        }
        
        getId(){ 
            this.id = this.x.toString() + this.y.toString();
        } 

        moveX() {
            this.tileElem.style.setProperty("--x", this.x);

        }

        moveY() {
            this.tileElem.style.setProperty("--y", this.y);
        }

        
    }

	/*----- state variables -----*/
    // let board;
    let tilesArray;
    let grid;
    let occupiedIdxs;
    // let availableRowIdx;
    // let availableColIdx;
    let winner;



	/*----- cached elements  -----*/
    // grid = Array.from(document.querySelector("#grid > div"));
    grid = document.getElementById("grid");

    // test the tiles:
    // let tile = new Tile(0, 0, 8)
    // console.log(tile);



	/*----- event listeners -----*/


	/*----- functions -----*/

        
function init(){

    // board = [[null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],]

    // add two no tiles at random indxs
    // populateAvailableIdx(board);
    
   
    // board[getRowIdx()][getColIdx()] = Math.random() > 0.1 ? 2 : 4;
    // board[getRowIdx()][getColIdx()] = Math.random() > 0.1 ? 2 : 4;
    tilesArray = [];
    // hard code tiles in specific places an push them to tilesArray
    let tile_1 = new Tile(0, 2, 2);
    // tile_1.moveX();
    tile_1.moveY();
    tilesArray.push(tile_1)
    // let tile_2 = new Tile(1, 3, 2);
    // tilesArray.push(tile_2);
    // tile_2.moveX();
    // tile_2.moveY();

    // little loop test
    for (let i = 0; i < tilesArray.length; i++){
        for (let j = 0; j < 3; j++){
            tilesArray[i].x++;
            setInterval(() => tilesArray[i].moveX(), 10);
            tile_1.getId();
            console.log(tilesArray[i]);
            console.log(tilesArray[i].id);
        }
    }
    
    // setInterval(moveX, 10);



    //for each cell on the board array, create a tile, but maybe it can be done on the addtile func
    // addTile funct
    winner = 0;

    render();
}

init();



// generateRandPosition() {

//     let tilePosition = "0-0"
//     while ()
//     let x = Math.floor(Math.random() * 4 + 1);
//     let y = Math.floor(Math.random() * 4 + 1);
    
//     if (tilesArray.includes(tilePosition))
// }


function moveLeft(arr){ // this function is functional (only on the console for now)
    let zeros = arr.filter((num) => num === 0);
    let digits = arr.filter((num) => num !== 0);

    for (let i = digits.length - 1; i >= 0; i--){
        if (digits[i] === digits[i - 1]){
            digits[i] = digits[i] * 2;
            //add animation to the digits[i];
            digits.splice(i - 1, 1); // delete number before de sum
            zeros.push(0); // add one more zero to the zero's array to account for the deleted digit
        }
    }
    arr = zeros.concat(digits);
    return arr;
}

function moveRigth(arr){
    // reverse values from moveLeft
}

function moveUp(arr){
    // Maybe twist the board and reuse the code?
}

function moveDown(arr){

}


function populateAvailableIdx(board){
    availableRowIdx = [];
    availableColIdx = [];
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            if (board[i][j] === null){
                availableRowIdx.push(i);
                availableColIdx.push(j);
            } 
        }
    }
}

// function addNewNum(){ 
//     let rowIdx = availableRowIdx[Math.floor(Math.random() * availableColIdx.length + 1)];
//     let colIdx = availableColIdx[Math.floor(Math.random() * availableColIdx.length + 1)];
//     board[rowIdx][colIdx] = Math.random() > 0.1 ? 2 : 4;
// }

function getRowIdx(){
    return rowIdx = availableRowIdx[Math.floor(Math.random() * availableColIdx.length + 1)];
}

function getColIdx(){
    return colIdx = availableColIdx[Math.floor(Math.random() * availableColIdx.length + 1)];
}

function checkForWinner(){
    // if board includes 2048
}

function gameOver(){
    // if the board is full and there are no adjecent equal numbers
    // remove key listeners

}

function renderBoard(board){
    //loop through the board array and render the contents into the divs based on the div's ID using .innerText;
    // change .style.bacgrounColor depending on the number inside the div using object COLORS. 
}

function renderMessages(){

}

function render(){
    renderBoard();
}


/*--- if time permits, creat a Score Board---*/
