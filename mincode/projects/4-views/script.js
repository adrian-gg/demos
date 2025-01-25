$(document).ready(function () {
  let mouseX, mouseY, screenW, screenH
  let one = $(".container__image--one")
  let two = $(".container__image--two")
  let three = $(".container__image--three")
  let four = $(".container__image--four")
  let border = 1
  let borderWidth = border / 2

  $("body").mousemove(function (e) {
    mouseX = e.pageX
    mouseY = e.pageY
    screenW = $(window).width()
    screenH = $(window).height()

    one.css(
      "clip-path",
      `inset(0px calc(${screenW - mouseX}px + var(--borderWidth)) calc(${
        screenH - mouseY
      }px + var(--borderWidth)) 0px)`
    )
    two.css(
      "clip-path",
      `inset(0px 0px calc(${
        screenH - mouseY
      }px + var(--borderWidth)) calc(${mouseX}px + var(--borderWidth)))`
    )
    three.css(
      "clip-path",
      `inset(calc(${mouseY}px + var(--borderWidth)) calc(${
        screenW - mouseX
      }px + var(--borderWidth)) 0px 0px)`
    )
    four.css(
      "clip-path",
      `inset(calc(${mouseY}px + var(--borderWidth)) 0px 0px calc(${mouseX}px + var(--borderWidth)))`
    )
  })

  $("body").mouseout(function (e) {
    one.css(
      "clip-path",
      `inset(0px calc(50% + var(--borderWidth)) calc(50% + var(--borderWidth)) 0px)`
    )
    two.css(
      "clip-path",
      `inset(0px 0px calc(50% + var(--borderWidth)) calc(50% + var(--borderWidth)))`
    )
    three.css(
      "clip-path",
      `inset(calc(50% + var(--borderWidth)) calc(50% + var(--borderWidth)) 0px 0px)`
    )
    four.css(
      "clip-path",
      `inset(calc(50% + var(--borderWidth)) 0px 0px calc(50% + var(--borderWidth)))`
    )
  })
})
