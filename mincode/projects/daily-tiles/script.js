const bodyBox = $("body")
const tableBox = $(".table")
const resultTitleBox = $(".result-title")
const resultContentBox = $(".result-content")
const baseTiles = [
  [0, 2, -1, 1], // Set 3
  [9, 11, 8, 10], // Set 1
  [-4, -2, -5, -3], // Set 4
  [4, 6, 3, 5], // Set 2
]
const selectedTiles = []
const date = new Date()
const day = date.getDate()
const month = date.getMonth() + 1

function renderTiles(tiles) {
  tableBox.empty()
  tiles.forEach((row, i) => {
    row.forEach((num, j) => {
      bodyBox.prepend(`
      <input id="tile-${i}-${j}" class="input" type="checkbox">
      `)
      tableBox.append(`
      <label for="tile-${i}-${j}" class="tile">
    <span class="tile-num">${num}</span>
  </label>`)
    })
  })
}

function generateTiles(lang) {
  let dateSum
  if (lang == "es" || lang == "es-ES") {
    dateSum = Number(`${day}${month}`)
  } else {
    dateSum = Number(`${month}${day}`)
  }
  const baseOffset = 11
  const adjustedSum = dateSum - baseOffset
  const quotient = Math.floor(adjustedSum / 4)

  renderTiles(createNewTileSet(quotient, adjustedSum % 4))
}

function createNewTileSet(quotient, remainder) {
  const reorderedBaseTiles = [
    baseTiles[1],
    baseTiles[3],
    baseTiles[0],
    baseTiles[2],
  ]

  const adjustedTiles = reorderedBaseTiles.map((tileSet, index) => {
    return tileSet.map((num) => {
      return num + quotient + (index + 1 <= remainder ? 1 : 0)
    })
  })

  const newTileSet = [
    adjustedTiles[2],
    adjustedTiles[0],
    adjustedTiles[3],
    adjustedTiles[1],
  ]

  return newTileSet
}

function renderResult(lang) {
  resultContentBox.empty().append(`
  <div class="tile"><span class="tile-num">${selectedTiles[0]}</span></div>
  <div class="tile"><span class="tile-num">+</span></div>
  <div class="tile"><span class="tile-num">${selectedTiles[1]}</span></div>
  <div class="tile"><span class="tile-num">+</span></div>
  <div class="tile"><span class="tile-num">${selectedTiles[2]}</span></div>
  <div class="tile"><span class="tile-num">+</span></div>
  <div class="tile"><span class="tile-num">${selectedTiles[3]}</span></div>
  <div class="tile"><span class="tile-num">=</span></div>
  <div class="tile">
    <span class="tile-num">
      <span>${lang == "es" || lang == "es-ES" ? day : month}</span>
      <span>/</span>
      <span>${lang == "es" || lang == "es-ES" ? month : day}</span>
    </span>
  </div>
  `)
}

$(document).ready(function () {
  const lang = navigator.language || navigator.userLanguage

  resultTitleBox.append(`
  ${
    lang == "es" || lang == "es-ES" ? "¿Qué día es hoy?" : "What day is today?"
  }`)
  generateTiles(lang)

  $(".input").on("click", function () {
    const inputId = $(this).attr("id")
    const inputValue = $(this)[0].checked
    const tileValue = $(`label[for="${inputId}"]`).children()[0].innerText

    if (inputValue) {
      selectedTiles.push(tileValue)
    } else {
      selectedTiles.splice(selectedTiles.indexOf(tileValue), 1)
    }

    if (selectedTiles.length === 4) {
      renderResult(lang)
    } else {
      resultContentBox.empty()
    }
  })
})
