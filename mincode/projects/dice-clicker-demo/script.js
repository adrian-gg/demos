const FPS = 30
const UPGRADES = [
  { name: "dice", icon: "●", level: 0, cost: 10, coefficient: 1.1, value: 0 },
  {
    name: "spades",
    icon: "♠",
    level: 0,
    cost: 200,
    coefficient: 1.05,
    value: 1,
  },
  {
    name: "hearts",
    icon: "♥",
    level: 0,
    cost: 1500,
    coefficient: 1.15,
    value: 10,
  },
  {
    name: "clubs",
    icon: "♣",
    level: 0,
    cost: 10000,
    coefficient: 1.5,
    value: 100,
  },
  {
    name: "diamonds",
    icon: "♦",
    level: 0,
    cost: 100000,
    coefficient: 1.5,
    value: 1000,
  },
]
const UPGRADE_NAMES = UPGRADES.map((upgrade) => upgrade.name)
const AUDIOS = [
  { name: "dice", format: "mp3" },
  { name: "bg", format: "mp3" },
  { name: "buy", format: "ogg" },
]
const CURRENCY_SYMBOL = "$"

//-- UTILS ---------------------------------------------------------------------

const uuiid = () => "ID" + Math.random().toString(36).substring(2, 15)

const formatNumber = (number) => {
  number = Number(number) // Asegura que sea un número

  if (number >= 1e9) {
    return number.toExponential(2).replace("+", "")
  }

  const parts = number.toFixed(2).split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  /* if (parts[1] === "00") {
    return parts[0]
  } */

  //return parts.join(",")
  return parts[0]
}

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

const encodeBase64 = (data) => {
  try {
    const jsonString = JSON.stringify(data)
    return btoa(jsonString)
  } catch (error) {
    console.error("Error al codificar Base64:", error)
  }
}

const decodeBase64 = (encodedData) => {
  try {
    const decodedString = atob(encodedData)
    return JSON.parse(decodedString)
  } catch (error) {
    console.error("Error al descodificar Base64:", error)
  }
}

//-- GAME ----------------------------------------------------------------------

class Game {
  constructor(currency = 0, upgrades) {
    this.fps = Math.floor(1000 / FPS)
    this.currency = currency
    this.upgrades = {}
    const upg = upgrades ?? UPGRADES

    upg.forEach((upgrade) => {
      const upg = UPGRADES.find((u) => u.name === upgrade.name)
      const id = uuiid()
      this.upgrades[id] = new Upgrade(
        id,
        upgrade.name ?? upg.name,
        upgrade.level ?? upg.level,
        upgrade.cost ?? upg.cost,
        upgrade.coefficient ?? upg.coefficient,
        upgrade.value ?? upg.value,
        upgrade.icon ?? upg.icon
      )
    })

    this.audios = {}
    const aud = AUDIOS

    aud.forEach((audio) => {
      this.audios[audio.name] = new Audio(
        `./assets/${audio.name}.${audio.format}`
      )
    })
  }

  updateCurrency(increment) {
    this.currency += increment
    printCurrency()
    return this.currency
  }

  saveData() {
    const upgrades = Object.values(this.upgrades)
    const data = [
      this.currency,
      upgrades.map((upgrade) => {
        return {
          name: upgrade.name,
          level: upgrade.level,
          cost: upgrade.cost,
        }
      }),
    ]

    return encodeBase64(data)
  }

  updateUpgradeCostStates() {
    for (const key in this.upgrades) {
      if (this.upgrades.hasOwnProperty(key)) {
        printUpgradeCostState(this.currency, key)
      }
    }
  }
}

class Upgrade {
  constructor(id, name, level, cost, coefficient, value, icon) {
    this.id = id
    this.name = name.toLowerCase()
    this.level = level
    this.cost = cost
    this.coefficient = coefficient
    this.value = value
    this.icon = icon
  }

  levelUp() {
    ++this.level
    //this.cost = Math.ceil(this.cost * this.coefficient ** this.level)
    this.cost = Math.ceil(this.cost * this.coefficient)
  }
}

//-- PRINTERS -------------------------------------------------------------------

function printCurrency() {
  currencyCounterBox.innerHTML = `${CURRENCY_SYMBOL}${formatNumber(
    game.currency
  )}`
}

function printCurrencyPerSecond(currency) {
  const currencyPerSecondBox = document.getElementById("currencyPerSecond")
  currencyPerSecondBox.innerHTML = `${CURRENCY_SYMBOL}${formatNumber(
    currency
  )} / second`
}

function printDiceValue(value) {
  const diceValueBox = document.getElementById("dice")
  diceValueBox.dataset.value = value
}

function printUpgrades() {
  const upgradesBox = document.getElementById("upgrades")

  for (const key in game.upgrades) {
    if (game.upgrades.hasOwnProperty(key)) {
      const upgrade = game.upgrades[key]
      upgradesBox.innerHTML += `
      <div role="button" id="${
        upgrade.id
      }" class="upgrade disabled" onclick="levelUp('${upgrade.id}')">
        <div class="upgrade-icon">${upgrade.icon}</div>

        <div class="upgrade-info">
          <p class="upgrade-name">${upgrade.name}</p>
          <p id="${
            upgrade.id
          }Cost" class="upgrade-cost">${CURRENCY_SYMBOL}${formatNumber(
        upgrade.cost
      )}</p>
          <p id="${upgrade.id}Level" class="upgrade-level">${upgrade.level}</p>
        </div>
      </div>
      `
    }
  }
}

