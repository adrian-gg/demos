const NOTES = {
  C0: 16.35,
  "C#0": 17.32,
  D0: 18.35,
  "D#0": 19.45,
  E0: 20.6,
  F0: 21.83,
  "F#0": 23.12,
  G0: 24.5,
  "G#0": 25.96,
  A0: 27.5,
  "A#0": 29.14,
  B0: 30.87,
  C1: 32.7,
  "C#1": 34.65,
  D1: 36.71,
  "D#1": 38.89,
  E1: 41.2,
  F1: 43.65,
  "F#1": 46.25,
  G1: 49.0,
  "G#1": 51.91,
  A1: 55.0,
  "A#1": 58.27,
  B1: 61.74,
  C2: 65.41,
  "C#2": 69.3,
  D2: 73.42,
  "D#2": 77.78,
  E2: 82.41,
  F2: 87.31,
  "F#2": 92.5,
  G2: 98.0,
  "G#2": 103.83,
  A2: 110.0,
  "A#2": 116.54,
  B2: 123.47,
  C3: 130.81,
  "C#3": 138.59,
  D3: 146.83,
  "D#3": 155.56,
  E3: 164.81,
  F3: 174.61,
  "F#3": 185.0,
  G3: 196.0,
  "G#3": 207.65,
  A3: 220.0,
  "A#3": 233.08,
  B3: 246.94,
  C4: 261.63,
  "C#4": 277.18,
  D4: 293.66,
  "D#4": 311.13,
  E4: 329.63,
  F4: 349.23,
  "F#4": 369.99,
  G4: 392.0,
  "G#4": 415.3,
  A4: 440.0,
  "A#4": 466.16,
  B4: 493.88,
  C5: 523.25,
  "C#5": 554.37,
  D5: 587.33,
  "D#5": 622.25,
  E5: 659.26,
  F5: 698.46,
  "F#5": 739.99,
  G5: 783.99,
  "G#5": 830.61,
  A5: 880.0,
  "A#5": 932.33,
  B5: 987.77,
  C6: 1046.5,
  "C#6": 1108.73,
  D6: 1174.66,
  "D#6": 1244.51,
  E6: 1318.51,
  F6: 1396.91,
  "F#6": 1480.0,
  G6: 1567.98,
  "G#6": 1661.22,
  A6: 1760.0,
  "A#6": 1864.66,
  B6: 1975.53,
  C7: 2093.0,
  "C#7": 2217.46,
  D7: 2349.32,
  "D#7": 2489.02,
  E7: 2637.02,
  F7: 2793.83,
  "F#7": 2960.0,
  G7: 3135.96,
  "G#7": 3322.44,
  A7: 3520.0,
  "A#7": 3729.31,
  B7: 3951.07,
  C8: 4186.01,
  "C#8": 4434.92,
  D8: 4698.64,
  "D#8": 4978.03,
  E8: 5274.04,
  F8: 5587.65,
  "F#8": 5920.0,
  G8: 6271.93,
  "G#8": 6644.88,
  A8: 7040.0,
  "A#8": 7458.62,
  B8: 7902.13,
}

const container = document.getElementById("canvas-container")
const canvas = document.getElementById("musicCanvas")
const ctx = canvas.getContext("2d")
const playButton = document.getElementById("playButton")
const pauseButton = document.getElementById("pauseButton")
const resetButton = document.getElementById("resetButton")

let animationId = null
let yOffset = 0
let isPlaying = false
let scrollSpeedPerFrame = 0

let totalCompases = songData.compases
const paddingX = 20
const paddingY = 20
let usableWidth
let usableHeight
let columnWidth
let barHeight
let horizontalOffset = 0

const desiredColumnWidth = 6
const columnSpacing = 10
const pianoKeyOrderCanonical = Object.keys(NOTES)
const uniqueKeysFromData = new Set(songData.keys.map((key) => key.tecla))
const uniqueKeys = pianoKeyOrderCanonical.filter((key) =>
  uniqueKeysFromData.has(key)
)
const keyMap = new Map()
uniqueKeys.forEach((key, index) => {
  keyMap.set(key, index)
})

function setCanvasDimensions() {
  const containerWidth = container.offsetWidth - paddingX * 2
  const containerHeight = container.offsetHeight - paddingY * 2

  if (!isPlaying) {
    yOffset = -containerHeight / 2
  }

  canvas.width = containerWidth
  canvas.height = containerHeight

  usableWidth = canvas.width - 2 * paddingX
  usableHeight = canvas.height - 2 * paddingY

  columnWidth = Math.min(
    usableWidth / uniqueKeys.length - columnSpacing,
    desiredColumnWidth
  )
  if (columnWidth < 2) columnWidth = 2

  barHeight = Math.max(usableHeight / totalCompases, 15)

  const totalColumnsRenderedWidth =
    uniqueKeys.length * (columnWidth + columnSpacing)
  horizontalOffset = (usableWidth - totalColumnsRenderedWidth) / 2
  if (horizontalOffset < 0) horizontalOffset = 0

  const beatsPerSecond = songData.bpm / 60
  const measuresPerSecond = (beatsPerSecond * 16) / 4
  const pixelsPerSecond = measuresPerSecond * barHeight
  scrollSpeedPerFrame = pixelsPerSecond / 60
}

