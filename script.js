const log = (...args) => console.log(...args)
    
    /*----- constants -----*/
    const scoreColor = "#FEF9D1"
    const COLORS = {
        0: '#f9ebeb',     
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
        2048: '#c40000'   
    };

    class Tile {
        constructor(x, y, num) {

            this.tileElem = document.createElement("div");
            this.tileElem.classList.add("tile");
            grid.append(this.tileElem);

            this.num = num;
            this.tileElem.innerText = this.num;
            this.tileElem.style.backgroundColor = COLORS[num];
            this.tileElem.style.transition = "left 0.2s, top 0.2s";

            this.x = x;
            this.y = y;

        }

        updateInnerText() {
            this.tileElem.innerText = this.num;
        }

        updateBackgroundColor() {
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
    let gameMessage = document.getElementById("game-message");
    let background = document.getElementById("background");
    let scoreBoard = document.getElementById("score");
    let restart = document.querySelector("button");

	/*----- event listeners -----*/
    restart.addEventListener("click", init);


	/*----- functions -----*/
        
function init() {

    document.addEventListener('keydown', handleArrowRight);
    document.addEventListener('keydown', handleArrowLeft);
    document.addEventListener('keydown', handleArrowDown);
    document.addEventListener('keydown', handleArrowUp);

    tilesArray = [[null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]]

    removeTiles();

   
    getAvailableSpots(tilesArray);
    addTile();
    addTile();

    score = 0;
    scoreBoard.innerText = `Score: ${score}`;
    gameMessage.innerText = "";

    background.style.display = "none";

}

init();

function handleArrowRight(event) {
    if (event.key == 'ArrowRight') {
        handleRight(tilesArray); 
        getAvailableSpots(tilesArray);
        addTile();
        if (isWinner()) {
            removeAllEventListeners();
        };  
    }
}

function handleArrowLeft(event) {
    if (event.key == 'ArrowLeft') {
        handleLeft(tilesArray);
        getAvailableSpots(tilesArray);
        addTile();
        if (isWinner()) {
            removeAllEventListeners();
        };
    }
}

function handleArrowDown(event) {
    if (event.key == 'ArrowDown') {
        handleDown(tilesArray)
        getAvailableSpots(tilesArray);
        addTile();
        if (isWinner()) {
            removeAllEventListeners();
        };
    }
}

function handleArrowUp(event) {
    if (event.key == 'ArrowUp') {
        handleUp(tilesArray)
        getAvailableSpots(tilesArray);
        addTile();
        if (isWinner()) {
            removeAllEventListeners();
        };
    }
}

function isWinner() {
    for (let i = 0; i < tilesArray.length; i++) {
        for (let j = 0; j < tilesArray[i].length; j++) {
            const tile = tilesArray[i][j];
            if (tile !== null && tile.num === 2048) {
                gameMessage.innerText = "You Won!";
                background.style.display = "block"
                return true; 
            }
        }
    }
    return false; 
}


function removeAllEventListeners() {
    document.removeEventListener('keydown', handleArrowRight);
    document.removeEventListener('keydown', handleArrowLeft);
    document.removeEventListener('keydown', handleArrowDown);
    document.removeEventListener('keydown', handleArrowUp);
}

function removeTiles() {
    let tiles = document.querySelectorAll(".tile");
    tiles.forEach(function(tile) {
        tile.remove();
    });
}

function getAvailableSpots(tilesArray) {
    availableSpots = []; 
    for (let y = 0; y < tilesArray.length; y++) {
        for (let x = 0; x < tilesArray[y].length; x++) {
            if (tilesArray[y][x] === null){
                availableSpots.push({ x: x, y: y });
            }
        }
    }
    if (availableSpots.length === 0 && !lastMove(tilesArray)){
        gameMessage.innerText = "Game Over!";
        background.style.display = "block";
    }
}

function lastMove(tilesArray) {
    return possibleHorizontal(tilesArray) || possibleVertical(tilesArray);
}

function possibleHorizontal(tilesArray) {
    for (let i = 0; i < tilesArray.length; i++) {    
        if (tilesArray[i][1].num === tilesArray[i][0].num || tilesArray[i][1].num === tilesArray[i][2].num || tilesArray[i][2].num === tilesArray[i][3].num){
            return true;
        }
    }
    return false;
}

function possibleVertical(tilesArray) {
    for (let j = 0; j < tilesArray[0].length; j++) {    
        if (tilesArray[1][j].num === tilesArray[0][j].num || tilesArray[1][j].num === tilesArray[2][j].num || tilesArray[2][j].num === tilesArray[3][j].num){
            return true;
        }
    }
    return false;
}

function handleRight(tilesArray){
    tilesArray.forEach(function(row){
        checkAdjecentRight(row);
        moveRowsRight(row);
    })
}

function handleLeft(tilesArray) {
    tilesArray.forEach(function(row){
        checkAdjecentLeft(row);
        moveRowsLeft(row);
    })
}

function handleDown(tilesArray) {
    checkAdjecentDown(tilesArray);
    moveRowsDown(tilesArray);
}

function handleUp(tilesArray) {
    checkAdjecentUp(tilesArray);
    moveRowsUp(tilesArray);
}

function animationRight(moves, tile, tilesArray){
    for (let i = 0; i < moves; i++){
        tile.x++;
        tilesArray[tile.y][tile.x] = tile;
        tilesArray[tile.y][tile.x - 1] = null;
        setInterval(() => tile.moveX(), 10);      
    }
}


function moveRowsRight(tilesRow) {
    let max = 3;
    for (let i = tilesRow.length - 1; i >= 0; i--){
        if (tilesRow[i] != null){
            let moves = max - tilesRow[i].x;
            animationRight(moves, tilesRow[i], tilesArray);
            max--;
        }
    }
}

function checkAdjecentRight(tilesRow) {
    for (let i = tilesRow.length - 1; i >= 1 ; i--){
        if(tilesRow[i] !== null && tilesRow[i - 1] !== null){
            if (tilesRow[i].num === tilesRow[i - 1].num){
                mergeTilesRight(tilesRow[i - 1], tilesRow[i], tilesArray);
                i--;
            }
        }
    }
}

function mergeTilesRight(tile1, tile2, tilesArray) {
    let before = tilesArray[tile1.y][tile1.x];
    tilesArray[before.y][before.x] = null;
    tile1.x++;

    score += tile1.num + tile2.num;
    scoreBoard.innerHTML = `Score: <span style="color: ${scoreColor};">${score}</span>`;
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
    }, 18); 
    
}

