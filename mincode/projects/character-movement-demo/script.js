const plazaBox = document.getElementById("plaza")
const userBox = document.getElementById("user")
const SCREEN = {
  w: window.innerWidth,
  h: window.innerHeight,
}
let user = {
  x: SCREEN.w / 2,
  y: SCREEN.h / 2,
  velocity: 200, //pixels traveled in 1s
}
let interval
let rute = {
  state: true,
  margin: 60,
}

setUserPosition()

window.addEventListener("resize", () => {
  SCREEN.w = window.innerWidth
  SCREEN.h = window.innerHeight
  setUserPosition()
})
plaza.addEventListener("click", function (event) {
  const newUserPositionX = event.clientX
  const newUserPositionY = event.clientY
  rute.state = false
  moveUser(newUserPositionX, newUserPositionY)
})

function moveUser(newUserPositionX, newUserPositionY) {
  window.clearInterval(interval)
  const userPositionX = userBox.offsetLeft
  const userPositionY = userBox.offsetTop

  const distance = getDistance(
    newUserPositionX,
    newUserPositionY,
    userPositionX,
    userPositionY
  )
  const duration = distance / user.velocity

  user.x = newUserPositionX
  user.y = newUserPositionY

  if (userPositionX > newUserPositionX) {
    userBox.setAttribute("data-direction", "left")
  } else {
    userBox.setAttribute("data-direction", "right")
  }

  userBox.style.setProperty("--user-travel-time", duration)
  setUserPosition()
  userBox.setAttribute("data-action", "walking")

  interval = setTimeout(() => {
    userBox.setAttribute("data-action", "stoped")

    if (rute.state) {
      setTimeout(() => {
        moveUser(
          getRandNum(rute.margin, SCREEN.w - rute.margin),
          getRandNum(rute.margin, SCREEN.h - rute.margin)
        )
      }, getRandNum(1, 3) * 1000)
    }
  }, duration * 1000 + 100)
}
function setUserPosition() {
  userBox.style.top = user.y + "px"
  userBox.style.left = user.x + "px"
}
function getDistance(newX, newY, userX, userY) {
  const distance = Math.sqrt(
    Math.pow(userX - newX, 2) + Math.pow(userY - newY, 2)
  )
  return Math.floor(distance)
}

function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

moveUser(
  getRandNum(rute.margin, SCREEN.w - rute.margin),
  getRandNum(rute.margin, SCREEN.h - rute.margin)
)