function printUpgradeLevel(upgradeId) {
  document.getElementById(upgradeId + "Level").innerHTML =
    game.upgrades[upgradeId].level
}

function printUpgradeCost(upgradeId) {
  document.getElementById(
    upgradeId + "Cost"
  ).innerHTML = `${CURRENCY_SYMBOL}${formatNumber(
    game.upgrades[upgradeId].cost
  )}`
}

function printUpgradeCostState(currency, upgradeId) {
  if (currency > game.upgrades[upgradeId].cost) {
    document.getElementById(upgradeId).classList.remove("disabled")
  } else {
    document.getElementById(upgradeId).classList.add("disabled")
  }
}

function printFloatingNumber(roll, position) {
  const miniDie = document.createElement("p")
  const rollText = document.createTextNode(
    "+" + (roll + Object.values(game.upgrades)[0].level)
  )
  const offset = getRandomNumber(-20, 20)

  miniDie.appendChild(rollText)
  miniDie.classList.add("floatingRoll")
  miniDie.style.top = position.y + -50 + "px"
  miniDie.style.left = position.x + offset + "px"

  mainBox.appendChild(miniDie)

  setTimeout(() => mainBox.removeChild(miniDie), 1500)
}

function printPageTitle() {
  document.title = formatNumber(game.currency) + " - Dice Clicker"
}

//-- ACTIONS --------------------------------------------------------------------

function saveGame() {
  localStorage.setItem("dice-clicker-demo", game.saveData())
}

function deleteSave() {
  localStorage.clear()
}

function loadGame() {
  let data = localStorage.getItem("dice-clicker-demo")
  return data ? decodeBase64(data) : null
}

function playDiceRollAnimation(roll) {
  diceBox.animate(
    [
      { transform: "translateX(0%) rotate(0deg)", offset: 0 }, // 0%
      { transform: "translateX(-12px) rotate(-8deg)", offset: 0.15 }, // 15%
      { transform: "translateX(6px) rotate(8deg)", offset: 0.3 }, // 30%
      { transform: "translateX(-12px) rotate(-3.6deg)", offset: 0.45 }, // 45%
      { transform: "translateX(4px) rotate(2.4deg)", offset: 0.6 }, // 60%
      { transform: "translateX(-2px) rotate(-1.2deg)", offset: 0.75 }, // 75%
      { transform: "translateX(0%) rotate(0deg)", offset: 1 }, // 100%
    ],
    {
      duration: 300, // Duración total de la animación
      iterations: 1, // Número de veces que se repite la animación
      easing: "ease-out", // Tipo de curva de la animación
    }
  )

  printDiceValue(roll)

  /* currencyCounterBox.animate(
    [
      { transform: "scale(1)", offset: 0 },
      { transform: "scale(1.2)", offset: 0.5 },
      { transform: "scale(1)", offset: 1 },
    ],
    {
      duration: 100,
      easing: "ease-in-out",
    }
  ) */
}

function diceClick(event) {
  playAudio("dice")

  let roll = Math.ceil(Math.random() * 6)
  const position = { x: event.clientX, y: event.clientY }

  printFloatingNumber(roll, position)

  game.updateCurrency(roll + Object.values(game.upgrades)[0].level)

  playDiceRollAnimation(roll)
}

function levelUp(upgradeId) {
  if (game.upgrades[upgradeId].cost <= game.currency) {
    playAudio("buy")

    game.updateCurrency(-game.upgrades[upgradeId].cost)
    game.upgrades[upgradeId].levelUp()

    saveGame()

    printUpgradeLevel(upgradeId)
    printUpgradeCost(upgradeId)
  }
}

function updateTicks() {
  let generation = 0

  for (const key in game.upgrades) {
    if (game.upgrades.hasOwnProperty(key)) {
      const upgrade = game.upgrades[key]
      if (upgrade.value !== 0) {
        const tick = (upgrade.level * upgrade.value) / game.fps
        generation += tick
        game.updateCurrency(tick)
      }
    }
  }

  printCurrencyPerSecond(Math.floor(generation * game.fps))
  game.updateUpgradeCostStates()
}

function playAudio(audio, volume = 0.3, loop = false) {
  const a = game.audios[audio]
  a.currentTime = 0
  a.volume = volume
  a.loop = loop
  a.play()
}

//-- INITIALIZATION ------------------------------------------------------------

const SAVE = loadGame()
const game = SAVE ? new Game(...SAVE) : new Game()

const mainBox = document.getElementById("main")
const diceBox = document.getElementById("dice")
const currencyCounterBox = document.getElementById("currencyCounter")

diceBox?.addEventListener("click", diceClick)

for (const key in this.audios) {
  if (this.audios.hasOwnProperty(key)) {
    const audio = this.audios[key]
    audio.load()
  }
}

playAudio("bg", 0.8, true)

const intervalPlay = setInterval(() => {
  if (game.audios.bg.paused) {
    playAudio("bg", 0.8, true)
  } else if (!game.audios.bg.paused) {
    clearInterval(intervalPlay)
  }
}, 1000)

document.addEventListener("DOMContentLoaded", () => {
  printDiceValue("1")
  printCurrency()
  printUpgrades()
  setInterval(updateTicks, game.fps)
  setInterval(printPageTitle, 3000)
  setInterval(saveGame, 10000)
})
