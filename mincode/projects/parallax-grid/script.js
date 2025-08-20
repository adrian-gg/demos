const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const getRandomInt = (min, max) => {
  if (max === undefined) {
    max = min
    min = 0
  }
  /* min = Math.ceil(min)
  max = Math.floor(max) */
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const getRandomFloat = (min, max) => {
  if (max === undefined) {
    max = min
    min = 0
  }
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.random() * (max - min + 1) + min
}

const setCard = function (i) {
  const card = document.createElement("article")
  card.classList.add("card")
  let randomImg = getRandomInt(1, 30)

  /*Avoiding the same image for cards in viweport*/
  if (i > 31 && i <= 37) randomImg = i - 31
  else if (i > 41 && i <= 47) randomImg = i - 41 + 6
  else if (i > 51 && i <= 57) randomImg = i - 51 + 12
  else if (i > 61 && i <= 67) randomImg = i - 61 + 18

  const randomChar = getRandomInt(CHARS.length - 1)
  const randomIndex = CHARS[randomChar] + "." + randomChar + i

  card.innerHTML = `      
      <div class="card-content">
        <div class="card-bg" style="background-image:url(./img/${randomImg}.jpg);">
        </div>
        <p class="card-index">${randomIndex}</p>
    </div>
  `
  return card
}
function setCards() {
  const cardsBox = document.querySelector(".cards-board")

  for (let i = 0; i < 100; i++) {
    const card = setCard(i)
    cardsBox.appendChild(card)
  }
}

window.onload = function () {
  let parallaxState = true

  const cardsBox = document.querySelector(".cards-board")
  const sceneBox = document.getElementById("scene")

  const parallax = new Parallax(sceneBox, {
    pointerEvents: true,
    xOrigin: "0.5",
    yOrigin: "0.5",
    scalarY: "0.0",
    scalarX: "0.0",
    frictionX: "0.02",
    frictionY: "0.02",
  })

  function setScalars() {
    const cardsBox = document.querySelector(".cards-board")
    const wW = window.innerWidth
    const wH = window.innerHeight

    if (wW < cardsBox.clientWidth) {
      const newScalarX = ((cardsBox.clientWidth - wW) * 100) / wW / 2
      parallax.scalarX = newScalarX.toFixed(1)
    }

    if (wH < cardsBox.clientHeight) {
      const newScalarY = ((cardsBox.clientHeight - wH) * 100) / wH / 2
      parallax.scalarY = newScalarY.toFixed(1)
    }
  }

  this.addEventListener("resize", function () {
    setScalars()
  })

  cardsBox.addEventListener("click", function () {
    if (parallaxState) {
      parallax.disable()
      parallaxState = false
    } else {
      parallax.enable()
      parallaxState = true
    }
  })

  setCards()
  setScalars()
}
