const COLORS = [
  { id: "cY", hex: "#fbbc05" },
  { id: "cO", hex: "#fc892a" },
  { id: "cR", hex: "#ea4335" },
  { id: "cP", hex: "#f461b2" },
  { id: "cV", hex: "#8642f4" },
  { id: "cB", hex: "#4285f4" },
  { id: "cC", hex: "#3ed2d7" },
  { id: "cG", hex: "#34a853" },
]
const colors = ["cB", "cR", "cG", "cY"]
const gridSize = {
  w: 3,
  h: 3,
}
const btnReload = $("#btnReload")
const grid = $("#grid")

/* -- UTILS -- */
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const shuffleArray = (originalAray, array) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  let arraysAreIdentical =
    JSON.stringify(originalAray) === JSON.stringify(array)
  if (arraysAreIdentical) {
    return shuffleArray(originalAray, array)
  }
  return array
}

const generateTiles = ({ w, h = w }) => {
  const tiles = new Array(h).fill(0).map(() => new Array(w).fill(0))

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      tiles[i][j] = {}
      const tile = tiles[i][j]
      tile.t =
        i === 0
          ? getRandomColor()
          : tiles[i - 1][j].b
          ? tiles[i - 1][j].b
          : getRandomColor()
      tile.r =
        j === w - 1
          ? getRandomColor()
          : tiles[i][j + 1].l
          ? tiles[i][j + 1].l
          : getRandomColor()
      tile.b =
        i === h - 1
          ? getRandomColor()
          : tiles[i + 1][j].t
          ? tiles[i + 1][j].t
          : getRandomColor()
      tile.l =
        j === 0
          ? getRandomColor()
          : tiles[i][j - 1].r
          ? tiles[i][j - 1].r
          : getRandomColor()
    }
  }

  let shuffledTiles = [...tiles.flat()]
  shuffledTiles = shuffleArray(tiles.flat(), shuffledTiles)
  return shuffledTiles
}

const normalizeTile = (tile) => {
  const tileNormalized = {}
  const tileCircles = tile.find(".circle")
  tileCircles.each((i, circle) => {
    const circleBox = $(circle)
    if (circleBox.hasClass("circle-top")) {
      tileNormalized.t = circleBox.data("c")
    }
    if (circleBox.hasClass("circle-right")) {
      tileNormalized.r = circleBox.data("c")
    }
    if (circleBox.hasClass("circle-bottom")) {
      tileNormalized.b = circleBox.data("c")
    }
    if (circleBox.hasClass("circle-left")) {
      tileNormalized.l = circleBox.data("c")
    }
  })
  return tileNormalized
}

const checkTiles = () => {
  const tiles = $(".tile")
  const tilesGrided = []

  for (let i = 0; i < tiles.length; i++) {
    const tile = $(tiles[i])
    if (i % gridSize.w === 0) {
      tilesGrided.push([])
    }
    const tileNormalized = normalizeTile(tile)
    tilesGrided[tilesGrided.length - 1].push(tileNormalized)
  }

  for (let i = 0; i < gridSize.h; i++) {
    for (let j = 0; j < gridSize.w; j++) {
      const tile = tilesGrided[i][j]
      if (i !== 0 && tile.t !== tilesGrided[i - 1][j].b) {
        return false
      } else if (j !== gridSize.w - 1 && tile.r !== tilesGrided[i][j + 1].l) {
        return false
      } else if (i !== gridSize.h - 1 && tile.b !== tilesGrided[i + 1][j].t) {
        return false
      } else if (j !== 0 && tile.l !== tilesGrided[i][j - 1].r) {
        return false
      }
    }
  }
  console.log(tilesGrided)
  return true
}

function renderTiles(tiles) {
  grid
    .css({
      gridTemplateColumns: `repeat(${gridSize.w}, var(--tile-size))`,
      gridTemplateRows: `repeat(${gridSize.h}, var(--tile-size))`,
    })
    .addClass("circle-on")
    .append(
      tiles.flat().map((tile) => {
        return `<div class="tile">
    <div class="circle circle-top ${tile.t}" data-c="${tile.t}"></div>
    <div class="circle circle-right ${tile.r}" data-c="${tile.r}"></div>
    <div class="circle circle-bottom ${tile.b}" data-c="${tile.b}"></div>
    <div class="circle circle-left ${tile.l}" data-c="${tile.l}"></div>
  </div>`
      })
    )

  setTimeout(() => {
    grid.removeClass("circle-on")
  }, 2000)
}

function retry() {
  gridSize.w = getRandomNumber(2, 4)
  gridSize.h = getRandomNumber(2, 4)
  grid.html("")
  const tiles = generateTiles(gridSize)
  renderTiles(tiles)
  btnReload.removeClass("btn-reload--show")
}

new Sortable(document.getElementById("grid"), {
  swap: true,
  swapClass: "highlight",
  animation: 150,
  onStart(evt) {
    evt.item.classList.add("placeholder")
  },
  onEnd(evt) {
    evt.item.classList.remove("placeholder")
    if (checkTiles()) {
      $(".tile").css("pointer-events", "none")
      setTimeout(() => {
        btnReload.addClass("btn-reload--show")
        alert("You win!")
      }, 1000)
    }
  },
})

gridSize.w = getRandomNumber(2, 4)
gridSize.h = getRandomNumber(2, 4)

const tiles = generateTiles(gridSize)
renderTiles(tiles)
