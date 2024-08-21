console.log('hello');

/*-------------------------------- Constants --------------------------------*/

const DIFFICULTY_LEVELS = {
    Easy: { rows: 9, cols: 9, totalMines: 10 },
    Medium: { rows: 16, cols: 16, totalMines: 30 },
    Hard: { rows: 23, cols: 23, totalMines: 50 },
};

/*---------------------------- Variables (state) ----------------------------*/

let currentDifficulty = 'Easy';
let rows, cols, totalMines;
let cells = []; 
let gameOver = false;
let mineLeft;
let timer = null;
let startTime = null;
let elapsedTime = 0;

/*------------------------ Cached Element References ------------------------*/

    // const startBtn = document.getElementById('startbtn');
    // const gameArea = document.getElementById('game-area');
    // const dropdownBox = document.getElementById('dropdownbox');
/*-------------------------------- Functions --------------------------------*/
    //createCells;
    //function placeMines(); 
    //placeMines();
    //calculateAdjacentMines();
    //function handleLeftClick();
    //function handleRightClick();
    //function handleBothClick();
    //function isDifferentRow();

/*----------------------------- Event Listeners -----------------------------*/
    //startBtn.addEventListener;
    //Event: right, left, both click;
    //EventListener(DOMContentLoaded);

document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startbtn');
    const gameArea = document.getElementById('game-area');
    const dropdownBox = document.getElementById('dropdownbox');
    const restartBtn = document.getElementById('restartBtn');
    const timeElement = document.getElementById('time');





//=====================================================================================================
//==========================================start and restart btn======================================
    startBtn.addEventListener('click', function () {
        newGame(); 
    });

    restartBtn.addEventListener('click', function () {
        newGame(); 
    });
//=====================================================================================================
//=========================================Create cells for new game===================================
    function newGame() {
        
        const difficulty = dropdownBox.value;
        ({ rows, cols, totalMines } = DIFFICULTY_LEVELS[difficulty]);

        gameArea.innerHTML = '';
        cells = [];
        gameOver = false;

        stopTimer();
        elapsedTime = 0;
        timeElement.textContent = 'Time: 00:00';


        const cellSize = 30;  
        const gapSize = 1;

        gameArea.style.display = 'grid';
        gameArea.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gameArea.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gameArea.style.gap = `${gapSize}px`;

        const totalWidth = cols * cellSize + (cols - 1) * gapSize + 4;  
        const totalHeight = rows * cellSize + (rows - 1) * gapSize + 4;

        gameArea.style.width = `${totalWidth}px`;
        gameArea.style.height = `${totalHeight}px`;

        const totalCells = rows * cols;
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;

            cell.isMine = false;
            cell.isRevealed = false;
            cell.isFlagged = false;
            cell.adjacentMines = 0;

            cells.push(cell); 
            gameArea.appendChild(cell);

           
//===========================================Create cells==============================================
//=====================================================================================================


//=====================================================================================================
//==========================================Event: right, left, both click============================= 
            (function(index) {
        
                cell.addEventListener('mousedown', function(e) {
                    if (e.buttons === 3 && cell.isRevealed && !gameOver) { 
                        handleBothClick(cell, index);
                    } else if (e.button === 0) { 
                        handleLeftClick(cell, index);
                    }
                });

                cell.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    if (gameOver || cell.isRevealed) return;
                    handleRightClick(cell);
                });
            })(i);
            
        }



//==========================================Event: right, left, both click============================= 
//=====================================================================================================



        placeMines();
        calculateAdjacentMines();


//=====================================================================================================
//=============================================set: mines left ========================================

        mineLeft = totalMines;  

        document.getElementById('mine-left').textContent = `Mines left: ${mineLeft}`;  

        
        

//=============================================set: mines left ========================================
//=====================================================================================================


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++Test place mines++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++Test place mines++++++++++++++++++++++++++++++++++++++++++++++
           
        cells.forEach((cell, index) => {
            if (cell.isMine) {
                console.log(`Mine placed at index: ${index}, row: ${Math.floor(index / cols)}, col: ${index % cols}`);
            }
        });
        
        console.log(totalCells);
        console.log(totalMines);
    };


//+++++++++++++++++++++++++++++++++++++++Test place mines++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++Test place mines++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




//=====================================================================================================
//===========================================Place mines===============================================

    function placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < totalMines) {
            const randomIndex = Math.floor(Math.random() * cells.length);
            const cell = cells[randomIndex];
            if (!cell.isMine) {
                cell.isMine = true;
                minesPlaced++;
            }
        }
    }


//===========================================Place mines===============================================
//=====================================================================================================





//=====================================================================================================
//===========================================calculateAdjacenMines=====================================
    function calculateAdjacentMines() {
        const directions = [
            -cols - 1, -cols, -cols + 1,  
            -1,        1,   
             cols - 1,  cols,  cols + 1     
        ];

        cells.forEach((cell, index) => {
            if (cell.isMine) return;

            let adjacentMines = 0;
            directions.forEach(direction => {
                const adjacentIndex = index + direction;
                if (
                    adjacentIndex >= 0 &&
                    adjacentIndex < cells.length &&
                    !isDifferentRow(index, adjacentIndex, direction) &&
                    cells[adjacentIndex].isMine
                ) {
                    adjacentMines++;
                }
            });
            cell.adjacentMines = adjacentMines;




//===========================================calculateAdjacenMines=====================================
//=====================================================================================================



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++Test adjacentMines mines++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++Test adjacentMines mines++++++++++++++++++++++++++++++++++++++

            console.log(`adjacentMines at index ${index} (row: ${Math.floor(index / cols)}, col: ${index % cols}) has ${adjacentMines} adjacent mines.`);
        });
    }


