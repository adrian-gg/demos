const bodyBox = $("body")
const wheelBox = $(".wheel")
const colorsBox = $(".colors")
let multiplier = 7

function getRandomColor(min, max) {
  let randomColor = (Math.random() * (max - min) + min).toFixed(0) * 1
  randomColor = randomColor + 360 * multiplier
  return randomColor
}

wheelBox.click(function () {
  bodyBox.css("background-color", "var(--bg-cont-b)")
  wheelBox.css("pointer-events", "none")
  colorsBox.removeClass("animation")
  let color = getRandomColor(1, 360)

  $("#animation").html(
    `@keyframes animation{
        0%{transform: rotate(0deg)}
        100%{transform: rotate(${color}deg)}
      }`
  )

  setTimeout(function () {
    colorsBox.addClass("animation")
  }, 1)

  setTimeout(function () {
    let bgc
    if (color > 0 && color <= 90 + 360 * multiplier) {
      bgc = "b"
    } else if (
      color > 90 + 360 * multiplier &&
      color <= 180 + 360 * multiplier
    ) {
      bgc = "y"
    } else if (
      color > 180 + 360 * multiplier &&
      color <= 270 + 360 * multiplier
    ) {
      bgc = "g"
    } else if (color > 270 + 360 * multiplier) {
      bgc = "r"
    }

    bodyBox.css("background-color", `var(--bg-${bgc})`)
    wheelBox.css("pointer-events", "initial")
  }, 4000)
})
