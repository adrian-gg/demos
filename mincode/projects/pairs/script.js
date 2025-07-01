const CARDS = {
  aquarius: {
    data: {
      name: "Aquarius",
      symbol: "♒",
      color: "#00ffff",
    },
    image: {
      x: -60,
      y: -180,
    },
  },
  aries: {
    data: {
      name: "Aries",
      symbol: "♈",
      color: "#00ffff",
    },
    image: {
      x: 0,
      y: 0,
    },
  },
  cancer: {
    data: {
      name: "Cancer",
      symbol: "♋",
      color: "#00ffff",
    },
    image: {
      x: 0,
      y: -60,
    },
  },
  capricorn: {
    data: {
      name: "Capricorn",
      symbol: "♑",
      color: "#00ffff",
    },
    image: {
      x: 0,
      y: -180,
    },
  },
  gemini: {
    data: {
      name: "Gemini",
      symbol: "♊",
      color: "#00ffff",
    },
    image: {
      x: -120,
      y: 0,
    },
  },
  leo: {
    data: {
      name: "Leo",
      symbol: "♌",
      color: "#00ffff",
    },
    image: {
      x: -60,
      y: -60,
    },
  },
  libra: {
    data: {
      name: "Libra",
      symbol: "♎",
      color: "#00ffff",
    },
    image: {
      x: 0,
      y: -120,
    },
  },
  pisces: {
    data: {
      name: "Pisces",
      symbol: "♓",
      color: "#00ffff",
    },
    image: {
      x: -120,
      y: -180,
    },
  },
  sagittarius: {
    data: {
      name: "Sagittarius",
      symbol: "♐",
      color: "#00ffff",
    },
    image: {
      x: -120,
      y: -120,
    },
  },
  scorpio: {
    data: {
      name: "Scorpio",
      symbol: "♏",
      color: "#00ffff",
    },
    image: {
      x: -60,
      y: -120,
    },
  },
  taurus: {
    data: {
      name: "Taurus",
      symbol: "♉",
      color: "#00ffff",
    },
    image: {
      x: -60,
      y: 0,
    },
  },
  virgo: {
    data: {
      name: "Virgo",
      symbol: "♍",
      color: "#00ffff",
    },
    image: {
      x: -120,
      y: -60,
    },
  },
}
const DIFFICULTIES = {
  baby: { extraHints: 2, extraHintsTime: 600, extraHealth: 3 },
  easy: { extraHints: 1, extraHintsTime: 500, extraHealth: 2 },
  medium: { extraHints: 0, extraHintsTime: 400, extraHealth: 1 },
  hard: { extraHints: -1, extraHintsTime: 300, extraHealth: 0 },
  god: { extraHints: -2, extraHintsTime: 200, extraHealth: -1 },
}
const LEVELS = {
  1: { pairs: 8, hints: 6, hintsTime: 1600, maxHealth: 5 }, //16 e(3) m(5) h(6)
  2: { pairs: 10, hints: 8, hintsTime: 2000, maxHealth: 6 }, //20 e(4) m(6) h(8)
  3: { pairs: 12, hints: 10, hintsTime: 2400, maxHealth: 7 }, //24 e(5) m(7) h(10)
}
const difficulties = Object.keys(DIFFICULTIES)
const levels = Object.keys(LEVELS)

const game = {
  dificulty: 0, //0: easy, 1: medium, 2: hard
  level: 1,
  health: 4,
  maxHealth: 4,
  hints: 6,
  hintsTime: 1800,
  pairs: 8,
  levelMax: levels.length,
  winsCount: 0,
  maxWins: difficulties.length * levels.length,
}
let selectedCards = 0

//BOXES
const transitionBox = document.querySelector("#transition")
const viewLevelBox = document.querySelector("#viewlevel")
const viewLevelContentBox = document.querySelector("#viewlevelContent")
const nextBtn = document.querySelector("#next")
const boardBox = document.querySelector("#board")
const healthBox = document.querySelector("#health")

//UTILS
const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

