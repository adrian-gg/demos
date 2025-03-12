const DEFAULT_BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]
const TUTORIAL = [
  {
    board: [
      ["X", 0, 0, 0, 0, 0, 0, 0],
      ["X", 0, 0, 0, 0, 0, 0, 0],
      ["X", 0, 0, 0, 0, 0, 0, 0],
      ["X", 0, 0, 0, 0, 0, 0, 0],
    ],
    text: "4 sections in a single sector",
  },
  {
    board: [
      ["X", "X", "X", 0, 0, 0, 0, "X"],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    text: "4 sections around a circle slice",
  },
  {
    board: [
      [0, 0, "X", 0, 0, 0, 0, 0],
      [0, "X", 0, 0, 0, 0, 0, 0],
      ["X", 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, "X"],
    ],
    text: "4 sections diagonally along concentric circles",
  },
]
const gameData = {
  turn: null,
  board: [],
}
const frameBox = $(".frame")

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) - min

const generateTurn = () => (generateRandomNumber(0, 1) === 0 ? "X" : "O")

const setBoard = (board) => {
  return board
    .map(
      (row, i) =>
        `<div class="row r${i}">${row
          .map(
            (tile, j) =>
              `<div class="tile c${j} tile-${tile}" data-tile="${i}-${j}"></div>`
          )
          .join("")}</div>`
    )
    .join("")
}

const renderRules = () => {
  const rulesBox = $("#rules")

  TUTORIAL.forEach((rule) => {
    const { board, text } = rule
    const box = `<div class="rule">
            <div class="board">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="400px"
                height="400px"
                viewBox="0 0 400 400"
                enable-background="new 0 0 400 400"
                xml:space="preserve"
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="1"
              >
                <g>
                  <g>
                    <path
                      d="M200,151.072c26.979,0,48.928,21.949,48.928,48.928S226.979,248.928,200,248.928S151.072,226.979,151.072,200
                      S173.021,151.072,200,151.072 M200,150.072c-27.575,0-49.928,22.354-49.928,49.928c0,27.575,22.353,49.928,49.928,49.928
                      s49.928-22.353,49.928-49.928C249.928,172.426,227.575,150.072,200,150.072L200,150.072z"
                    />
                    <path
                      d="M200,100.856c54.668,0,99.144,44.476,99.144,99.144S254.668,299.144,200,299.144S100.856,254.668,100.856,200
                      S145.332,100.856,200,100.856 M200,99.856c-55.308,0-100.144,44.836-100.144,100.144c0,55.309,44.836,100.144,100.144,100.144
                      S300.144,255.309,300.144,200C300.144,144.692,255.308,99.856,200,99.856L200,99.856z"
                    />
                    <path
                      d="M200,50.928c39.819,0,77.255,15.506,105.411,43.662c28.156,28.156,43.662,65.591,43.662,105.41
                      s-15.506,77.254-43.662,105.41S239.819,349.072,200,349.072c-39.819,0-77.254-15.506-105.41-43.662S50.928,239.819,50.928,200
                      c0-39.818,15.506-77.254,43.662-105.41C122.746,66.434,160.181,50.928,200,50.928 M200,49.928
                      c-82.883,0-150.072,67.19-150.072,150.072c0,82.883,67.189,150.072,150.072,150.072c82.884,0,150.072-67.189,150.072-150.072
                      C350.072,117.118,282.884,49.928,200,49.928L200,49.928z"
                    />
                    <path
                      d="M200,1c26.866,0,52.927,5.261,77.46,15.638c23.697,10.023,44.979,24.372,63.254,42.648
                      c18.276,18.276,32.625,39.558,42.647,63.254C393.739,147.074,399,173.135,399,200c0,26.866-5.261,52.927-15.638,77.46
                      c-10.023,23.697-24.371,44.979-42.647,63.255c-18.276,18.276-39.558,32.625-63.254,42.647C252.927,393.739,226.866,399,200,399
                      c-26.865,0-52.927-5.261-77.46-15.638c-23.696-10.023-44.979-24.372-63.254-42.647c-18.276-18.276-32.625-39.558-42.648-63.255
                      C6.261,252.927,1,226.866,1,200c0-26.865,5.261-52.926,15.638-77.459c10.023-23.696,24.372-44.979,42.648-63.254
                      C77.562,41.01,98.844,26.661,122.54,16.638C147.073,6.261,173.135,1,200,1 M200,0C89.542,0,0,89.543,0,200
                      c0,110.458,89.542,200,200,200c110.459,0,200-89.542,200-200C400,89.543,310.459,0,200,0L200,0z"
                    />
                  </g>
                  <g class="grid-lines" stroke-width="2">
                    <line x1="200" y1="0" x2="200" y2="400" />
                    <line x1="58.579" y1="58.579" x2="341.421" y2="341.421" />
                    <line x1="0" y1="200" x2="400" y2="200" />
                    <line x1="58.579" y1="341.421" x2="341.421" y2="58.579" />
                  </g>
                </g>
              </svg>
              <div class="tiles">${setBoard(board)}</div>
            </div>
            <div class="text"><p>${text}</p></div>
          </div>`
    rulesBox.append(box)
  })
}

