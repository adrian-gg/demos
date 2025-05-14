const CARDS = [
  "KS",
  "QS",
  "JS",
  "KD",
  "QD",
  "JD",
  "KC",
  "QC",
  "JC",
  "KH",
  "QH",
  "JH",
]
const TEXTS = {
  en: [
    `I want you to choose 5 cards by touching them.`,
    "Let's take a look at the 5 cards you chose.",
    "Think of one of these cards and picture it in your mind.",
    "I know which card you thought of. Allow me to make it vanish.",
    "Let's take a look at the 4 remaining cards.",
    "The card you thought of is gone, right? Ta-da!",
  ],
  es: [
    `Quiero que selecciones 5 cartas.`,
    "Veamos que cartas has seleccionado.",
    "Piensa en una de estas cartas y retenla en tu mente.",
    "¿La tienes? ¡Perfecto! Permiteme que la haga desaparecer.",
    "Estas son las 4 cartas restantes.",
    "La carta que pensaste ha desaparecido ¿Verdad?, ¡Ta-chan!",
  ],
}

let language = "es"
let cardsSelectedCount = 0
let sizeBoard = 80

//BOXES
const textBox = document.querySelector(".text")
const cardsBox = document.querySelector(".cards")
const nextBtn = document.querySelector(".next")

//CLASSES
class Card {
  constructor(container, code) {
    this.code = code
    this.color = code[1] === "S" || code[1] === "C" ? "black" : "red"
    this.selected = false
    this.hidden = false

    this.container = container
    const cardEl = document.createElement("div")

    cardEl.dataset.card = this.code
    cardEl.classList.add("card")

    const cardFrontEl = document.createElement("img")
    const cardBackEl = document.createElement("img")

    cardFrontEl.src = `./img/${code}.png`
    cardBackEl.src = `./img/back.png`

    cardFrontEl.classList.add("card-front")
    cardBackEl.classList.add("card-back")

    cardEl.addEventListener("click", () => {
      if (this.selected) {
        cardsSelectedCount--
        this.unselect()
      } else if (cardsSelectedCount < 5) {
        cardsSelectedCount++
        this.select()
      }

      if (cardsSelectedCount === 5) {
        this.container.classList.add("cards-max")
        nextBtn.disabled = false
      } else {
        this.container.classList.remove("cards-max")
        nextBtn.disabled = true
      }
    })

    cardEl.appendChild(cardFrontEl)
    cardEl.appendChild(cardBackEl)
    this.cardEl = cardEl

    if (!this.hidden) this.show()
  }

  render() {
    this.container.appendChild(this.cardEl)
  }

  changeImg(img = "back") {
    this.cardEl.querySelector(".card-front").src = `./img/${img}.png`
  }

  show(time = 0) {
    this.hidden = false

    setTimeout(
      () => {
        this.cardEl.classList.add("card--show")
      },
      time === 0 ? 0 : time - 50
    )

    if (time > 0) {
      this.cardEl.animate(
        [{ transform: "rotateY(0deg)" }, { transform: "rotateY(180deg)" }],
        {
          duration: time,
          iterations: 1,
        }
      )
    }
  }

  hide(time = 0) {
    this.hidden = true

    setTimeout(
      () => {
        this.cardEl.classList.remove("card--show")
      },
      time === 0 ? 0 : time - 50
    )

    if (time > 0) {
      this.cardEl.animate(
        [{ transform: "rotateY(180deg)" }, { transform: "rotateY(0deg)" }],
        {
          duration: time,
          iterations: 1,
        }
      )
    }
  }

  select() {
    this.selected = true
    this.cardEl.classList.add("card--selected")
  }

  unselect() {
    this.selected = false
    this.cardEl.classList.remove("card--selected")
  }

  destroy(time = 0) {
    setTimeout(() => {
      this.cardEl.remove()
    }, time)

    if (time > 0) {
      this.cardEl.animate(
        [
          { width: "10rem", opacity: "1", marginLeft: "-10rem" },
          { width: "0rem", opacity: "0", marginLeft: "-20rem" },
        ],
        {
          duration: time,
          iterations: 1,
          fill: "forwards",
        }
      )
    }
  }
}

class Deck {
  constructor() {
    this.cards = []
    this.__init__()
  }

  __init__() {
    CARDS.forEach((card) => {
      const cardEl = new Card(cardsBox, card)
      this.cards.push(cardEl)
    })
  }

  renderCards() {
    this.cards.forEach((card) => {
      card.render()
    })
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }

  draw() {
    return this.cards[Math.floor(Math.random() * this.cards.length)]
  }

  drawCardByColor(color) {
    return this.cards.find((card) => card.code.includes(color))
  }

  showCards(time = 0) {
    this.cards.forEach((card, i) => {
      setTimeout(() => {
        card.show(time)
      }, i * 50)
    })
  }

  hideCards(time = 0) {
    this.cards.forEach((card, i) => {
      setTimeout(() => {
        card.hide(time)
      }, i * 50)
    })
  }

  removeCard(card) {
    this.cards.splice(this.cards.indexOf(card), 1)
  }
}
const deck = new Deck()

//PRINTERS
function printCards() {
  deck.renderCards()
}