//PRINTERS
function printCards() {
  boardBox.innerHTML = ""
  const cols = Math.max(2, Math.round(game.pairs / 2))
  boardBox.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
  boardBox.style.pointerEvents = "none"

  const hints = getRandomHints(game.hints, cards.length - 1)
  let countHints = 0

  cards.forEach((card, index) => {
    const cardBox = document.createElement("div")
    cardBox.classList.add("card")
    cardBox.dataset.card = card

    cardBox.addEventListener("click", () => {
      playCard(cardBox)
    })

    cardBox.addEventListener("mouseenter", () => {
      hoverCard(cardBox)
    })

    //Show hint
    if (hints.includes(index)) {
      setTimeout(() => {
        setTimeout(() => {
          cardBox.classList.add("card-hint")
          playAudio("card-slide-1")
          setTimeout(() => {
            cardBox.classList.remove("card-hint")
            playAudio("card-slide-1")
          }, game.hintsTime)
        }, 700)
      }, countHints * 70)
      countHints++
    }

    const faces = document.createElement("div")
    faces.classList.add("faces")

    const faceA = document.createElement("div")
    faceA.classList.add("face", "face-a")

    const faceB = document.createElement("div")
    faceB.classList.add("face", "face-b")
    faceB.style.backgroundPosition = `${CARDS[card].image.x / 5 / 2}rem ${
      CARDS[card].image.y / 5 / 2
    }rem`

    faces.appendChild(faceA)
    faces.appendChild(faceB)
    cardBox.appendChild(faces)
    boardBox.appendChild(cardBox)
  })

  setTimeout(() => {
    boardBox.style.pointerEvents = "initial"
  }, 2000)
}

function printLevel() {
  viewLevelContentBox.innerHTML = `  
    <div class="level">Level ${game.level}</div>
    <div class="data">
      <div>Difficulty: ${difficulties[game.dificulty]}</div>
      <div>Wins: ${game.winsCount}/${game.maxWins}</div>
    </div>
  `
}

function printHealth() {
  healthBox.dataset.health = game.health
  healthBox.innerHTML = ""
  for (let i = 0; i < game.maxHealth; i++) {
    healthBox.innerHTML += `<div class="heart${
      i < game.health ? "" : " heart-empty"
    }"></div>`
  }
}

//SETTERS
const setGame = () => {
  game.pairs = LEVELS[game.level].pairs
  game.maxHealth =
    LEVELS[game.level].maxHealth +
    DIFFICULTIES[difficulties[game.dificulty]].extraHealth
  game.health = game.maxHealth
  game.hints =
    LEVELS[game.level].hints +
    DIFFICULTIES[difficulties[game.dificulty]].extraHints
  game.hintsTime =
    LEVELS[game.level].hintsTime +
    DIFFICULTIES[difficulties[game.dificulty]].extraHintsTime
}

const setCards = () => {
  cards = shuffle(getRandomCards(game.pairs))
  //cards = getRandomCards(1)
}

//ACTIONS
function disableClick(disable = true) {
  boardBox.style.pointerEvents = disable ? "none" : "initial"
}

function playTransition(target, section, type) {
  target.classList.remove(`${section}-${type === "out" ? "in" : "out"}`)
  target.classList.add(`${section}-${type}`)

  if (section === "transition") {
    playAudio("transition-1")
  } else {
    playAudio("transition-2")
  }
}

/*-- Cards --*/
const getRandomHints = (length, cardsLength) => {
  const hints = new Set()

  if (length > cardsLength) return []

  while (hints.size < length) {
    const index = getRandomInt(0, cardsLength)
    hints.add(index)
  }

  return [...hints]
}

const getRandomCards = (length) => {
  const keyCards = Object.keys(CARDS)
  if (length > keyCards.length) return []
  const cards = new Set()

  while (cards.size < length) {
    const index = getRandomInt(0, keyCards.length - 1)
    cards.add(keyCards[index])
  }

  return [...cards, ...cards]
}

function selectCard(target, select = true) {
  if (select) {
    target.classList.add("card-selected")
    selectedCards++
    playAudio("card-slide-1")
  } else {
    target.classList.remove("card-selected")
    selectedCards = selectedCards - 1 < 0 ? 0 : selectedCards - 1
    if (!target.classList.contains("card-done")) {
      playAudio("card-slide-2")
    }
  }
}

