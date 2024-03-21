const log = (...args) => console.log(...args)
    
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

        updateInnerText() {
            this.tileElem.innerText = this.num;
        }

        updateBackgroundColor(){
            this.tileElem.style.backgroundColor = COLORS[this.num];
        }

        moveX() {
            this.tileElem.style.setProperty("--x", this.x);

        }

        moveY() {
            this.tileElem.style.setProperty("--y", this.y);
        }

        hide() {
            this.tileElem.style.opacity = "0"; 
        }

        initTile() {
            this.moveX();
            this.moveY();
            this.updateInnerText();
            this.updateBackgroundColor();
        }
    
    }

	/*----- state variables -----*/
    let tilesArray;
    let availableSpots;
    let winner;
    let score;
    let flippedArray;

	/*----- cached elements  -----*/
    // grid = Array.from(document.querySelector("#grid > div"));
    // grid = document.getElementById("grid");
    let message;


	/*----- event listeners -----*/
    document.addEventListener('keydown', function(event){
        if (event.key == 'ArrowRight') {
            handleRight(tilesArray); 
            getAvailableSpots(tilesArray);
            addTile();     
        }
    })
    document.addEventListener('keydown', function(event){
        if (event.key == 'ArrowLeft') {
            handleLeft(tilesArray);
            getAvailableSpots(tilesArray);
            addTile();
        }
    })
    document.addEventListener('keydown', function(event){
        if (event.key == 'ArrowDown') {
            // checkAdjecentDown(tilesArray);
            // moveRowsDown(tilesArray);
            handleDown(tilesArray)
            // log(tilesArray);
            getAvailableSpots(tilesArray);
            addTile();
        }
    })


	/*----- functions -----*/

        
function init(){

    tilesArray = [[null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]]

   
    getAvailableSpots(tilesArray);
    addTile();
    addTile();

    log(tilesArray);

    winner = 0;
    score = 0;
    flippedArray = Array.from({ length: 4}, () => Array(4).fill(null));
}


init();

function getAvailableSpots(tilesArray) {
    availableSpots = []; 
    for (let y = 0; y < tilesArray.length; y++) {
        for (let x = 0; x < tilesArray[y].length; x++) {
            if (tilesArray[y][x] === null){
                availableSpots.push({ x: x, y: y });
            }
        }
    }
}


function handleRight(tilesArray){
    tilesArray.forEach(function(row){
        checkAdjecentRight(row);
        moveRowsRight(row);
    })
}


function animationRight(moves, tile, tilesArray){
    for (let i = 0; i < moves; i++){
        tile.x++;
        tilesArray[tile.y][tile.x] = tile;
        tilesArray[tile.y][tile.x - 1] = null;
        setInterval(() => tile.moveX(), 10);      
    }
}


function moveRowsRight(tilesRow){
    let max = 3;
    for (let i = tilesRow.length - 1; i >= 0; i--){
        if (tilesRow[i] != null){
            let moves = max - tilesRow[i].x;
            animationRight(moves, tilesRow[i], tilesArray);
            max--;
        }
    }
}

function checkAdjecentRight(tilesRow){
    for (let i = 0; i < tilesRow.length - 1; i++){
        if(tilesRow[i] !== null && tilesRow[i + 1] !== null){
            if (tilesRow[i].num === tilesRow[i + 1].num){
                mergeTilesRight(tilesRow[i], tilesRow[i + 1], tilesArray);
                i++;
            }
        }
    }
}

function mergeTilesRight(tile1, tile2, tilesArray) {
    let before = tilesArray[tile1.y][tile1.x];
    tilesArray[before.y][before.x] = null;
    tile1.x++;
    tile1.num *= 2;

    tilesArray[tile2.y][tile2.x] = null; 
    tilesArray[tile1.y][tile1.x] = tile1;
    tile2.hide();
    tile2 = null;
   
    setInterval(() => {
        tile1.moveX()
        tile1.updateInnerText();
        tile1.updateBackgroundColor();
    }, 0); 
}



