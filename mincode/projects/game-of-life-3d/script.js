const boardSize = {
  w: 10,
  h: 10,
  d: 10,
}

function generateStyles() {
  const stylesBox = document.querySelector(".styles")
  let styles = new Array(boardSize.d)
    .fill("0")
    .map((_, i) => {
      return `.layer:nth-child(${i + 1}){ transform: translateZ( ${
        i * -1
      }rem ); }\n`
    })
    .join("")

  stylesBox.innerHTML += styles
}

const getRandomNum = (min, max) => {
  return Math.round(Math.random() * (max + min) - min)
}

const generateCells = () => {
  const cells = []
  for (let i = 0; i < boardSize.d; i++) {
    const layer = []
    for (let j = 0; j < boardSize.h; j++) {
      layer.push(
        new Array(boardSize.w)
          .fill(0)
          .map((_) => (getRandomNum(0, 2) > 1 ? 1 : 0))
      )
    }
    cells.push(layer)
  }

  return cells
}
let arrCells = generateCells()

const boardBox = document.querySelector(".board")
boardBox.style.setProperty("--rows", boardSize.h)
boardBox.style.setProperty("--cols", boardSize.w)
boardBox.style.setProperty("--depth", boardSize.d)

function printCells(arrCells) {
  const layers = []
  for (let i = 0; i < arrCells.length; i++) {
    const layer = arrCells[i]
    const flatarrCells = layer.flatMap((row) => row)
    const cells = flatarrCells.map(
      (cell) => `<div class="cell" data-cell="${cell}"></div>`
    )
    layers.push(`<div class="layer">${cells.join("")}</div>`)
  }
  boardBox.innerHTML = layers.join("")
}

printCells(arrCells)
generateStyles()

/* function letLifeBeMade(cells) {
  arrCells = [...cells].map((depthCells, d) => {
    return depthCells.map((rowCells, r) => {
      return rowCells.map((cell, c) => {
        let countNeighborCells = 0
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
              if (i === 0 && j === 0 && k === 0) continue
              const depthIndex = (d + i + boardSize.d) % boardSize.d
              const rowIndex = (r + j + boardSize.h) % boardSize.h
              const colIndex = (c + k + boardSize.w) % boardSize.w
              countNeighborCells += cells[depthIndex][rowIndex][colIndex]
            }
          }
        }
        if (cell === 1) {
          if (countNeighborCells < 3 || countNeighborCells > 4) return 0 // Subpoblación o sobrepoblación
          if (countNeighborCells === 4 || countNeighborCells === 5) return 1 // Equilibrio perfecto
        } else {
          if (countNeighborCells === 4) return 1 // Reproducción
        }
        return cell
      })
    })
  })
} */

function letLifeBeMade(cells) {
  if (
    !Array.isArray(cells) ||
    !boardSize ||
    !boardSize.d ||
    !boardSize.h ||
    !boardSize.w
  )
    return "Parámetros no válidos."

  return cells.map((depthCells, d) => {
    return depthCells.map((rowCells, r) => {
      return rowCells.map((cell, c) => {
        let countNeighborCells = 0

        // Recorrer vecinos
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
              if (i === 0 && j === 0 && k === 0) continue // Ignorar la célula actual

              const depthIndex = (d + i + boardSize.d) % boardSize.d
              const rowIndex = (r + j + boardSize.h) % boardSize.h
              const colIndex = (c + k + boardSize.w) % boardSize.w

              countNeighborCells += cells[depthIndex][rowIndex][colIndex]
            }
          }
        }

        if (cell === 1) {
          if (countNeighborCells < 2 || countNeighborCells > 3) return 0 // Subpoblación o sobrepoblación
        } else {
          if (countNeighborCells === 3) return 1 // Reproducción
        }

        return cell
      })
    })
  })
}

const interval = setInterval(() => {
  arrCells = letLifeBeMade(arrCells)
  printCells(arrCells)
}, 200)