function playCard(cardBox) {
  if (!cardBox.classList.contains("card-selected") && game.health > 0) {
    disableClick()

    if (selectedCards < 2) {
      //Is the first card selected
      selectCard(cardBox)
    }

    if (selectedCards === 2) {
      //Is the second card selected
      setTimeout(() => {
        const cardsSelected = Array.from(
          boardBox.querySelectorAll(".card-selected")
        )

        if (cardsSelected[0].dataset.card === cardsSelected[1].dataset.card) {
          cardsSelected.forEach((card) => {
            card.classList.add("card-done")
          })
          playAudio("hit")

          //Game won
          if (checkWin(cards)) win()
          setTimeout(() => disableClick(false), 60)
        } else {
          updateHealth(game.health - 1)

          //Game over
          if (game.health === 0) {
            setTimeout(() => {
              playAudio("gameover")
              lose()
            }, 200)
          } else {
            setTimeout(() => disableClick(false), 60)
          }
        }

        cardsSelected.forEach((card) => selectCard(card, false))
      }, 500)
    } else {
      setTimeout(() => disableClick(false), 60)
    }
  }
}

function hoverCard(cardBox) {
  playAudio("touch", 0.2)
}

/*-- Game --*/
function updateHealth(health) {
  game.health = health
  playAudio("cancel")
  playAudio("miss")
  printHealth()
}

function nextDifficulty() {
  game.dificulty =
    game.dificulty + 1 > difficulties.length - 1 ? 0 : game.dificulty + 1
}

function nextLevel() {
  game.level = game.level + 1 > game.levelMax ? 1 : game.level + 1
  setGame()
  selectedCards = 0
}

const checkWin = (cards) => {
  const cardsDone = Array.from(boardBox.querySelectorAll(".card-done"))
  return cardsDone.length === cards.length
}

function resetGame() {
  game.level = 1
  game.dificulty = 0
  setGame()
  selectedCards = 0
  winsCount = 0
}

function win() {
  game.winsCount++
  if (game.winsCount === game.maxWins) {
    //100% achieved
    playAudio("win-2")
    alert("You've achieved 100% of the game!")
  } else {
    playAudio("win-1")
    if (game.level === game.levelMax) {
      nextDifficulty()
    }
    nextLevel()
    playTree(pausedTreeIndex)
  }
}

function lose() {
  game.winsCount = 0
  resetGame()
  playTree(pausedTreeIndex)
}

/*-- Audio --*/
function playAudio(track, volume = 0.3) {
  const audio = new Audio(`./audio/${track}.ogg`)
  audio.volume = volume
  audio.play()
}

async function playTree(actionInx = 0) {
  pausedTreeIndex = null
  const a = treeActions[actionInx]
  if (a.type === "pause") {
    pausedTreeIndex = actionInx + 1
  } else if (a.type === "goto") {
    actionInx = a.props
    await playTree(actionInx)
  } else {
    const props = a.props ? a.props : null
    const isParamArray = Array.isArray(props)

    if (a.type === "async") {
      isParamArray ? await a.action(...props) : await a.action(props)
    } else {
      isParamArray ? a.action(...props) : a.action(props)
    }

    if (treeActions.length - 1 > actionInx && pausedTreeIndex === null) {
      await playTree(actionInx + 1)
    }
  }
}

//WAITERS
async function wait(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function waitNext(nextBtn) {
  return new Promise((resolve) => {
    const handler = () => {
      nextBtn.disabled = true
      nextBtn.removeEventListener("click", handler)
      resolve()
    }
    nextBtn.addEventListener("click", handler)
    nextBtn.disabled = false
  })
}

const treeActions = [
  { action: setGame },
  { action: setCards },
  { action: printLevel },
  { action: printHealth },
  { action: waitNext, props: nextBtn, type: "async" },
  { action: printCards },
  { action: playTransition, props: [viewLevelBox, "viewlevel", "out"] },
  { type: "pause" },
  //WIN
  { action: wait, props: 300, type: "async" },
  { action: playTransition, props: [transitionBox, "transition", "in"] },
  { action: wait, props: 800, type: "async" },
  { action: printLevel },
  { action: playTransition, props: [viewLevelBox, "viewlevel", "in"] },
  { action: playTransition, props: [transitionBox, "transition", "out"] },
  { action: setCards },
  { action: wait, props: 200, type: "async" },
  { type: "goto", props: 3 },
]
let cards
let pausedTreeIndex = null

playTree()
