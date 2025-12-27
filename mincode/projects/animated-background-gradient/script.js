const BOOST_DURATION = 1000 //ms
const COLOR_DURATION = BOOST_DURATION + BOOST_DURATION / 2
const BASE_SPEED = 2
const PEAK_SPEED = 50

let isPaused = false
let rafId = null
let animStart = null
let animPending = false

let oldColorsRGB = []
let newColorsRGB = []
let circles = []
const colors = ["#808080", "#000000", "#404040"]

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

document.body.style.backgroundColor = "#202020"

/*== UTILS ==*/

const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min
}

const randomHexColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  )
}

const hexToRgb = (hex) => {
  hex = hex.replace("#", "")

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("")
  }

  const num = parseInt(hex, 16)

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

// easing base (easeInOut)
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

/*== MAIN ==*/

function initCircles() {
  circles = []
  const circleCount = window.innerWidth / randomBetween(100, 200)

  for (let i = 0; i < circleCount; i++) {
    const radius = window.innerWidth / randomBetween(4, 6)
    const x = randomBetween(radius, canvas.width - radius)
    const y = randomBetween(radius, canvas.height - radius)
    const dx = randomBetween(
      window.innerWidth / -2000,
      window.innerWidth / 2000
    )
    const dy = randomBetween(
      window.innerHeight / -2000,
      window.innerHeight / 2000
    )
    const color = colors[Math.floor(Math.random() * colors.length)]
    circles.push({ x, y, dx, dy, radius, color })
  }
}

function drawCircle(circle) {
  ctx.beginPath()
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false)
  ctx.fillStyle = circle.color
  ctx.fill()
  ctx.closePath()
}

function animate(timestamp) {
  if (isPaused) return

  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (animPending) {
    animStart = timestamp
    animPending = false
  }

  let tColor = 0
  let tSpeed = 0

  if (animStart !== null) {
    const elapsed = timestamp - animStart

    if (elapsed >= COLOR_DURATION) {
      tColor = 1
    } else {
      tColor = elapsed / COLOR_DURATION
    }

    if (elapsed >= BOOST_DURATION) {
      tSpeed = 0
    } else {
      const t = elapsed / BOOST_DURATION
      if (t <= 0.5) {
        tSpeed = t / 0.5
      } else {
        tSpeed = (1 - t) / 0.5
      }
    }

    if (elapsed >= COLOR_DURATION && elapsed >= BOOST_DURATION) {
      animStart = null
    }
  }

  const easedColor = easeInOut(tColor)
  const easedSpeed = easeInOut(tSpeed)

  const speed = BASE_SPEED + (PEAK_SPEED - BASE_SPEED) * easedSpeed

  circles.forEach((circle, index) => {
    // rebote
    if (
      circle.x + circle.radius > canvas.width ||
      circle.x - circle.radius < 0
    ) {
      circle.dx = -circle.dx
    }
    if (
      circle.y + circle.radius > canvas.height ||
      circle.y - circle.radius < 0
    ) {
      circle.dy = -circle.dy
    }

    // movimiento
    circle.x += circle.dx * speed
    circle.y += circle.dy * speed

    // color con easing más largo
    if (animStart !== null) {
      const from = oldColorsRGB[index]
      const to = newColorsRGB[index]

      const r = Math.round(from.r + (to.r - from.r) * easedColor)
      const g = Math.round(from.g + (to.g - from.g) * easedColor)
      const b = Math.round(from.b + (to.b - from.b) * easedColor)

      circle.color = `rgb(${r}, ${g}, ${b})`
    } else if (newColorsRGB[index]) {
      const to = newColorsRGB[index]
      circle.color = `rgb(${to.r}, ${to.g}, ${to.b})`
    }

    drawCircle(circle)
  })
}

function updateCircleColors(targetColors) {
  if (!Array.isArray(targetColors) || targetColors.length === 0) return

  oldColorsRGB = circles.map((c) => {
    if (c.color.startsWith("rgb")) {
      const [r, g, b] = c.color.match(/\d+/g).map(Number)
      return { r, g, b }
    }

    return hexToRgb(c.color)
  })

  newColorsRGB = circles.map(() => {
    const i = Math.floor(Math.random() * targetColors.length)
    return hexToRgb(targetColors[i])
  })

  animPending = true
}

function updateCircleColorsRandom(count = 3) {
  const randomColors = Array.from({ length: count }, () => randomHexColor())
  updateCircleColors(randomColors)
}

function pauseAnimation() {
  isPaused = true
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function playAnimation() {
  if (!isPaused) return
  isPaused = false
  requestAnimationFrame(animate)
}

function resize() {
  canvas.width = window.innerWidth * 1.5
  canvas.height = window.innerHeight * 1.5
  initCircles()
}

window.addEventListener("resize", resize)
resize()
initCircles()
requestAnimationFrame(animate)

/* setInterval(() => {
  updateCircleColorsRandom()
}, COLOR_DURATION)
updateCircleColorsRandom() */
