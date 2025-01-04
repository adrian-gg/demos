const bodyBox = document.querySelector("body")
const cursorBox = document.querySelector("#cursor")
const numGalaxies = 14
const bulgeGalaxySize = 2
const galaxySize = 6
let screenSize = {
  x: document.documentElement.clientWidth,
  y: document.documentElement.clientHeight,
}
let hovering = false

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (min + max) - min)
}

function setGalaxies(screenSize) {
  for (let i = 0; i < numGalaxies; i++) {
    const galaxy = document.createElement("div")
    const bulgeGalaxy = document.createElement("div")
    galaxy.classList.add("galaxy")
    bulgeGalaxy.classList.add("galaxy-bulge")

    galaxy.style.setProperty(
      "--x",
      getRandomNumber(0, screenSize.x / 10 - galaxySize)
    )
    galaxy.style.setProperty(
      "--y",
      getRandomNumber(0, screenSize.y / 10 - galaxySize)
    )
    galaxy.appendChild(bulgeGalaxy)

    galaxy.addEventListener("mouseenter", function () {
      hovering = true
      cursorBox.style.transition = "0.2s"
      cursorBox.style.left =
        Number(getComputedStyle(galaxy).getPropertyValue("--x")) +
        galaxySize / 2 +
        "rem"
      cursorBox.style.top =
        Number(getComputedStyle(galaxy).getPropertyValue("--y")) +
        galaxySize / 2 +
        "rem"
    })
    galaxy.addEventListener("mouseout", function () {
      hovering = false
      setTimeout(() => {
        cursorBox.style.transition = "initial"
      }, 100)
    })

    bodyBox.insertBefore(galaxy, bodyBox.firstChild)
  }
}

window.addEventListener("mousemove", function (event) {
  if (!hovering) {
    cursorBox.style.left = event.clientX + "px"
    cursorBox.style.top = event.clientY + "px"
  }
  console.dir(bodyBox)
})

window.addEventListener("resize", function () {
  screenSize = {
    x: document.documentElement.clientWidth,
    y: document.documentElement.clientHeight,
  }

  const galaxyBoxes = document.querySelectorAll(".galaxy")
  galaxyBoxes.forEach((galaxy) => {
    galaxy.parentNode.removeChild(galaxy)
  })

  setGalaxies(screenSize)
})

setGalaxies(screenSize)
