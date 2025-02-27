let hoverBoxes = document.querySelectorAll(".card .hover-box")
let defaultRotation = "rotateY(0deg) rotateX(0deg)"
let isTouchingCard = false

hoverBoxes.forEach((hoverBox) => {
  const card = hoverBox.parentElement

  // Eventos de ratón
  hoverBox.addEventListener("mousemove", function (e) {
    processMovement(e, false, card, hoverBox)
  })

  hoverBox.addEventListener("mouseout", function () {
    resetCard(card)
  })

  // Eventos táctiles
  hoverBox.addEventListener("touchstart", function (e) {
    isTouchingCard = true
    disableScroll()
    processMovement(e, true, card, hoverBox)
  })

  hoverBox.addEventListener("touchmove", function (e) {
    e.preventDefault() // Evitar scroll mientras se toca
    const { left, top, width, height } = hoverBox.getBoundingClientRect()
    const { pageX, pageY } = e.touches[0]

    // Verificar si el dedo está fuera del área del hoverBox
    if (
      pageX < left ||
      pageX > left + width ||
      pageY < top ||
      pageY > top + height
    ) {
      resetCard(card)
      enableScroll()
      isTouchingCard = false
      return
    }

    processMovement(e, true, card, hoverBox)
  })

  hoverBox.addEventListener("touchend", function () {
    resetCard(card)
    enableScroll()
    isTouchingCard = false
  })
})

function processMovement(e, touchEnabled, card, hoverBox) {
  const { pageX, pageY } = touchEnabled ? e.touches[0] : e
  const {
    left,
    top,
    width: hoverWidth,
    height: hoverHeight,
  } = hoverBox.getBoundingClientRect()
  const { width: cardWidth, height: cardHeight } = card.getBoundingClientRect()

  // Coordenadas relativas dentro del hoverBox
  const offsetX = (pageX - left) / hoverWidth
  const offsetY = (pageY - top) / hoverHeight

  // Ajustar las coordenadas a las proporciones de la card
  const centeredX = (offsetX - 0.5) * (hoverWidth / cardWidth)
  const centeredY = (offsetY - 0.5) * (hoverHeight / cardHeight)

  const wMultiple = cardWidth / 1.5 // Ajustar la intensidad según el tamaño
  const yRotate = centeredX * (0.1 * wMultiple)
  const xRotate = -centeredY * (0.1 * wMultiple)

  card.style.setProperty("--xRotate", xRotate)
  card.style.setProperty("--yRotate", yRotate)

  // Calcular brillo
  const angle = Math.atan2(centeredY, centeredX) * (180 / Math.PI)
  card.style.setProperty("--angle", `${angle + 90}deg`)
  card.style.setProperty("--alpha", ((pageY - top) / cardHeight) * 0.4)
}

function resetCard(card) {
  card.style.setProperty("--xRotate", 0)
  card.style.setProperty("--yRotate", 0)
  card.style.setProperty("--angle", "60deg")
  card.style.setProperty("--alpha", 0.2)
}

function disableScroll() {
  document.body.style.overflow = "hidden"
}

function enableScroll() {
  document.body.style.overflow = ""
}
