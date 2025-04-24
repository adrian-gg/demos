const screen = {
  width: window.innerWidth,
  height: window.innerHeight,
}

document.addEventListener("mousemove", (e) => {
  const x = e.clientX
  const y = e.clientY

  const mouse = {
    x,
    y,
  }

  const mouseInScreen = {
    x: mouse.x - screen.width / 2,
    y: mouse.y - screen.height / 2,
  }

  const mouseInFrame = {
    x: mouseInScreen.x / screen.width,
    y: mouseInScreen.y / screen.height,
  }

  const frame = document.querySelector(".frame")

  frame.style.transform = `rotateY(${mouseInFrame.x * 20}deg) rotateX(${
    -mouseInFrame.y * 20
  }deg)`
})

window.addEventListener("resize", () => {
  screen.width = window.innerWidth
  screen.height = window.innerHeight
})
