const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
  [" ", "Backspace"],
]
const keyboardBox = $("#keyboard")
const outputBox = $("#output")
const outputText = []
let keysBoxes

function printKeyboard() {
  keyboard.forEach((row) => {
    keyboardBox.append(`<div class="row" style="--length-row: ${row.length};">
      ${row
        .map((key) => {
          const k = key === "Backspace" ? "⌫" : key
          return `<div class="${
            key === " "
              ? "key key--s"
              : key === "Backspace"
              ? "key key--b"
              : "key"
          }" data-key="${k}">${k}</div>`
        })
        .join("")}
    </div>`)
  })

  keysBoxes = $(".key")
}

printKeyboard()

$(document).on("keydown", function (event) {
  const key = event.key === "Backspace" ? "⌫" : event.key
  const keyBox = $(`[data-key="${key}"]`)
  keyBox.addClass("key--pressed")
  write(event)
  setTimeout(() => keyBox.removeClass("key--pressed"), 100)
})

keysBoxes.on("click", function (event) {
  const key = event.target.dataset.key
  const keyBox = $(`[data-key="${key}"]`)
  keyBox.addClass("key--pressed")
  write(key, true)
  setTimeout(() => keyBox.removeClass("key--pressed"), 100)
})

function write(e, isLetter = false) {
  if (isLetter) {
    if (e === " ") {
      outputText.push(" ")
    } else if (e === "⌫") {
      outputText.pop()
    } else {
      outputText.push(e)
    }
  } else {
    const letter = e.key
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      outputText.push(letter)
    } else if (e.keyCode === 32) {
      outputText.push(" ")
    } else if (e.keyCode === 8) {
      outputText.pop()
    }
  }
  outputBox.html(outputText.join("").replaceAll(" ", "&nbsp;"))
}
