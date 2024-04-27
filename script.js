let grid;
let rows = 50;
let cols = 50;
let playing = false;

function initializeGrid() {
    grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
}

function drawGrid() {
    let container = document.getElementById('container');
    container.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i + '_' + j;
            cell.onclick = function() {
                if (!playing) {
                    if (this.style.backgroundColor === 'white') {
                        this.style.backgroundColor = 'black';
                        grid[i][j] = 1;
                    } else {
                        this.style.backgroundColor = 'white';
                        grid[i][j] = 0;
                    }
                }
            }
            container.appendChild(cell);
        }
    }
}

function updateGrid() {
    let nextGen = new Array(rows);
    for (let i = 0; i < rows; i++) {
        nextGen[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            let neighbors = countNeighbors(i, j);
            if (grid[i][j] === 0 && neighbors === 3) {
                nextGen[i][j] = 1;
            } else if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                nextGen[i][j] = 0;
            } else {
                nextGen[i][j] = grid[i][j];
            }
        }
    }
    grid = nextGen;
}

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let nRow = (row + i + rows) % rows;
            let nCol = (col + j + cols) % cols;
            count += grid[nRow][nCol];
        }
    }
    count -= grid[row][col];
    return count;
}

function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(i + '_' + j);
            if (grid[i][j] === 1) {
                cell.style.backgroundColor = 'black';
            } else {
                cell.style.backgroundColor = 'white';
            }
        }
    }
}

function startGame() {
    playing = true;
    play();
}

function stopGame() {
    playing = false;
}

function play() {
    updateGrid();
    updateView();
    if (playing) {
        setTimeout(play, 100);
    }
}

function clearGrid() {
    if (!playing) {
        initializeGrid();
        drawGrid();
    }
}

initializeGrid();
drawGrid();