function addTile() {
    setTimeout(() => {
        getAvailableSpots(tilesArray);
        let place = Math.floor(Math.random() * availableSpots.length);
        let x = availableSpots[place].x;
        let y = availableSpots[place].y;
        let num = Math.random() > 0.9 ? 4 : 2;
        let tile = new Tile(x, y, num);
        tile.initTile();
        tilesArray[y][x] = tile;
    }, 10); 
    
}

function handleLeft(tilesArray) {
    tilesArray.forEach(function(row){
        checkAdjecentLeft(row);
        moveRowsLeft(row);
    })
}

function animationLeft(moves, tile, tilesArray) {
    for (let i = 0; i < moves; i++){
        tile.x--;
        tilesArray[tile.y][tile.x] = tile;
        tilesArray[tile.y][tile.x + 1] = null;
        setInterval(() => tile.moveX(), 10);      
    }
}

function moveRowsLeft(tilesRow){
    let min = 0;
    for (let i = 0; i < tilesRow.length; i++){
        if (tilesRow[i] != null){
            let moves = tilesRow[i].x - min;
            animationLeft(moves, tilesRow[i], tilesArray);
            min++;
        }
    }
}

function checkAdjecentLeft(tilesRow){
    for (let i = tilesRow.length - 1; i >= 1; i--){
        if(tilesRow[i] !== null && tilesRow[i - 1] !== null){
            if (tilesRow[i].num === tilesRow[i - 1].num){
                mergeTilesLeft(tilesRow[i], tilesRow[i - 1], tilesArray);
                i--;
            }
        }
    }
}

function mergeTilesLeft(tile1, tile2, tilesArray) {
    let before = tilesArray[tile1.y][tile1.x];
    tilesArray[before.y][before.x] = null;
    tile1.x--;
    tile1.num *= 2;

    tilesArray[tile2.y][tile2.x] = null; 
    tilesArray[tile1.y][tile1.x] = tile1;
    tile2.hide();
    tile2 = null;
   
    setInterval(() => {
        tile1.moveX()
        tile1.updateInnerText();
        tile1.updateBackgroundColor();
    }, 0); 
}

// function flipTilesArray(tilesArray) {
//     flippedArray = Array.from({ length: 4}, () => Array(4).fill(null));;
//     for (let i = 0; i < tilesArray.length; i++) {
//         for (let j = 0; j < tilesArray[i].length; j++) {
//             flippedArray[j][i] = tilesArray[i][j];
//         }
//     }
// }

// i es la columna, o y
function checkAdjecentDown(tilesArray) {
    for (let j = 0; j < tilesArray[0].length; j++){ // x
        for (let i = 0; i < tilesArray.length - 1; i++){ // y
            if (tilesArray[i][j] !== null && tilesArray[i + 1][j] !== null) {
                if (tilesArray[i][j].num === tilesArray[i + 1][j].num) {
                    mergeTilesDown(tilesArray[i][j], tilesArray[i + 1][j], tilesArray)
                    i++;    
                } 
            }
        }
    }
}


function mergeTilesDown(tile1, tile2, tilesArray) {
    let before = tilesArray[tile1.y][tile1.x];
    tilesArray[before.y][before.x] = null;
    tile1.y++;
    tile1.num *= 2;

    tilesArray[tile2.y][tile2.x] = null; 
    tilesArray[tile1.y][tile1.x] = tile1;
    tile2.hide();
    tile2 = null;
   
    setInterval(() => {
        tile1.moveY()
        tile1.updateInnerText();
        tile1.updateBackgroundColor();
    }, 0); 
}

function handleDown(tilesArray) {
    checkAdjecentDown(tilesArray);
    moveRowsDown(tilesArray);
}

// function moveRowsDown(tilesArray) {
//     let max = 3;
//     for (let j = 0; j < tilesArray[0].length; j++){
//         for (let i = 0; i < tilesArray.length - 1; i++){
//             let moves = max - tilesArray[i][j].x;
//             animationDown(moves, tilesArray[i][j]);
//             max--;
//         }
//     }
// }

