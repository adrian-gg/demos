const OPTIONS_INDEX = "ABCD"
const DIFFICULTIES = ["easy", "medium", "hard"]
const JOKERS = [
  /* {
    id: "",
    name: "",
    icon: "",
    description: "",
  }, */
]
const MAX_QUESTIONS = 15

/* function toggleUI() {
  const questionNumbers = document.querySelector("#ui")
  questionNumbers.classList.toggle("closed")
}
function toggleQuestionNumbers() {
  const questionNumbers = document.querySelector("#question-numbers")
  questionNumbers.classList.toggle("closed")
} */

function show(element, show = true) {
  if (show) document.querySelector(element).classList.add("show")
  else document.querySelector(element).classList.remove("show")
}

function resolveAnswer() {
  const currentQuestion = game.currentQuestion
  const answerOptionsBox = document.querySelector("#answer-options")
  const answerOptionBoxes = document.querySelectorAll("#answer-options label")
  let lose = false

  answerOptionsBox.classList.add("disabled")

  for (let i = 0; i < answerOptionBoxes.length; i++) {
    const answerOption = answerOptionBoxes[i]
    const answerOptionInput = answerOption.querySelector("input[type='radio']")
    const answerOptionElem = answerOption.querySelector("div.answer")

    if (
      answerOptionInput.checked &&
      answerOptionInput.value !== OPTIONS_INDEX[currentQuestion.answer]
    ) {
      answerOptionElem.classList.add("incorrect")
      lose = true
      setTimeout(() => printMessage("lose"), 1000)
    } else if (
      answerOptionInput.checked &&
      answerOptionInput.value === OPTIONS_INDEX[currentQuestion.answer]
    ) {
      if (game.level === MAX_QUESTIONS)
        setTimeout(() => printMessage("win"), 1000)
    }

    if (answerOptionInput.value === OPTIONS_INDEX[currentQuestion.answer]) {
      answerOptionElem.classList.add("correct")
    }
  }

  if (!lose && game.level < MAX_QUESTIONS)
    setTimeout(() => nextQuestion(), 1000)
}

function printQuestion(question) {
  const questionBox = document.querySelector(".question")
  questionBox.innerHTML = ""

  const textElem = document.createElement("p")
  if (question.length > 130) textElem.classList.add("smalltext")
  textElem.innerHTML = question
  setTimeout(() => textElem.classList.add("show"), 500)

  questionBox.appendChild(textElem)
}
function printAnswerOptions(answerOptions) {
  const answerOptionsBox = document.querySelector("#answer-options")
  answerOptionsBox.innerHTML = ""

  for (let i = 0; i < answerOptions.length; i++) {
    const answerOption = answerOptions[i]

    const answerOptionLabel = document.createElement("label")
    answerOptionLabel.classList.add("answer-option")
    answerOptionLabel.setAttribute("for", `answer-option-${i + 1}`)
    setTimeout(() => answerOptionLabel.classList.add("show"), 1500 + i * 1000)

    const answerOptionInput = document.createElement("input")
    answerOptionInput.type = "radio"
    answerOptionInput.name = "answer-option"
    answerOptionInput.id = `answer-option-${i + 1}`
    answerOptionInput.value = OPTIONS_INDEX[i]
    answerOptionInput.checked = false

    answerOptionInput.addEventListener("click", () => {
      resolveAnswer()
    })

    const answerOptionElem = document.createElement("div")
    answerOptionElem.classList.add("answer")
    if (answerOption.length > 24) answerOptionElem.classList.add("smalltext")
    answerOptionElem.innerHTML = `<span class="letter">${OPTIONS_INDEX[i]}:&nbsp;</span><span>${answerOption}</span>`

    answerOptionLabel.appendChild(answerOptionInput)
    answerOptionLabel.appendChild(answerOptionElem)

    answerOptionsBox.appendChild(answerOptionLabel)
    setTimeout(() => answerOptionsBox.classList.remove("disabled"), 5100)
  }
}
function printMessage(type) {
  const alertBox = document.querySelector("#alerts .alert")
  if (type === "win") {
    alertBox.querySelector(
      ".message"
    ).innerHTML = `<p>¡Felicidades!</br>Has respondido correctamente a las ${MAX_QUESTIONS} preguntas.</p>`
  }
  if (type === "lose") {
    alertBox.querySelector(".message").innerHTML = `<p>Lo siento, perdiste.</p>`
  }
  show("#alerts")
}
function printJokers() {
  const jokersBox = document.querySelector(".jokers")
  const jokers = Object.values(game.jokers)
  jokersBox.innerHTML = ""

  for (let i = 0; i < jokers.length; i++) {
    const joker = jokers[i]
    const jokerBox = document.createElement("div")
    jokerBox.classList.add("joker")
    jokerBox.innerHTML = `<div class="joker-name">${JOKERS[i].name}</div>`

    jokerBox.setAttribute("data-id", JOKERS[i].id)
    jokerBox.addEventListener("click", () => useJoker(JOKERS[i].id))

    jokersBox.appendChild(jokerBox)
  }
}
function printLevels() {
  const levelsBox = document.querySelector("#levels")
  levelsBox.innerHTML = ""

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const levelBox = document.createElement("div")
    levelBox.classList.add("num")
    if (i === game.level - 1) levelBox.classList.add("current")
    else if (i < game.level - 1) levelBox.classList.add("completed")
    levelBox.innerHTML = `${i + 1}`
    levelsBox.appendChild(levelBox)
  }
}

const filterQuestions = (questions, difficulty) => {
  return questions.filter((question) => question.difficulty === difficulty)
}
const loadQuestions = async () => {
  const questions = await fetch("./questions.json")
    .then((response) => response.json())
    .then((data) =>
      DIFFICULTIES.map((difficulty) => filterQuestions(data, difficulty))
    )
  return questions
}
const getRandomQuestion = (questions, questionsAnswered) => {
  const qs = questions.filter((q) => !questionsAnswered.includes(q.id))
  const randomIndex = Math.floor(Math.random() * qs.length)
  return qs[randomIndex]
}
function nextQuestion() {
  game.level++

  if (game.level > 5 && game.level <= 10) {
    game.difficulty = 1
  } else if (game.level > 10) {
    game.difficulty = 2
  }

  const randomQuestion = getRandomQuestion(
    game.questions[game.difficulty],
    game.questionsAnswered
  )
  game.currentQuestion = randomQuestion
  game.questionsAnswered.push(randomQuestion.id)

  printLevels()
  printQuestion(game.currentQuestion.question)
  printAnswerOptions(game.currentQuestion.answers)
}

function setJoker(joker, value = true) {
  game.jokers.filter((j) => j.id === joker)[0].state = value
}
function useJoker(joker) {
  const jokerBox = document.querySelector(`.jokers .joker[data-id="${joker}"]`)
  jokerBox.classList.add("used")
  setJoker(joker, false)
}

function restart() {
  game.level = 0
  game.questionsAnswered = []
  game.currentQuestion = null
  game.difficulty = 0
  game.jokers = JOKERS

  show("#alerts", false)
  //printJokers()
  nextQuestion()
}

const game = {
  level: 0,
  questions: null,
  questionsAnswered: [],
  currentQuestion: null,
  difficulty: 0,
  jokers: [],
}

;(async () => {
  const questions = await loadQuestions()
  game.questions = questions
  game.jokers = JOKERS

  //printJokers()
  nextQuestion()
})()
