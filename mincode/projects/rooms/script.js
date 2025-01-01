$(document).ready(function () {
  var sensiv = 1
  var box = 0
  var click = false
  var tiempo = 1
  var maxRoom = 2
  $("body").mousemove(function (e) {
    mouseX = e.pageX
    mouseY = e.pageY
    screenW = document.getElementById("CONT-GEN").clientWidth
    screenH = document.getElementById("CONT-GEN").clientHeight
    forX = mouseX / screenW / 2
    forY = mouseY / screenY / 2

    numX = mouseX - screenW
    numY = mouseY - screenH

    numX = numX + mouseX
    numY = numY + mouseY

    if (click == false) {
      document.getElementById("box-room-0").style.transform =
        "translateZ(500px) rotateX(" +
        -numY / 500 +
        "deg)" +
        "rotateY(" +
        numX / 500 +
        "deg)"
      document.getElementById("box-room-1").style.transform =
        "translateZ(500px) rotateX(" +
        -numY / 500 +
        "deg)" +
        "rotateY(" +
        numX / 500 +
        "deg)"
      document.getElementById("box-room-2").style.transform =
        "translateZ(500px) rotateX(" +
        -numY / 500 +
        "deg)" +
        "rotateY(" +
        numX / 500 +
        "deg)"
    }
  })

  $(".-flecha-left").click(function (event) {
    click = true
    $(".-txt-plano").css("opacity", "0")
    document.getElementById("box-room-" + box).style.transition = "transform 1s"
    document.getElementById("box-room-" + box).style.transform =
      "translateZ(500px) rotate3d(1, 1, 1, 0deg)"

    setTimeout(function () {
      box = box - 1
      if (box < 0) {
        box = maxRoom
      }

      $(".-active").css("z-index", "9")
      document.getElementById("box-room-" + box).style.transform =
        "translateX(-100%) translateZ(0px)"

      setTimeout(function () {
        $(".-active").addClass("-animation-left")
        document.getElementById("box-room-" + box).classList.add("-active")
        document
          .getElementById("box-room-" + box)
          .classList.add("-animation-prev")
      }, 100)

      setTimeout(function () {
        document.getElementById("box-room-" + box).style = "z-index: 99"
      }, 320)
    }, 1000)

    setTimeout(function () {
      box = box + 1
      if (box > maxRoom) {
        box = 0
      }
      document.getElementById("box-room-" + box).classList.remove("-active")
      document.getElementById("box-room-" + box).style = ""

      box = box - 1
      if (box < 0) {
        box = maxRoom
      }
      $(".box-room").removeClass("-animation-left")
      $(".box-room").removeClass("-animation-prev")

      document.getElementById("box-room-" + box).style = ""
      document.getElementById("box-room-" + box).style.transform =
        "translateZ(500px) rotate3d(1, 1, 1, 0deg)"
      document.getElementById("box-room-" + box).style.transition =
        "transform 1s"

      if (box == 0) {
        $(".-txt-plano").empty().append("<p>&lt;/BLUE&gt;</p>")
      } else if (box == 1) {
        $(".-txt-plano").empty().append("<p>&lt;/RED&gt;</p>")
      } else {
        $(".-txt-plano").empty().append("<p>&lt;/GREEN&gt;</p>")
      }
      $(".-txt-plano").css("opacity", "1")
    }, 2000)

    setTimeout(function () {
      document.getElementById("box-room-" + box).style = ""
      click = false
    }, 3000)
  })

  $(".-flecha-right").click(function (event) {
    click = true
    $(".-txt-plano").css("opacity", "0")
    document.getElementById("box-room-" + box).style.transition = "transform 1s"
    document.getElementById("box-room-" + box).style.transform =
      "translateZ(500px) rotate3d(1, 1, 1, 0deg)"

    setTimeout(function () {
      box = box + 1
      if (box > 2) {
        box = 0
      }

      $(".-active").css("z-index", "9")
      document.getElementById("box-room-" + box).style.transform =
        "translateX(+100%) translateZ(0px)"

      setTimeout(function () {
        $(".-active").addClass("-animation-right")
        document.getElementById("box-room-" + box).classList.add("-active")
        document
          .getElementById("box-room-" + box)
          .classList.add("-animation-prev")
      }, 100)

      setTimeout(function () {
        document.getElementById("box-room-" + box).style = "z-index: 99"
      }, 320)
    }, 1000)

    setTimeout(function () {
      box = box - 1
      if (box < 0) {
        box = maxRoom
      }
      document.getElementById("box-room-" + box).classList.remove("-active")
      document.getElementById("box-room-" + box).style = ""

      box = box + 1
      if (box > maxRoom) {
        box = 0
      }
      $(".box-room").removeClass("-animation-right")
      $(".box-room").removeClass("-animation-prev")

      document.getElementById("box-room-" + box).style = ""
      document.getElementById("box-room-" + box).style.transform =
        "translateZ(500px) rotate3d(1, 1, 1, 0deg)"
      document.getElementById("box-room-" + box).style.transition =
        "transform 1s"
      if (box == 0) {
        $(".-txt-plano").empty().append("<p>&lt;/BLUE&gt;</p>")
      } else if (box == 1) {
        $(".-txt-plano").empty().append("<p>&lt;/RED&gt;</p>")
      } else {
        $(".-txt-plano").empty().append("<p>&lt;/GREEN&gt;</p>")
      }
      $(".-txt-plano").css("opacity", "1")
    }, 2000)

    setTimeout(function () {
      document.getElementById("box-room-" + box).style = ""
      click = false
    }, 3000)
  })

  $(".cond-flechas span").hover(
    function () {
      if (box == 0) $(this).css("fill", "#4285f4")
      if (box == 1) $(this).css("fill", "#ea4335")
      if (box == 2) $(this).css("fill", "#34a853")
    },
    function () {
      $(".cond-flechas span").css("fill", "black")
    }
  )
})
