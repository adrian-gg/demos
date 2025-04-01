$(document).ready(function () {
  const buttonsBox = $(".btn")
  const btnStartBox = $("#start")
  const btnDecodeBox = $("#decode")
  const btnRestartBox = $("#restart")
  const btnRetryBox = $("#retry")
  const lightsBox = $("#lights")
  const rowsBox = $(".row")
  const tileBox = $(".tile")
  const checksBox = $(".checks")
  const checkBox = $(".check")
  const lightBox = $(".light")

  /* --- HELPERS --- */
  const isPlayable = (rowIndex) => {
    const row = gameData.board[rowIndex]
    if (new Set(row).size !== 4 || row.includes(-1)) {
      return false
    }
    return true
  }

  const unscrambleList = (array) => {
    let desordenado

    do {
      desordenado = [...array]
      for (let i = desordenado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[desordenado[i], desordenado[j]] = [desordenado[j], desordenado[i]]
      }
    } while (array.join("") === desordenado.join(""))

    return desordenado
  }

  const getRandomItems = (arr, n) => {
    const shuffled = arr.slice(0)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = shuffled[i]
      shuffled[i] = shuffled[j]
      shuffled[j] = temp
    }
    return shuffled.slice(0, n)
  }

  /* --- CONSTANTS --- */
  const defaultLights = [
    { light: "B", color: "#4285f4" },
    { light: "C", color: "#1accc7" },
    { light: "G", color: "#34a853" },
    { light: "R", color: "#ea4335" },
    { light: "O", color: "#ff8522" },
    { light: "P", color: "#ff63f0" },
    { light: "V", color: "#be42f4" },
    { light: "Y", color: "#fbbc05" },
  ]
  const defaultBoard = [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ]
  const defaulTries = defaultBoard.length

  const gameData = {
    board: defaultBoard.map((row) => [...row]),
    tries: defaulTries,
    turn: 0,
    code: [],
    lights: getRandomItems(defaultLights, 4),
  }

  /* --- PRINTERS --- */

  function printLights() {
    lightsBox.addClass("on")

    lightBox.each(function () {
      const light = $(this)
      const lightIndex = light.index() - 1
      light.css("background-color", gameData.lights[lightIndex].color)
    })
  }

  function printTileLightColor(newCode, tile) {
    tile.attr("data-code", newCode)
    tile.css("background-color", gameData.lights[newCode].color)
  }

  function printHits(hits) {
    $(rowsBox[gameData.turn]).children(".checks").addClass("checked")
    $(`.row[data-i="${gameData.turn}"] .check`).each(function () {
      const check = $(this)
      const checkIndex = check.index() - 1
      if (hits - 1 > checkIndex) {
        check.css("background-color", "#f5f5f5")
      } else {
        check.css("background-color", "#303030")
      }
    })
  }

  /* --- ACTIONS --- */
  function start() {
    buttonsBox.hide()
    btnDecodeBox.prop("disabled", true)
    btnDecodeBox.show()
    rowsBox.removeClass("playing")
    $(rowsBox[gameData.turn]).addClass("playing")

    printLights()
  }

  function nextTurn() {
    gameData.turn++
    if (gameData.turn === gameData.board.length) {
      alert("Game over!")
      btnRetryBox.show()
      rowsBox.removeClass("playing")
    } else {
      btnDecodeBox.show()
      btnDecodeBox.prop("disabled", true)
      rowsBox.removeClass("playing")
      $(rowsBox[gameData.turn]).addClass("playing")
    }
  }

  function resetGameData() {
    gameData.board = defaultBoard.map((row) => [...row])
    gameData.tries = defaulTries
    gameData.turn = 0
    //gameData.code = unscrambleList(gameData.code)
    gameData.lights = getRandomItems(defaultLights, 4)

    rowsBox.removeClass("playing")
    tileBox.removeAttr("data-code")
    tileBox.css("background-color", "")
    checksBox.removeClass("checked")
    checkBox.css("background-color", "")
    printLights()
  }

  function setCode(rowIndex, colIndex, newCode) {
    gameData.board[rowIndex][colIndex] = newCode
  }

  function getTileLightColor(rowIndex, colIndex) {
    let newCode = 0

    if (gameData.board[rowIndex][colIndex] !== -1) {
      newCode = (gameData.board[rowIndex][colIndex] + 1) % 4
    }

    return newCode
  }

  function getHits() {
    const code = gameData.code
    let count = 0

    for (let i = 0; i < code.length; i++) {
      if (gameData.board[gameData.turn][i] === gameData.code[i]) {
        count++
      }
    }

    return count
  }

  /* --- HANDLERS --- */

  btnStartBox.click(function () {
    start()
  })

  tileBox.click(function () {
    const tile = $(this)
    const row = tile.parent().parent()
    const rowIndex = row.index()
    const colIndex = tile.index() % row.children(".tiles").children().length
    let newCode = getTileLightColor(rowIndex, colIndex, tile)

    printTileLightColor(newCode, tile)
    setCode(rowIndex, colIndex, newCode)

    if (isPlayable(rowIndex)) {
      btnDecodeBox.prop("disabled", false)
    } else {
      btnDecodeBox.prop("disabled", true)
    }
  })

  btnDecodeBox.click(function () {
    if (gameData.turn === 0)
      gameData.code = unscrambleList(
        new Array(4).fill(0).map((_, i) => gameData.board[0][i])
      )

    const hits = getHits()
    printHits(hits)

    btnDecodeBox.prop("disabled", true)

    //wait for animation
    setTimeout(() => {
      buttonsBox.hide()
      if (hits === 4) {
        btnRestartBox.show()
        alert("You won!")
      } else {
        nextTurn()
      }
    }, 2500)
  })

  btnRestartBox.click(function () {
    resetGameData()
    start()
  })

  btnRetryBox.click(function () {
    resetGameData()
    start()
  })
})