function printText(text = "") {
  textBox.animate(
    [
      { opacity: 1, transform: "translateY(0rem)" },
      { opacity: 0, transform: "translateY(-1rem)" },
    ],
    {
      duration: 200,
      iterations: 1,
      easing: "ease-in-out",
      fill: "forwards",
    }
  )
  setTimeout(() => {
    textBox.innerHTML = text

    textBox.animate(
      [
        { opacity: 0, transform: "translateY(1rem)" },
        { opacity: 1, transform: "translateY(0rem)" },
      ],
      {
        duration: 200,
        iterations: 1,
        easing: "ease-in-out",
        fill: "forwards",
      }
    )
  }, 200)
}

//ACTIONS
function hideCards(time) {
  deck.hideCards(time)
}

function showCards(time) {
  deck.showCards(time)
}

function changeCardsImg(imgs = null) {
  deck.cards.forEach((card, i) => {
    card.changeImg(imgs ? imgs[i] : "back")
  })
}

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }

  return cards
}

function updateBoardSize(sizeBoard = 80, time = 0) {
  cardsBox.style.setProperty("--size-board", `${sizeBoard}rem`)
  cardsBox.style.setProperty("--time-animation", `${time / 1000}s`)
}

function destroyUnselectedCards() {
  deck.cards.forEach((card) => {
    if (!card.selected) {
      card.destroy(200)
      setTimeout(() => {
        deck.removeCard(card)
      }, 200)
    }
  })
}

function unselectSelectedCards() {
  deck.cards.forEach((card) => {
    if (card.selected) {
      card.unselect()
    }
  })
}

function shuffleAnimation() {
  updateBoardSize(10, 300)

  setTimeout(() => {
    cardsBox.style.flexDirection = "row-reverse"
    updateBoardSize(20, 200)

    setTimeout(() => {
      updateBoardSize(10, 100)

      setTimeout(() => {
        cardsBox.style.flexDirection = "row"
        updateBoardSize(20, 200)

        setTimeout(() => {
          updateBoardSize(10, 100)

          setTimeout(() => {
            cardsBox.style.flexDirection = "row-reverse"
            updateBoardSize(20, 200)

            setTimeout(() => {
              updateBoardSize(10, 100)

              setTimeout(() => {
                cardsBox.style.flexDirection = "row"
              }, 100)
            }, 200)
          }, 100)
        }, 200)
      }, 100)
    }, 200)
  }, 300)
}

function destroyRandomCard() {
  const card = deck.draw()
  card.destroy()
  deck.removeCard(card)
}

//WAITERS
async function wait(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function waitNext() {
  return new Promise((resolve) => {
    const handler = () => {
      if (cardsSelectedCount === 5) {
        nextBtn.disabled = true
        nextBtn.removeEventListener("click", handler)
        resolve()
      }
    }
    nextBtn.addEventListener("click", handler)
    if (cardsSelectedCount === 5) {
      nextBtn.disabled = false
    }
  })
}

//TREE
const treeActions = [
  { action: updateBoardSize, param: [80, 0] },
  { action: printCards },
  { action: wait, param: 1000, type: "async" },
  { action: hideCards, param: 250 },
  { action: wait, param: 1200, type: "async" },
  { action: changeCardsImg },
  { action: shuffleAnimation },
  { action: wait, param: 1200, type: "async" },
  { action: updateBoardSize, param: [80, 300] },
  { action: wait, param: 300, type: "async" },
  {
    action: printText,
    param: TEXTS[language][0],
  },
  { action: wait, param: 1500, type: "async" },
  { action: waitNext, type: "async" }, //wait to select cards
  { action: printText },
  { action: destroyUnselectedCards },
  { action: updateBoardSize, param: [60, 300] },
  { action: wait, param: 600, type: "async" },
  { action: unselectSelectedCards },
  { action: wait, param: 200, type: "async" },
  { action: changeCardsImg, param: [["KD", "JC", "QH", "KS", "QC"]] },
  {
    action: printText,
    param: TEXTS[language][1],
  },
  { action: waitNext, type: "async" },
  { action: showCards, param: 250 },
  { action: wait, param: 450, type: "async" },
  {
    action: printText,
    param: TEXTS[language][2],
  },
  { action: waitNext, type: "async" },
  {
    action: printText,
    param: TEXTS[language][3],
  },
  { action: waitNext, type: "async" },
  { action: printText },
  { action: hideCards, param: 250 },
  { action: wait, param: 1000, type: "async" },
  { action: shuffleAnimation },
  { action: wait, param: 1600, type: "async" },
  { action: destroyRandomCard },
  { action: updateBoardSize, param: [48, 300] },
  { action: changeCardsImg, param: [["JS", "KH", "QS", "JD"]] },
  { action: wait, param: 1000, type: "async" },
  { action: showCards, param: 250 },
  {
    action: printText,
    param: TEXTS[language][4],
  },
  { action: waitNext, type: "async" },
  {
    action: printText,
    param: TEXTS[language][5],
  },
]

async function playTree(actionInx = 0) {
  const a = treeActions[actionInx]
  const param = a.param ? a.param : null
  const isParamArray = Array.isArray(param)

  if (a.type === "async") {
    isParamArray ? await a.action(...param) : await a.action(param)
  } else {
    isParamArray ? a.action(...param) : a.action(param)
  }

  if (treeActions.length - 1 > actionInx) {
    await playTree(actionInx + 1)
  }
}

playTree()
