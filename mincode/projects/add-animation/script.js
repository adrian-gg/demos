let counter = 0
let animacionAct = false

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomColor = () => {
  const colors = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"]
  return colors[getRandomNumber(0, colors.length - 1)]
}

const getViewportOffset = (el) => {
  const $window = $(window)

  const scrollLeft = $window.scrollLeft(),
    scrollTop = $window.scrollTop(),
    offset = $(el).offset()

  return {
    left: offset.left - scrollLeft,
    top: offset.top - scrollTop,
  }
}

function printCounter() {
  $counterBox = $(".counter")
  $counterBox.html(counter)

  if (counter > 0) {
    $counterBox.removeClass("empty")
  } else {
    $counterBox.addClass("empty")
  }
}

function printAnimation(type, objeto) {
  //obener objeto destino
  const targetBox = type === "add" ? $(".counter-container .box") : objeto

  //obener posición del objeto destino
  const positionTarget = {
    top: getViewportOffset(targetBox).top,
    left: getViewportOffset(targetBox).left,
  }

  //obener objeto clicado
  const clicked = type === "add" ? objeto : $(".counter-container .box")

  //obener posición del objeto clicado
  const positionClicked = getViewportOffset(clicked)

  //crear elemento en animacionCesta
  $(".animation-container").html(
    `<div class="animation">
        <div class="animation-icon">${
          type === "add" ? `<span class="material-icons"> add </span>` : "1"
        }</div>
      </div>`
  )

  const color = getRandomColor()
  $(".animation .animation-icon").css({
    "border-color": color,
    "background-color": color,
  })

  //añadir la posición del objeto clicado al elemento
  $(".animation").css("top", positionClicked.top)
  $(".animation").css("left", positionClicked.left)

  //añadir la posición del objeto destino al elemento
  setTimeout(function () {
    $(".animation").css("top", positionTarget.top)
    $(".animation").css("left", positionTarget.left)
  }, 1)

  if (type === "remove") {
    counter--
    printCounter()
  }

  //eliminar elemento
  setTimeout(function () {
    if (type === "add") {
      counter++
      printCounter()
    }

    $(".animation").remove()
  }, 600)
}

$(".pluses-container .box").click(function () {
  const $este = $(this)

  if (!animacionAct) {
    animacionAct = true

    if ($este.find(".icon").hasClass("add")) {
      printAnimation("remove", $este)
      $este.html(
        `<div class="icon"><span class="material-icons"> add </span></div>`
      )
      $este.removeClass("select")
    } else {
      printAnimation("add", $este)
      $este.html(
        `<div class="icon add"><span class="material-icons"> remove </span></div>`
      )
      $este.addClass("select")
    }

    setTimeout(() => {
      animacionAct = false
    }, 600)
  }
})

printCounter()
