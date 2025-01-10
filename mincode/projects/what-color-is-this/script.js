const initialGlobalData = {
  color: getRandomColor(),
  points: 0,
  average: 0,
  games: 0,
}

const globalData = JSON.parse(JSON.stringify(initialGlobalData))
const textBox = document.querySelector("#title")
const startBtn = document.querySelector(".btn_start")
const submitBtn = document.querySelector(".btn_submit")
const panelColorBox = document.querySelector("#panel")
const formBox = document.querySelector("#form")
const colorAnswerBox = document.querySelector(".color-answer")
const colorAnswerTitleBox = document.querySelector("#color-answer-title")
const colorAnswerResultBox = document.querySelector("#color-answer-result")
const colorQuestionResultBox = document.querySelector("#color-question-result")

function getRandomNumber(min = 0, max = 255) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getContrastColor(backgroundColor) {
  const rgb = Object.values(backgroundColor) // Extrae los valores RGB
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255
  return luminance > 0.5 ? "black" : "white"
}

function updateUI(result, color) {
  if (result) {
    const currentColor = globalData.color
    const colorAnswer = color
    const textCurrentColor = getContrastColor(currentColor)
    const textColorAnswer = getContrastColor(colorAnswer)

    colorQuestionResultBox.innerHTML = `The color was: ${currentColor.r}, ${currentColor.g}, ${currentColor.b}`
    colorQuestionResultBox.style.color = textCurrentColor

    colorAnswerBox.style.backgroundColor = `rgb(${colorAnswer.r}, ${colorAnswer.g}, ${colorAnswer.b})`
    colorAnswerBox.style.color = textColorAnswer
    colorAnswerTitleBox.innerHTML = `Your color is: ${colorAnswer.r}, ${colorAnswer.g}, ${colorAnswer.b}`
    colorAnswerResultBox.innerHTML = `Your guess was off by ${result} points.</br>Point average: ${globalData.average} in ${globalData.games} games. (The lower the better)`
    panelColorBox.classList.add("open")
  } else {
    const currentColor = globalData.color
    const textColor = getContrastColor(currentColor)
    textBox.style.color = textColor
    startBtn.style.color = textColor
    startBtn.style.borderColor = textColor
    panelColorBox.style.backgroundColor = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
  }
}

function checkColor(color) {
  const totalGC = Object.values(globalData.color).reduce((arr, c) => arr + c, 0)
  const totalC = Object.values(color).reduce((arr, c) => arr + c, 0)
  const result = Math.max(totalGC, totalC) - Math.min(totalGC, totalC)
  globalData.games += 1
  globalData.points += result
  globalData.average = Math.floor(globalData.points / globalData.games)
  updateUI(result, color)
}

formBox.addEventListener("submit", function (e) {
  e.preventDefault()
  const formData = new FormData(formBox)
  const color = {
    r: Number(formData.get("red")),
    g: Number(formData.get("green")),
    b: Number(formData.get("blue")),
  }
  checkColor(color)
  formBox.reset()
  submitBtn.disabled = true
})

function getRandomColor() {
  const color = {
    r: getRandomNumber(),
    g: getRandomNumber(),
    b: getRandomNumber(),
  }
  return color
}

function retry() {
  panelColorBox.classList.remove("open")
  colorQuestionResultBox.innerHTML = ""
  globalData.color = getRandomColor()
  updateUI()
  submitBtn.disabled = false
}

function start() {
  updateUI()
}

start()
