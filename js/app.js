console.log('hello')

/*-------------------------------- Constants --------------------------------*/

const DIFFICULTY_LEVELS = {
    Easy: { rows: 9, cols: 9, totalMines: 10 },
    Medium: { rows: 16, cols: 16, totalMines: 40 },
    Hard: { rows: 23, cols: 23, totalMines: 70 },
};


/*---------------------------- Variables (state) ----------------------------*/

let currentDifficulty = 'Easy';
let rows, cols, totalMines;
let cells = []; 
let gameOver = false;
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
/*----------------------------- Event Listeners -----------------------------*/
    //startBtn.addEventListener;
    //Event: right, left, both click




    document.addEventListener('DOMContentLoaded', function () {
        const startBtn = document.getElementById('startbtn');
        const gameArea = document.getElementById('game-area');
        const dropdownBox = document.getElementById('dropdownbox');
    
//=====================================================================================================
//===========================================Create cells==============================================
        startBtn.addEventListener('click', function () {
            const difficulty = dropdownBox.value;
            ({ rows, cols, totalMines } = DIFFICULTY_LEVELS[difficulty]);
    
            gameArea.innerHTML = '';
            cells = [];
    
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
                cell.adjacentMines = 0;
    
                cells.push(cell); 
                gameArea.appendChild(cell);




//===========================================Create cells==============================================
//=====================================================================================================



//=====================================================================================================
//==========================================Event: right, left, both click=============================               

                cell.addEventListener('click', function() {
                    handleLeftClick(cell, i);
                });



                cell.addEventListener('contextmenu', function(e) {
                    e.preventDefault();  
                    handleRightClick(cell);
                });



                cell.addEventListener('mousedown', function(e) {
                    if (e.buttons === 3) {  
                        handleBothClick(cell, i);
                    }
                });
            }
//==========================================Event: right, left, both click============================= 
//=====================================================================================================

            placeMines();
        
            
            calculateAdjacentMines();

            
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
          
        });


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
                -cols - 1,      -cols,      -cols + 1,  
                -1,                             1,   
                 cols - 1,       cols,       cols + 1     
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

//+++++++++++++++++++++++++++++++++++++++Test place mines++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++Test place mines++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






        function isDifferentRow(index, adjacentIndex, direction) {
            if (direction === -1 || direction === 1) {
                return Math.floor(index / cols) !== Math.floor(adjacentIndex / cols);
            }
            return false;
        }
        








//=====================================================================================================
//=======================================Function: right, left, both click=============================


//===============================================left==================================================
        function handleLeftClick(cell, index) {
            
            if (cell.isRevealed || gameOver || cell.isFlagged) {
                return;
            }
        
           
            cell.isRevealed = true;
        
            
            if (cell.isMine) {
                
                cell.style.backgroundColor = 'red';
                
                gameOver = true;
                
                alert('Game Over! You clicked on a mine.');
            
            } else {
                
                cell.style.backgroundColor = '#ddd';
                if (cell.adjacentMines > 0) {
                    cell.textContent = cell.adjacentMines;
                } else {
                    cell.textContent = '';
                }
               
            }


        }
    
//===============================================left==================================================


        function handleRightClick(cell) {
            
            if (cell.isFlagged) {
                
                cell.isFlagged = false;
                
                cell.textContent = '';
                
                cell.style.backgroundColor = '';
            } else {
                
                
                cell.isFlagged = true;
                
                cell.textContent = '🚩';
                
                cell.style.backgroundColor = 'yellow';
            }
        }
        
//===============================================both==================================================
        function handleBothClick(cell, index) {
            
            const directions = [
                -cols - 1,  
                -cols,     
                -cols + 1,  
                -1,         
                1,          
                cols - 1,   
                cols,       
                cols + 1    
            ];
        
           
            let flaggedMines = 0;
        
            
            directions.forEach(function(direction) {
            
                const adjacentIndex = index + direction;
        
                
                if (adjacentIndex >= 0 && adjacentIndex < cells.length && !isDifferentRow(index, adjacentIndex, direction)) {
                    const adjacentCell = cells[adjacentIndex];
                    
                    if (adjacentCell.isFlagged) {
                        flaggedMines++;
                    }
                }
            });
        
            
            if (flaggedMines === cell.adjacentMines) {
                
                directions.forEach(function(direction) {
                    const adjacentIndex = index + direction;
        
                
                    if (adjacentIndex >= 0 && adjacentIndex < cells.length && !isDifferentRow(index, adjacentIndex, direction)) {
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
        
    });
    