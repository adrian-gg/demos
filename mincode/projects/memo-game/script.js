const SCENES = ["memo", "question", "result"]
const MAX_LEVER = 120
const TIMER = 3
const INITIAL_GAME = {
  currentScene: 0,
  currentNumber: "",
  yourAnswer: "",
  level: 41,
  score: 0,
  timer: TIMER,
}
const gameConfig = {
  transitionTime: 0.5,
  transitionDelay: 0.3,
  transitionLimbo: 0.3,
}
let game = Object.assign({}, INITIAL_GAME)

/*== BOXES =============================================================*/
const gameConfigBox = document.querySelector("#gameConfig")
const sceneBoxes = document.querySelectorAll(".scene")
const memoBox = document.querySelector("#memo")
const questionBox = document.querySelector("#question")
const resultBox = document.querySelector("#result")

const nextBtn = document.querySelector("#next")
const restartBtn = document.querySelector("#restart")
const timerBox = document.querySelector("#timer")
const answerBox = document.querySelector("#answer")
const questionInput = questionBox.querySelector("input")

/*== UTILS =============================================================*/
const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/*== SETTERS ===========================================================*/
function setGameConfig() {
  gameConfigBox.style.setProperty(
    "--transition-time",
    `${gameConfig.transitionTime}s`
  )
  gameConfigBox.style.setProperty(
    "--transition-delay",
    `${gameConfig.transitionDelay}s`
  )
}

function setNumber() {
  let number = ""
  for (let i = 0; i < Math.min(game.level, MAX_LEVER); i++) {
    number += getRandomInt(i == 0 ? 1 : 0, 9)
  }
  game.currentNumber = number
}

function setTimer() {
  game.timer = Math.min(game.level, MAX_LEVER)

  setTimeout(() => {
    chageScene(questionBox)
    setTimeout(() => {
      timerBox.style.setProperty("--timer", "end")
    }, 1500)
  }, (game.timer + gameConfig.transitionDelay + gameConfig.transitionTime + gameConfig.transitionLimbo) * 1000)
}

/*== PRINTERS ==========================================================*/
function printNumber() {
  setNumber()

  const formattedNumber = game.currentNumber
    .split("")
    .map((char) => {
      return `<span>${char}</span>`
    })
    .join("")

  memoBox
    .querySelector(".number")
    .style.setProperty("--col", Math.min(game.currentNumber.length, 10))
  resultBox
    .querySelector(".number")
    .style.setProperty("--col", Math.min(game.currentNumber.length, 20))

  memoBox.querySelector(".number").innerHTML = formattedNumber
  resultBox.querySelector(".number").innerHTML = formattedNumber
}

function printAnswer() {
  const formattedAnswer = game.yourAnswer
    .split("")
    .map((char, i) => {
      return `<span${
        game.currentNumber[i] != char ? " class='number--error'" : ""
      }>${char}</span>`
    })
    .join("")

  answerBox.style.setProperty("--col", Math.min(game.yourAnswer.length, 20))
  answerBox.innerHTML = formattedAnswer
}

function printTimer() {
  setTimer()
  setTimeout(() => {
    timerBox.style.setProperty("--timer", game.timer)
    timerBox.innerHTML = `<div class="timer"></div>`
  }, (gameConfig.transitionDelay + gameConfig.transitionTime + gameConfig.transitionLimbo) * 1000)
}

function printLevel() {
  resultBox.querySelector(".level").innerText = `Level ${game.level}`
}

/*== EVENTS ============================================================*/

function reset() {
  setGameConfig()
  game = Object.assign({}, INITIAL_GAME)
}

function nextLevel() {
  game.level++
  printLevel()
  printNumber()
  printTimer()
  questionInput.disabled = true
  questionInput.value = ""
}

function checkAnswer(answer) {
  game.yourAnswer = answer
  printAnswer()

  if (game.currentNumber == answer) {
    nextBtn.classList.remove("hidden")
    restartBtn.classList.add("hidden")
  } else {
    nextBtn.classList.add("hidden")
    restartBtn.classList.remove("hidden")
  }
}

function startGame() {
  reset()
  nextLevel()
}

function chageScene(scene) {
  game.currentScene = SCENES.indexOf(scene.id)

  sceneBoxes.forEach((el) => {
    if (el.classList.contains("scene-IN")) {
      el.classList.add("scene-OUT")
      el.classList.remove("scene-IN")
    }
  })

  setTimeout(() => {
    scene.classList.remove("scene-OUT")
    scene.classList.add("scene-IN")

    if (scene.id == "question") {
      questionInput.value = ""
      setTimeout(() => {
        questionInput.disabled = false
        questionInput.focus()
      }, gameConfig.transitionTime * 1000)
    }
  }, gameConfig.transitionLimbo * 1000)
}

/*== HANDLERS ==========================================================*/
const handleSubmit = (event) => {
  event.preventDefault()
  const answer = event.target.querySelector("input").value
  if (game.currentScene == SCENES.indexOf("question") && answer != "") {
    checkAnswer(answer)
    chageScene(resultBox)
  }
}

const handleNext = () => {
  chageScene(memoBox)
  setTimeout(() => {
    nextLevel()
  }, (gameConfig.transitionTime + gameConfig.transitionLimbo / 2) * 1000)
}

const handleRestart = () => {
  setTimeout(() => {
    startGame()
  }, (gameConfig.transitionDelay + gameConfig.transitionLimbo) * 1000)
  chageScene(memoBox)
}

nextBtn.addEventListener("click", handleNext)
restartBtn.addEventListener("click", handleRestart)
document.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && game.currentScene == SCENES.indexOf("result")) {
    if (game.yourAnswer == game.currentNumber) {
      nextBtn.click()
    } else {
      restartBtn.click()
    }
  }
})

/*== START GAME =======================================================*/
startGame()
