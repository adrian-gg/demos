const infoBox = document.querySelector("#info")
const bodyBox = document.querySelector("body")
const boardBox = document.querySelector("#board")
const alertBox = document.querySelector("#alert")
const tilesBox = document.querySelectorAll(".tile")
const btnPlayerOneBox = document.querySelector("#btn-P1")
const btnPlayerTwoBox = document.querySelector("#btn-P2")
const gradientsBox = document.querySelector(".gradients")

const data = {
  btns: {
    P1: btnPlayerOneBox,
    P2: btnPlayerTwoBox,
  },
}

let boardGame = new Array(16).fill(0)
let countPawnsSelected = 0
const MAX_PLAYS = [1, 3, 5, 7]
let turn = null

/* -- UTILS -- */
const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

function clearBoard() {
  boardBox.innerHTML = ""
}

function updateBtnState(state, value, btn) {
  btn[state] = value
}

function renderPawns(pawns) {
  let currentRow = null
  clearBoard()

  /*
     1
    123
   12345
  1234567
  */
  //0 - 1 2 3 - 4 5 6 7 8 - 9 10 11 12 13 14 15
  pawns.forEach((pawn, i) => {
    const tileBox = document.createElement("div")
    tileBox.classList.add("tile")
    tileBox.dataset.pawn = i
    tileBox.dataset.row = i < 1 ? 1 : i < 4 ? 2 : i < 9 ? 3 : 4
    //tileBox.style.transform = `rotate(${(360 / 13) * i}deg) translateY(22rem)`

    if (pawn !== 0) {
      const pawnBox = document.createElement("div")
      pawnBox.classList.add("pawn")
      tileBox.classList.add(pawn)
      tileBox.appendChild(pawnBox)
    } else {
      tileBox.addEventListener("click", function () {
        const row = this.dataset.row

        if (
          [...this.classList].includes("selected") &&
          countPawnsSelected > 0
        ) {
          countPawnsSelected--
          this.classList.remove("selected")
          boardGame[i] = 0

          if (countPawnsSelected === 0) currentRow = null
        } else if (countPawnsSelected < MAX_PLAYS[row - 1]) {
          if (currentRow === null) currentRow = row
          else if (currentRow !== row) return

          countPawnsSelected++
          this.classList.add("selected")
          boardGame[i] = turn
        }

        if (countPawnsSelected > 0) {
          updateBtnState("disabled", false, data.btns[turn])
        } else {
          updateBtnState("disabled", true, data.btns[turn])
        }
      })
    }

    boardBox.appendChild(tileBox)
  })
}

function nextTurn() {
  if (turn) {
    turn = turn === "P1" ? "P2" : "P1"
  } else {
    turn = `P${getRandomNumber(1, 2)}`
  }

  bodyBox.className = ""
  bodyBox.classList.add(turn)
}

function startGame() {
  infoBox.style.display = "none"
  renderPawns(boardGame)
  nextTurn()
  updateGradients()
  updateBtnState("disabled", true, btnPlayerOneBox)
  updateBtnState("disabled", true, btnPlayerTwoBox)
}

//startGame()

function resetGame() {
  turn = null
  boardGame = new Array(16).fill(0)
  countPawnsSelected = 0
}

function playAgain() {
  resetGame()
  alertBox.classList.remove("open")
  startGame()
}

function updateGradients() {
  gradientsBox.style.opacity = 0
  setTimeout(() => {
    gradientsBox.style.opacity = 1
  }, 1000)
}

function updateData() {
  countPawnsSelected = 0
  updateBtnState("disabled", true, data.btns[turn])
  updateGradients()
  renderPawns(boardGame)
}

const getWinner = () => {
  if (boardGame.some((p) => p === 0)) return null
  return turn
}

function renderAlert(winner) {
  if (winner) {
    alertBox.innerHTML = ""

    for (let i = 1; i < 3; i++) {
      const modalBox = document.createElement("div")
      modalBox.classList.add("modal")
      modalBox.classList.add(i === 1 ? "modal-top" : "modal-bot")

      const pBox = document.createElement("p")
      pBox.innerText = winner === `P${i}` ? "¡Has ganado!" : "Perdiste."

      const buttonBox = document.createElement("button")
      buttonBox.innerText = "Volver a jugar"
      buttonBox.addEventListener("click", () => playAgain())

      modalBox.appendChild(pBox)
      modalBox.appendChild(buttonBox)
      alertBox.appendChild(modalBox)
    }

    setTimeout(() => {
      alertBox.classList.add("open")
    }, 100)
  }
}

;[btnPlayerOneBox, btnPlayerTwoBox].forEach((btn) =>
  btn.addEventListener("click", function () {
    updateData()
    setTimeout(() => {
      nextTurn()
      renderAlert(getWinner())
    }, 200)
  })
)