const renderBoardGame = () => {
  const boardBox = $("#board .tiles")
  const box = `${setBoard(gameData.board)}`
  boardBox.empty().append(box)
}

const updateTile = (tile) => {
  const index = tile.split("-")
  gameData.board[index[0]][index[1]] = gameData.turn
}

const nextTurn = () => {
  if (gameData.turn === "X") {
    gameData.turn = "O"
    frameBox.addClass("O")
    frameBox.removeClass("X")
  } else {
    gameData.turn = "X"
    frameBox.addClass("X")
    frameBox.removeClass("O")
  }
}

const isWinner = () => {
  for (let i = 0; i < gameData.board[0].length; i++) {
    //winer by 4 sections in a single sector
    if (
      gameData.board[0][i] !== 0 &&
      gameData.board[0][i] === gameData.board[1][i] &&
      gameData.board[1][i] === gameData.board[2][i] &&
      gameData.board[2][i] === gameData.board[3][i]
    ) {
      return {
        player: gameData.board[0][i],
        tiles: [`0-${i}`, `1-${i}`, `2-${i}`, `3-${i}`],
      }
    }

    //4 sections diagonally along concentric circles
    if (
      gameData.board[0][i] !== 0 &&
      gameData.board[0][i % 8] === gameData.board[1][(i + 1) % 8] &&
      gameData.board[1][(i + 1) % 8] === gameData.board[2][(i + 2) % 8] &&
      gameData.board[2][(i + 2) % 8] === gameData.board[3][(i + 3) % 8]
    ) {
      return {
        player: gameData.board[0][i],
        tiles: [
          `0-${i % 8}`,
          `1-${(i + 1) % 8}`,
          `2-${(i + 2) % 8}`,
          `3-${(i + 3) % 8}`,
        ],
      }
    } else if (
      gameData.board[0][i] !== 0 &&
      gameData.board[0][(i + 8) % 8] === gameData.board[1][(i + 8 - 1) % 8] &&
      gameData.board[1][(i + 8 - 1) % 8] ===
        gameData.board[2][(i + 8 - 2) % 8] &&
      gameData.board[2][(i + 8 - 2) % 8] === gameData.board[3][(i + 8 - 3) % 8]
    ) {
      return {
        player: gameData.board[0][i],
        tiles: [
          `0-${(i + 8) % 8}`,
          `1-${(i + 8 - 1) % 8}`,
          `2-${(i + 8 - 2) % 8}`,
          `3-${(i + 8 - 3) % 8}`,
        ],
      }
    }
  }

  for (let i = 0; i < gameData.board.length; i++) {
    //4 sections diagonally along concentric circles
    const xIndex = gameData.board[i].join("").repeat(2).match("XXXX")?.index
    const oIndex = gameData.board[i].join("").repeat(2).match("OOOO")?.index
    if (xIndex != undefined) {
      return {
        player: "X",
        tiles: [
          `${i}-${xIndex % 8}`,
          `${i}-${(xIndex + 1) % 8}`,
          `${i}-${(xIndex + 2) % 8}`,
          `${i}-${(xIndex + 3) % 8}`,
        ],
      }
    } else if (oIndex != undefined) {
      return {
        player: "O",
        tiles: [
          `${i}-${oIndex % 8}`,
          `${i}-${(oIndex + 1) % 8}`,
          `${i}-${(oIndex + 2) % 8}`,
          `${i}-${(oIndex + 3) % 8}`,
        ],
      }
    }
  }

  if (!gameData.board.flat().includes(0)) {
    return {
      player: "T",
      tiles: [],
    }
  }

  return false
}

function startGame() {
  frameBox.addClass("playing")
  frameBox.addClass(gameData.turn)
}

function resetGame() {
  frameBox
    .removeClass("playing")
    .removeClass("win")
    .removeClass("X")
    .removeClass("O")
  gameData.board = DEFAULT_BOARD.map((row) => [...row])
  renderBoardGame()
  gameData.turn = gameData.turn === "X" ? "O" : "X"
  startGame()
}

gameData.turn = generateTurn()
gameData.board = DEFAULT_BOARD.map((row) => [...row])
renderRules()
renderBoardGame()

$(document).ready(function () {
  $("#btn-start").on("click", function () {
    startGame()
  })

  $("#btn-restart").on("click", function () {
    resetGame()
  })

  $("#board").on("click", ".tile", function () {
    const tile = $(this).attr("data-tile")
    updateTile(tile, gameData.turn)
    renderBoardGame()

    const winner = isWinner()
    if (winner.player === "T") {
      frameBox.addClass("win")
    } else if (winner.player) {
      frameBox.addClass("win")
      winner.tiles.forEach((t) => {
        $(`#board [data-tile="${t}"]`).addClass("winner")
      })
    } else {
      nextTurn()
    }
  })
})
