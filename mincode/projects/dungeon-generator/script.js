const ROOM_TYPES = {
  EMPTY: { icon: "⬛", type: "EMPTY" },
  START: { icon: "🟩", type: "START" },
  NORMAL: { icon: "🟫", type: "NORMAL" },
  BOSS: { icon: "💀", type: "BOSS" },
  TREASURE: { icon: "👑", type: "TREASURE" },
  SHOP: { icon: "🪙", type: "SHOP" },
}

const MAX_SPECIAL_ROOMS = 2
const SPECIAL_ROOM_TYPES = ["TREASURE", "SHOP"]

// UTILS
const getRandomSeed = (length = 8) =>
  Array.from({ length }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  ).join("")

const seedToNumber = (seed) => {
  let num = 0
  for (let i = 0; i < seed.length; i++) {
    num = (num * 31 + seed.charCodeAt(i)) >>> 0
  }
  return num
}

const mulberry32 = (seed) => {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const getRandomInt = (min, max, rand) =>
  Math.floor(rand() * (max - min + 1)) + min

const shuffleArray = (array, rand) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// MAP GENERATION
function generateMap(seed) {
  const seedNum = seedToNumber(seed)
  const rand = mulberry32(seedNum)

  const GRID_SIZE = getRandomInt(0, 1, rand) === 0 ? 9 : 11
  const TOTAL_ROOMS =
    GRID_SIZE === 9
      ? getRandomInt(GRID_SIZE + 5, GRID_SIZE * 2, rand)
      : getRandomInt(GRID_SIZE * 2, GRID_SIZE * 3, rand)

  const map = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(null)
  )
  const startX = Math.floor(GRID_SIZE / 2)
  const startY = Math.floor(GRID_SIZE / 2)
  map[startY][startX] = { type: "START", order: 0 }

  const getNeighbours = (x, y) => {
    const directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]
    return directions
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(
        ([nx, ny]) => nx >= 0 && ny >= 0 && nx < GRID_SIZE && ny < GRID_SIZE
      )
  }

  const countRoomNeighbours = (x, y) =>
    getNeighbours(x, y).filter(([nx, ny]) => map[ny][nx]).length

  const getAllRooms = () => {
    const rooms = []
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (map[y][x]) rooms.push([x, y])
      }
    }
    return rooms
  }

  const generateRooms = () => {
    let currentRooms = 1
    while (currentRooms < TOTAL_ROOMS) {
      const x = getRandomInt(0, GRID_SIZE - 1, rand)
      const y = getRandomInt(0, GRID_SIZE - 1, rand)
      if (map[y][x]) continue
      const connected = getNeighbours(x, y).filter(([nx, ny]) => map[ny][nx])
      const targetNeighbours = getRandomInt(1, 100, rand) <= 90 ? 1 : 2
      if (connected.length === targetNeighbours) {
        map[y][x] = { type: "NORMAL", order: currentRooms }
        currentRooms++
      }
    }
  }

  generateRooms()

  const allRooms = getAllRooms()
  const startRoom = [startX, startY]

  const manhattan = ([x1, y1], [x2, y2]) =>
    Math.abs(x1 - x2) + Math.abs(y1 - y2)

  // Buscar la sala BOSS: solo puede tener un vecino y ser NORMAL
  const bossCandidates = allRooms.filter(([x, y]) => {
    return countRoomNeighbours(x, y) === 1 && map[y][x].type === "NORMAL"
  })

  bossCandidates.sort(
    (a, b) => manhattan(startRoom, b) - manhattan(startRoom, a)
  )
  const bossRoom = bossCandidates[0]
  if (bossRoom) {
    map[bossRoom[1]][bossRoom[0]].type = "BOSS"
  }

  // Habitaciones especiales excluyendo la de BOSS
  let specialCandidates = allRooms.filter(([x, y]) => {
    const neighbors = countRoomNeighbours(x, y)
    const cell = map[y][x]
    return (
      neighbors === 1 &&
      cell.type === "NORMAL" &&
      !(x === bossRoom[0] && y === bossRoom[1])
    )
  })

  shuffleArray(specialCandidates, rand)
  specialCandidates = specialCandidates.slice(0, MAX_SPECIAL_ROOMS)

  for (let i = 0; i < specialCandidates.length; i++) {
    const [x, y] = specialCandidates[i]
    map[y][x].type = SPECIAL_ROOM_TYPES[i % SPECIAL_ROOM_TYPES.length]
  }

  // Pasar a íconos
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const cell = map[y][x]
      map[y][x] = cell ? ROOM_TYPES[cell.type].icon : ROOM_TYPES.EMPTY.icon
    }
  }

  printMap(GRID_SIZE, TOTAL_ROOMS, seed, map)
}

function printMap(gridSize, totalRooms, seed, map) {
  const boardBox = document.getElementById("board")
  const dataBox = document.getElementById("data")
  boardBox.innerHTML = `
    <div class="grid" style="--grid-size: ${gridSize}">${map
    .map((row) => row.map((c) => `<span data-type="${c}">${c}</span>`).join(""))
    .join("")}</div>
    `
  dataBox.innerHTML = `<span>SEED: ${seed} | SIZE: ${gridSize}x${gridSize} | ROOMS: ${totalRooms}</span>`
}

function printLegend() {
  const legend = document.getElementById("legend")
  const roomTypes = Object.values(ROOM_TYPES)
  legend.innerHTML = `
      ${roomTypes
        .filter((room) => room.type !== "EMPTY")
        .map((room) => `<span>${room.icon} ${room.type}</span>`)
        .join("|")}`
}

document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("generate")
  generateBtn.addEventListener("click", function (e) {
    e.preventDefault()
    generateMap(getRandomSeed())
  })

  generateMap(getRandomSeed())
  printLegend()
})
