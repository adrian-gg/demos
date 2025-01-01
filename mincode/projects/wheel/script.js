var multiplicador = 7

$(".ruleta").click(function () {
  $("body").css("background-color", "var(--bg-cont-b")
  $(".ruleta").css("pointer-events", "none")
  $(".colores").removeClass("animacion")
  var color = colorAleatorio(1, 360)

  $("#animacion")
    .empty()
    .append(
      "@keyframes animacion{" +
        "0%{transform: rotate(0deg)}" +
        "100%{transform: rotate(" +
        color +
        "deg)}" +
        "}"
    )

  setTimeout(function () {
    $(".colores").addClass("animacion")
    //$('.colores').css('animation', 'animacion 4s ease-out forwards');
  }, 1)

  setTimeout(function () {
    if (color > 0 && color <= 90 + 360 * multiplicador) {
      $("body").css("background-color", "var(--bg-b)")
    } else if (
      color > 90 + 360 * multiplicador &&
      color <= 180 + 360 * multiplicador
    ) {
      $("body").css("background-color", "var(--bg-y)")
    } else if (
      color > 180 + 360 * multiplicador &&
      color <= 270 + 360 * multiplicador
    ) {
      $("body").css("background-color", "var(--bg-g)")
    } else if (color > 270 + 360 * multiplicador) {
      $("body").css("background-color", "var(--bg-r)")
    }

    $(".ruleta").css("pointer-events", "initial")
  }, 4000)
})

function colorAleatorio(min, max) {
  var colorAleatorio = (Math.random() * (max - min) + min).toFixed(0) * 1
  colorAleatorio = colorAleatorio + 360 * multiplicador
  return colorAleatorio
}
