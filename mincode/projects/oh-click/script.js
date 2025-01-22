const bodyBox = document.querySelector("body")
const gameoverBox = document.querySelector(".section-gameover")
const gameBox = document.querySelector(".section-game")
const data = LStorage("get") ?? {
  record: 0,
  initialTime: 2000,
  adderValue: 1,
}
let clickBox = document.querySelector(".click")
let timeBox = document.querySelector(".time")
let screenSize = { w: bodyBox.offsetWidth, h: bodyBox.offsetHeight }
let clickBoxSizes = { w: clickBox.offsetWidth, h: clickBox.offsetHeight }
let score = 0
let time = data.initialTime

window.addEventListener("resize", () => {
  screenSize = { w: bodyBox.offsetWidth, h: bodyBox.offsetHeight }
  clickBoxSizes = { w: clickBox.offsetWidth, h: clickBox.offsetHeight }
})

const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min)

function LStorage(action) {
  if (action === "get") {
    return JSON.parse(localStorage.getItem("oh-click-data"))
  } else if (action === "set") {
    localStorage.setItem("oh-click-data", JSON.stringify(data))
  }
}

function generateResults() {
  if (score > data.record) {
    data.record = score
    LStorage("set")
  }
  const results = `<h2>Game Over</h2>
  <h5>Record: ${data.record} | Score: ${score}</h5>
  <p class="btn-retry"  role="button" onclick="start()">Click here to restart</p>`
  gameoverBox.innerHTML = results
  gameoverBox.style.display = "flex"
  gameBox.style.display = "none"
}

function timer() {
  const timer = setInterval(() => {
    time -= 1000 / 60
    timeBox.innerText = `Time left: ${Math.floor(time)}ms`

    if (Math.floor(time) <= 0) {
      clearInterval(timer)
      timeBox.innerText = `Time left: 0ms`
      generateResults()
    }
  }, 1000 / 60)
}

function generateClickBox() {
  screenSize = { w: bodyBox.offsetWidth, h: bodyBox.offsetHeight }
  clickBoxSizes = { w: clickBox.offsetWidth, h: clickBox.offsetHeight }

  const newClickBox = `<div class="click" onclick="next()"
    style="
      top: ${getRandomNumber(
        0,
        screenSize.h - clickBoxSizes.h
      )}px; left: ${getRandomNumber(0, screenSize.w - clickBoxSizes.w)}px;
    ">
    <p class="time"></p>
    <p>Score ${score}</p>
  </div>`

  gameBox.innerHTML = newClickBox
  clickBox = document.querySelector(".click")
  timeBox = document.querySelector(".time")
}

function next() {
  score += data.adderValue
  generateClickBox()
}

function start() {
  score = 0
  time = data.initialTime
  gameoverBox.style.display = "none"
  gameBox.style.display = "flex"
  generateClickBox()
  timer()
}

start()
