const boardBox = document.querySelector("#board")
const keyboardBox = document.querySelector("#keyboard")
let selectedKey = "1"

const isBoardFull = () => {
  if (
    board
      .map((row) => row.join(""))
      .join("")
      .includes(".")
  )
    return false
  return true
}

const isValidSudoku = (blocks) => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0))

  // Reconstruir el tablero a partir de los bloques
  for (let block = 0; block < 9; block++) {
    const blockRow = Math.floor(block / 3)
    const blockCol = block % 3
    for (let i = 0; i < 9; i++) {
      const row = blockRow * 3 + Math.floor(i / 3)
      const col = blockCol * 3 + (i % 3)
      let value = blocks[block][i]
      board[row][col] = value === "." ? 0 : Number(value)
    }
  }

  // Valida una fila, columna o bloque
  function isValidGroup(group) {
    const nums = group.map((n) => Number(n)).filter((n) => n !== 0)
    const set = new Set(nums)
    return (
      nums.length === set.size &&
      nums.every((n) => Number.isInteger(n) && n >= 1 && n <= 9)
    )
  }

  // Validar filas
  for (let row = 0; row < 9; row++) {
    if (!isValidGroup(board[row])) return false
  }

  // Validar columnas
  for (let col = 0; col < 9; col++) {
    const colVals = board.map((row) => row[col])
    if (!isValidGroup(colVals)) return false
  }

  // Validar bloques
  for (let block of blocks) {
    const group = block.map((n) => Number(n)).filter((n) => n !== 0)
    if (!isValidGroup(group)) return false
  }

  return true
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//ACTIONS
function generateSudoku(difficulty = 40) {
  const holes = difficulty
  const board = Array.from({ length: 9 }, () => Array(9).fill(0))

  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false
    }
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[startRow + r][startCol + c] === num) return false
      }
    }
    return true
  }

  function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
          for (const num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              if (fillBoard(board)) return true
              board[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }

  fillBoard(board)
  const puzzle = board.map((row) => [...row])

  let removed = 0
  while (removed < holes) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0
      removed++
    }
  }

  // Convert full board into 9 blocks of 3x3
  function getBlocksFromBoard(board) {
    const blocks = Array.from({ length: 9 }, () => [])
    for (let blockRow = 0; blockRow < 3; blockRow++) {
      for (let blockCol = 0; blockCol < 3; blockCol++) {
        const blockIndex = blockRow * 3 + blockCol
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const row = blockRow * 3 + i
            const col = blockCol * 3 + j
            blocks[blockIndex].push(
              puzzle[row][col] === 0 ? "." : puzzle[row][col]
            )
          }
        }
      }
    }
    return blocks
  }

  return getBlocksFromBoard(puzzle)
}

function printBoard(board) {
  const boardBox = document.querySelector("#board")
  boardBox.innerHTML = ""

  for (let i = 0; i < board.length; i++) {
    const row = document.createElement("div")
    row.classList.add("row")

    for (let j = 0; j < board[i].length; j++) {
      const cell = document.createElement("div")
      cell.classList.add("cell")
      cell.dataset.index = `${i}-${j}`
      if (board[i][j] !== ".") cell.classList.add("cell-block")
      cell.innerHTML = board[i][j] === "." ? "" : board[i][j]
      row.appendChild(cell)
    }

    boardBox.appendChild(row)
  }
}

function updateButton(d = true) {
  const solveButton = document.querySelector("button")
  solveButton.disabled = d
}

function solve(board) {
  solveButton.disabled = true

  const isSolved = isValidSudoku(board)
  if (isSolved) {
    alert("Solved!")
  } else {
    alert("Sorry, not solved!")
  }

  setTimeout(() => {
    solveButton.disabled = false
  }, 500)
}

//HANDLERS
keyboardBox.addEventListener("input", (e) => {
  const key = e.target.value
  if (key === "") return
  selectedKey = key
})

document.addEventListener("keydown", (e) => {
  const key = e.key
  if (
    key === "1" ||
    key === "2" ||
    key === "3" ||
    key === "4" ||
    key === "5" ||
    key === "6" ||
    key === "7" ||
    key === "8" ||
    key === "9"
  ) {
    selectedKey = key
    keyboardBox.querySelector(`input[value="${key}"]`).checked = true
  }
})

boardBox.addEventListener("click", (e) => {
  const target = e.target
  if (target.classList.contains("cell")) {
    const cell = target
    const newValue = cell.innerHTML === selectedKey ? "" : selectedKey
    cell.innerHTML = newValue

    board[parseInt(cell.dataset.index.split("-")[0])][
      parseInt(cell.dataset.index.split("-")[1])
    ] = newValue === "" ? "." : selectedKey

    updateButton(!isBoardFull())
  }
})

const solveButton = document.querySelector("button")
const board = generateSudoku(getRandomInt(30, 60))
solveButton.addEventListener("click", () => solve(board))
printBoard(board)