/* function getKeyColor(tecla) {
  let hash = 0
  for (let i = 0; i < tecla.length; i++) {
    hash = tecla.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = "#"
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    color += ("00" + value.toString(16)).substr(-2)
  }
  return color
} */

function drawVisualization() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  songData.keys.forEach((note) => {
    const keyIndex = keyMap.get(note.tecla)
    if (keyIndex === undefined) {
      console.warn(
        `La tecla "${note.tecla}" no se encontró en el mapa de teclas únicas.`
      )
      return
    }

    const x =
      paddingX + horizontalOffset + keyIndex * (columnWidth + columnSpacing)
    const noteHeight = note.duracion * barHeight
    const originalY =
      canvas.height - paddingY - (note.compas + note.duracion) * barHeight
    const y = originalY + yOffset

    if (y + noteHeight > 0 && y < canvas.height) {
      /* ctx.fillStyle = getKeyColor(note.tecla) */
      ctx.fillStyle = "#111"
      const borderRadius = 5

      ctx.beginPath()
      ctx.roundRect(x, y, columnWidth, noteHeight, borderRadius)
      ctx.fill()
    }
  })

  // Dibuja las etiquetas de las teclas en la parte superior del canvas
  /* ctx.fillStyle = "#333"
  ctx.font = "12px Monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "top"
  uniqueKeys.forEach((key, index) => {
    const x =
      paddingX +
      horizontalOffset +
      index * (columnWidth + columnSpacing) +
      columnWidth / 2
    ctx.fillText(key, x, paddingY / 2)
  }) */
}

function animate() {
  if (!isPlaying) return

  yOffset += scrollSpeedPerFrame
  const totalContentHeight = totalCompases * barHeight
  const maxOffset = totalContentHeight + canvas.height

  if (yOffset > maxOffset) {
    yOffset = maxOffset
    pauseAnimation()
  }

  drawVisualization()
  animationId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (!isPlaying) {
    isPlaying = true
    animate()
  }
}

function pauseAnimation() {
  isPlaying = false
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function resetAnimation(start = 4) {
  pauseAnimation()

  const containerHeight =
    document.getElementById("canvas-container").offsetHeight - paddingX * start
  yOffset = -(containerHeight / 2)
  drawVisualization()
}

/* == MUSICBOX == */
let intervalId = null
let context = null
let oscillators = []

function getAudioContext() {
  if (!context) {
    context = new (window.AudioContext || window.webkitAudioContext)()
  }
  return context
}

function playNote(songData, note) {
  const context = getAudioContext()
  const oscillator = context.createOscillator()
  const gainNode = context.createGain()

  const noteFrequency = NOTES[note.tecla]
  const startTime = (note.compas / 4) * (60 / songData.bpm)
  const duration = note.duracion * (60 / songData.bpm) + 0.2

  oscillator.type = "triangle"
  oscillator.frequency.setValueAtTime(
    noteFrequency,
    context.currentTime + startTime
  )

  oscillator.connect(gainNode)
  gainNode.connect(context.destination)

  gainNode.gain.setValueAtTime(0.025, context.currentTime + startTime)
  gainNode.gain.linearRampToValueAtTime(
    0,
    context.currentTime + startTime + duration
  )

  oscillator.start(context.currentTime + startTime)
  oscillator.stop(context.currentTime + startTime + duration)

  oscillators.push(oscillator)
}

function playSong(songData, loop = false) {
  if (intervalId) return

  setTimeout(() => {
    songData.keys.forEach((noteData) => {
      playNote(songData, noteData)
    })

    if (loop) {
      const compasDuration =
        (60 / songData.bpm) * 4 * (songData.compases / 16) * 1000

      intervalId = setInterval(() => {
        songData.keys.forEach((noteData) => {
          playNote(songData, noteData)
          resetAnimation()
          startAnimation()
        })
      }, compasDuration)
    }
  }, 150)
}

function stopSong() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }

  oscillators.forEach((oscillator) => {
    oscillator.stop()
  })
  oscillators = []

  if (context) {
    context.suspend().then(() => {
      isPlaying = false
    })
  }
}

playButton.addEventListener("click", async function () {
  context = getAudioContext()

  if (context.state === "suspended") {
    await context.resume()
  }

  startAnimation()
  isPlaying = true
  playSong(songData, true)
})

resetButton.addEventListener("click", function () {
  if (isPlaying) {
    stopSong()
    isPlaying = false
  }
  resetAnimation(2)
})

window.addEventListener("resize", () => {
  setCanvasDimensions()
  drawVisualization()
})

window.onload = () => {
  setCanvasDimensions()
  drawVisualization()
}
