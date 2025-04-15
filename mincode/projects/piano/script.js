const URL_SOUNDS = "./sounds/"
const sounds = {
  c: new Audio(`${URL_SOUNDS}28.mp3`),
  cis: new Audio(`${URL_SOUNDS}29.mp3`),
  d: new Audio(`${URL_SOUNDS}30.mp3`),
  dis: new Audio(`${URL_SOUNDS}31.mp3`),
  e: new Audio(`${URL_SOUNDS}32.mp3`),
  f: new Audio(`${URL_SOUNDS}33.mp3`),
  fis: new Audio(`${URL_SOUNDS}34.mp3`),
  g: new Audio(`${URL_SOUNDS}35.mp3`),
  gis: new Audio(`${URL_SOUNDS}36.mp3`),
  a: new Audio(`${URL_SOUNDS}37.mp3`),
  ais: new Audio(`${URL_SOUNDS}38.mp3`),
  b: new Audio(`${URL_SOUNDS}39.mp3`),
}

const keyboardMapping = {
  q: "c", // q → C4
  2: "cis", // 2 → C#4
  w: "d", // w → D4
  3: "dis", // 3 → D#4
  e: "e", // e → E4
  r: "f", // r → F4
  5: "fis", // 5 → F#4
  t: "g", // t → G4
  6: "gis", // 6 → G#4
  y: "a", // y → A4
  7: "ais", // 7 → A#4
  u: "b", // u → B4
}

$(document).ready(function () {
  function playSound(key) {
    $(`[data-key="${key}"]`).addClass("key-presed")

    setTimeout(function () {
      $(`[data-key="${key}"]`).removeClass("key-presed")
    }, 200)

    if (!sounds[key].paused) {
      sounds[key].pause()
      sounds[key].currentTime = 0
    }

    sounds[key].play()
  }

  $(".key").on("click", function () {
    const key = $(this).data("key")
    playSound(key)
  })

  const pressedKeys = new Set()

  $(document).on("keydown", function (event) {
    const key = event.key.toLowerCase()

    if (keyboardMapping[key] && !pressedKeys.has(key)) {
      pressedKeys.add(key)
      playSound(keyboardMapping[key])
    }
  })

  $(document).on("keyup", function (event) {
    const key = event.key.toLowerCase()
    if (keyboardMapping[key]) {
      pressedKeys.delete(key)
    }
  })
})