function animationLeft(moves, tile, tilesArray) {
    for (let i = 0; i < moves; i++){
        tile.x--;
        tilesArray[tile.y][tile.x] = tile;
        tilesArray[tile.y][tile.x + 1] = null;
        setInterval(() => tile.moveX(), 10);      
    }
}

function moveRowsLeft(tilesRow) {
    let min = 0;
    for (let i = 0; i < tilesRow.length; i++){
        if (tilesRow[i] != null){
            let moves = tilesRow[i].x - min;
            animationLeft(moves, tilesRow[i], tilesArray);
            min++;
        }
    }
}

function checkAdjecentLeft(tilesRow) {
    for (let i = 0; i < tilesRow.length - 1; i++){
        if(tilesRow[i] !== null && tilesRow[i + 1] !== null){
            if (tilesRow[i].num === tilesRow[i + 1].num){
                mergeTilesLeft(tilesRow[i + 1], tilesRow[i], tilesArray);
                i++;
            }
        }
    }
}

function mergeTilesLeft(tile1, tile2, tilesArray) {
    let before = tilesArray[tile1.y][tile1.x];
    tilesArray[before.y][before.x] = null;
    tile1.x--;

    score += tile1.num + tile2.num;
    scoreBoard.innerHTML = `Score: <span style="color: ${scoreColor};">${score}</span>`;
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

function checkAdjecentDown(tilesArray) {
    for (let j = 0; j < tilesArray[0].length; j++){ // x
        for (let i = tilesArray.length - 1; i >= 1; i--){ // y
            if (tilesArray[i][j] !== null && tilesArray[i - 1][j] !== null) {
                if (tilesArray[i][j].num === tilesArray[i - 1][j].num) {
                    mergeTilesDown(tilesArray[i - 1][j], tilesArray[i][j], tilesArray)
                    i--;    
                } 
            }
        }
    }
}


function mergeTilesDown(tile1, tile2, tilesArray) {
    let before = tilesArray[tile1.y][tile1.x];
    tilesArray[before.y][before.x] = null;
    tile1.y++;

    score += tile1.num + tile2.num;
    scoreBoard.innerHTML = `Score: <span style="color: ${scoreColor};">${score}</span>`;
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


function moveRowsDown(tilesArray) {
    let max = 3;
    for (let j = 0; j < tilesArray[0].length; j++){
        for (let i = tilesArray.length - 1; i >= 0; i--){
            if (tilesArray[i][j] !== null){ 
                let moves = max - tilesArray[i][j].y;
                animationDown(moves, tilesArray[i][j]);
                max--;
            }
        }
        max = 3;
    }
}


function animationDown(moves, tile) {
    for (let i = 0; i < moves; i++){
        tile.y++;
        tilesArray[tile.y][tile.x] = tile;
        tilesArray[tile.y - 1][tile.x] = null;
        setInterval(() => tile.moveY(), 10);      
    }
}

function checkAdjecentUp(tilesArray) {
    for (let j = 0; j < tilesArray[0].length; j++){
        for (let i = 0; i < tilesArray.length - 1; i++){
            if (tilesArray[i][j] !== null && tilesArray[i + 1][j] !== null){ 
                if (tilesArray[i][j].num === tilesArray[i + 1][j].num) {
                    mergeTilesUp(tilesArray[i + 1][j], tilesArray[i][j], tilesArray)
                    i++;    
                } 
            }
        }
    }
}

function mergeTilesUp(tile1, tile2, tilesArray) {
    let before = tilesArray[tile1.y][tile1.x];
    tilesArray[before.y][before.x] = null;
    tile1.y--;

    score += tile1.num + tile2.num;
    scoreBoard.innerHTML = `Score: <span style="color: ${scoreColor};">${score}</span>`;
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

function moveRowsUp(tilesArray) {
    let min = 0;
    for (let j = 0; j < tilesArray[0].length; j++){
        for (let i = 0; i < tilesArray.length; i++){
            if (tilesArray[i][j] !== null){ 
                let moves = tilesArray[i][j].y - min;
                animationUp(moves, tilesArray[i][j]);
                min++;
            }
        }
        min = 0;
    }
}

function animationUp(moves, tile) {
    for (let i = 0; i < moves; i++){
        tile.y--;
        tilesArray[tile.y][tile.x] = tile;
        tilesArray[tile.y + 1][tile.x] = null;
        setInterval(() => tile.moveY(), 10);      
    }
}