function moveRowsDown(tilesArray) {
    let max = 3;
    for (let j = 0; j < tilesArray[0].length; j++){
        for (let i = tilesArray.length - 1; i >= 0; i--){
            if (tilesArray[i][j] !== null){ 
                log("y value: ",tilesArray[i][j].y);
                let moves = max - tilesArray[i][j].y;
                log("moves: ",moves);
                animationDown(moves, tilesArray[i][j]);
                max--;
            }
        }
        max = 3;
    }
}




// function moveRowsDown(tilesArray) {
//     let gridHeight = tilesArray.length;
//     let gridWidth = tilesArray[0].length;

//     for (let j = 0; j < gridWidth; j++) { // Loop over columns from left to right
//         for (let i = 0; i < gridHeight; i++) { // Loop over rows from top to bottom
//             if (tilesArray[i][j] !== null) {
//                 let moves = gridHeight - 1 - tilesArray[i][j].y;
//                 animationDown(moves, tilesArray[i][j]);
//             }
//         }
//     }
// }


function animationDown(moves, tile){
    for (let i = 0; i < moves; i++){
        tile.y++;
        tilesArray[tile.y][tile.x] = tile;
        tilesArray[tile.y - 1][tile.x] = null;
        setInterval(() => tile.moveY(), 10);      
    }
}



// /*
// if arrowDown:
// flippedArray(tilesArray);
// loop through flippedArray;
// check adjecent right, pero con valores y--;
// */

// function handleDown(flippedArray, tilesArray){
//     flippedArray.forEach(function(row){
//         checkAdjecentDown(row, tilesArray);
//         moveRowsDown(row, tilesArray);
//     })
// }
// // make sure we are passing the right tile

// function animationDown(moves, tile, tilesArray, flippedArray){
//     let flipped = {...tile};
//     // cambiar las coordenadas de x y y para que funcione animationRight
//     flipped.x = tile.y
//     flipped.y = tile.x

//     for (let i = 0; i < moves; i++){
//         tile.y++;
//         tilesArray[tile.y][tile.x] = tile;
//         tilesArray[tile.y - 1][tile.x] = null;
//         setInterval(() => tile.moveY(), 10);      
//     }
//     animationRight(moves, flippedtile, flippedArray);
// }


// function moveRowsDown(flippedRow, tilesArray){
//     let max = 3;
//     for (let i = flippedRow.length - 1; i >= 0; i--){
//         if (flippedRow[i] != null){
//             let moves = max - i; 
//             animationDown(moves, flippedRow[i], tilesArray, flippedArray);
//             // aqui tengo que pasar la actual tile, que tiene los valores reales, si esta en flippedRow
//             // let actualTile = flippedRow[i];
//             max--;
//         }
//     }
// }

// function checkAdjecentDown(flippedRow, tilesArray){
//     for (let i = 0; i < flippedRow.length - 1; i++){
//         if(flippedRow[i] !== null && flippedRow[i + 1] !== null){
//             // aqui hay que comparar los valores de la actual tile, which is right
//             if (flippedRow[i].num === flippedRow[i + 1].num){
//                 mergeTilesDown(flippedArray[i], flippedArray[i + 1], tilesArray, flippedArray);
//                 i++;
//             }
//         }
//     }
// }

// function mergeTilesDown(tile1, tile2, tilesArray, flippedArray) {
//     let before = tilesArray[tile1.y][tile1.x];
//     tilesArray[before.y][before.x] = null;
//     tile1.y++;
//     tile1.num *= 2;

//     tilesArray[tile2.y][tile2.x] = null; 
//     tilesArray[tile1.y][tile1.x] = tile1;
//     tile2.hide();
//     tile2 = null;
   
//     setInterval(() => {
//         tile1.moveX()
//         tile1.updateInnerText();
//         tile1.updateBackgroundColor();
//     }, 0); 
//     // hacer una copia y pasar esa copia como 
//     mergeTilesRight(tile1, tile2, flippedArray)
// }