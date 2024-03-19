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

	/*----- cached elements  -----*/
    // grid = Array.from(document.querySelector("#grid > div"));
    // grid = document.getElementById("grid");
    let message;


	/*----- event listeners -----*/
    document.addEventListener('keydown', function(event){
        if (event.key == 'ArrowRight') {
            console.log(tilesArray);
            handleRight(tilesArray);      
        }
    })
    document.addEventListener('keydown', function(event){
        if (event.key == 'ArrowLeft') {
            console.log(tilesArray);

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

}

init();

function getAvailableSpots(tilesArray) {
    availableSpots = []; 
    for (let i = 0; i < tilesArray.length; i++) {
        for (let j = 0; j < tilesArray[i].length; j++) {
            if (tilesArray[i][j] === null) {
                availableSpots.push({ x: i, y: j });
            }
        }
    }
}

function addTile() {
    let x = availableSpots[Math.floor(Math.random() * availableSpots.length)].x;
    let y = availableSpots[Math.floor(Math.random() * availableSpots.length)].y;
    let num = Math.random() > 0.5 ? 2 : 4;

    log(x,y);
    let tile = new Tile(x, y, num);
    tile.initTile();
    tilesArray[y][x] = tile;
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
        tilesArray[tile.y][tile.x-1] = null;
        setInterval(() => tile.moveX(), 10);      
    }
}


function moveRowsRight(tilesRow){
    let max = 3;
    for (let i = tilesRow.length - 1; i >= 0; i--){
        if (tilesRow[i] != null){
            let moves = max - tilesRow[i].x 
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
   
    setTimeout(() => {
        tile1.moveX()
        tile1.updateInnerText();
        tile1.updateBackgroundColor();
    }, 0); 
}




/*--- if time permits, creat a Score Board---*/
