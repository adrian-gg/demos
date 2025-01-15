const gameContainerBox = document.querySelector(".game-container")
let turn = "❌" // '⭕'
const GAMEBOARD = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
]

const updateUI = (winner, board) => {
  console.log(winner)
  if (winner.length !== 0) {
    winner[0].forEach((cell, i) => {
      const cellBox = document.querySelector(`[data-i="${board ?? i}-${cell}"]`)
      cellBox.classList.add("cell--win")
    })

    gameContainerBox.classList.add("game-win")
  }
}

const checkWinner = () => {
  const conditionsToWinSameBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const conditionsToWinDieferentBoard = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
    [5, 5, 5],
    [6, 6, 6],
    [8, 8, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 1, 0],
    [5, 1, 3],
    [8, 1, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 3, 0],
    [7, 4, 1],
    [8, 5, 2],
    [0, 4, 8],
    [2, 4, 6],
    [6, 4, 2],
    [8, 4, 0],
  ]

  let board = null

  const winnerInSameBoard = conditionsToWinSameBoard.filter((condition) => {
    for (let i = 0; i < GAMEBOARD.length; i++) {
      if (
        GAMEBOARD[i][condition[0]] &&
        GAMEBOARD[i][condition[1]] &&
        GAMEBOARD[i][condition[2]] &&
        GAMEBOARD[i][condition[0]] === GAMEBOARD[i][condition[1]] &&
        GAMEBOARD[i][condition[1]] === GAMEBOARD[i][condition[2]]
      ) {
        board = i
        return true
      }
    }
    return false
  })

  if (winnerInSameBoard.length !== 0) return updateUI(winnerInSameBoard, board)

  const winnerInDiferentBoard = conditionsToWinDieferentBoard.filter(
    (condition) => {
      return (
        GAMEBOARD[0][condition[0]] &&
        GAMEBOARD[1][condition[1]] &&
        GAMEBOARD[2][condition[2]] &&
        GAMEBOARD[0][condition[0]] === GAMEBOARD[1][condition[1]] &&
        GAMEBOARD[1][condition[1]] === GAMEBOARD[2][condition[2]]
      )
    }
  )

  updateUI(winnerInDiferentBoard, board)
}

const createGameBoards = () => {
  for (let i = 0; i < GAMEBOARD.length; i++) {
    const gameBoardBox = document.createElement("div")
    gameBoardBox.classList.add("game-board")

    for (let j = 0; j < GAMEBOARD[i].length; j++) {
      const cell = document.createElement("div")
      const pawn = document.createElement("div")
      cell.classList.add("game-cell")
      cell.setAttribute("data-i", `${i}-${j}`)
      pawn.classList.add("cell-pawn")

      cell.addEventListener("click", () => {
        cell.classList.add("cell--played")
        pawn.innerText = turn
        turn = turn === "❌" ? "⭕" : "❌"
        GAMEBOARD[i][j] = turn
        checkWinner()
      })

      cell.appendChild(pawn)
      gameBoardBox.appendChild(cell)
    }

    gameContainerBox.appendChild(gameBoardBox)
  }
}

createGameBoards()