//+++++++++++++++++++++++++++++++++++++++Test adjacentMines mines++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++Test adjacentMines mines++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





//=====================================================================================================
//=========================================check row ==================================================
function isDifferentRow(index, adjacentIndex, direction) {
    const currentRow = Math.floor(index / cols);
    const adjacentRow = Math.floor(adjacentIndex / cols);

    if (direction === -1 || direction === 1) {
        return currentRow !== adjacentRow;
    }

    if (
        (direction === -cols - 1 || direction === cols - 1) && adjacentIndex % cols === cols - 1 ||
        (direction === -cols + 1 || direction === cols + 1) && adjacentIndex % cols === 0
    ) {
        return true;
    }

    return false;
}

//=========================================check row ==================================================
//=====================================================================================================


//=====================================================================================================
//=======================================Function: right, left, both click=============================


//=======================================left==========================================================
    function handleLeftClick(cell, index) {
        if (cell.isRevealed || gameOver || cell.isFlagged) return;

        if (!timer) {
            startTimer();
        }

        cell.isRevealed = true;

        if (cell.isMine) {
            cell.style.backgroundColor = 'red';
            gameOver = true;
            stopTimer();
            showMessage('Game Over! YOU LOSE!');
            revealAllMines();
        } else {
            cell.style.backgroundColor = '#8FBC8F';
            cell.textContent = cell.adjacentMines > 0 ? cell.adjacentMines : '';
            if (cell.adjacentMines === 0) {
                revealEmptyCells(index);
            }
            checkWinCondition();
            
        }
       
    }


//=======================================right and count mins=========================================
    
function handleRightClick(cell) {
    if (cell.isFlagged) {
        cell.isFlagged = false;
        cell.textContent = '';
        cell.classList.remove('is-flagged');
        mineLeft++;
    } else {
        if (mineLeft === 0) return;
        cell.isFlagged = true;
        cell.textContent = '🏴‍☠️';
        cell.classList.add('is-flagged');
        mineLeft--;
    }

//=======================================update mines=================================================
    document.getElementById('mine-left').textContent = `Mines left: ${mineLeft}`;  
}


//=======================================both==========================================================
    function handleBothClick(cell, index) {
        const directions = [
            -cols - 1, -cols, -cols + 1,  
            -1,        1,   
             cols - 1,  cols,  cols + 1   
        ];

        let flaggedMines = 0;

        directions.forEach(direction => {
            const adjacentIndex = index + direction;
            if (
                adjacentIndex >= 0 &&
                adjacentIndex < cells.length &&
                !isDifferentRow(index, adjacentIndex, direction)
            ) {
                const adjacentCell = cells[adjacentIndex];
                if (adjacentCell.isFlagged) {
                    flaggedMines++;
                }
            }
        });

        if (flaggedMines === cell.adjacentMines) {
            directions.forEach(direction => {
                const adjacentIndex = index + direction;
                if (
                    adjacentIndex >= 0 &&
                    adjacentIndex < cells.length &&
                    !isDifferentRow(index, adjacentIndex, direction)
                ) {
                    const adjacentCell = cells[adjacentIndex];
                    if (!adjacentCell.isFlagged && !adjacentCell.isRevealed) {
                        handleLeftClick(adjacentCell, adjacentIndex);
                    }
                }
            });
        }
    }




//=======================================Function: right, left, both click=============================
//=====================================================================================================




//=====================================================================================================
//=======================================Function: reveal all mines and cells=========================

function revealAllMines() {
    cells.forEach(cell => {
        if (cell.isMine) {
            cell.style.backgroundColor = '#ffd800';
            cell.style.transition = 'background-color 0.5s ease';
        }
    });
}




    function revealEmptyCells(index) {
        const directions = [
            -cols - 1, -cols, -cols + 1,  
            -1, 1,                        
            cols - 1, cols, cols + 1     
        ];

        directions.forEach(direction => {
            const adjacentIndex = index + direction;

            if (
                adjacentIndex >= 0 &&
                adjacentIndex < cells.length &&
                !isDifferentRow(index, adjacentIndex, direction)
            ) {
                const adjacentCell = cells[adjacentIndex];
                if (!adjacentCell.isRevealed && !adjacentCell.isMine) {
                    adjacentCell.isRevealed = true;
                    adjacentCell.style.backgroundColor = '#8FBC8F';
                    adjacentCell.textContent = adjacentCell.adjacentMines > 0 ? adjacentCell.adjacentMines : '';
                    if (adjacentCell.adjacentMines === 0) {
                        revealEmptyCells(adjacentIndex);
                    }
                }
            }
        });
    }


//=======================================Function: reveal all mines and cells==========================
//=====================================================================================================




//=====================================================================================================
//==============================================win condition==========================================

function checkWinCondition() {
    const revealedCells = cells.filter(cell => cell.isRevealed);
    if (revealedCells.length === cells.length - totalMines) {
        gameOver = true;
        stopTimer();  

        setTimeout(() => {
            showMessage('Congratulations! YOU WIN!');
        }, 0);
    }
}

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    function updateTime() {
        elapsedTime = Date.now() - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000) / 60);
        timeElement.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
//==============================================win condition==========================================
//=====================================================================================================

    function showMessage(message) {
     const messageContainer = document.getElementById('message-container');
     const messageText = document.getElementById('message-text');
     messageText.textContent = message;
     messageContainer.style.display = 'flex';

     const closeMessageBtn = document.getElementById('close-message-btn');
     closeMessageBtn.addEventListener('click', () => {
         messageContainer.style.display = 'none';
    });
}
});
