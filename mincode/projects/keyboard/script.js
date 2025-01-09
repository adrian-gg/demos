const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
  [" "],
]
const keyboardBox = $(".keyboard")
const outputBox = $(".output")
const outputText = []

function printKeyboard() {
  keyboard.forEach((row) => {
    keyboardBox.append(`<div class="row" style="--length-row: ${row.length};">
      ${row
        .map(
          (key) =>
            `<div class="${
              key == " " ? "key key--s" : "key"
            }" data-key="${key}">${key}</div>`
        )
        .join("")}
    </div>`)
  })
}

printKeyboard()

$(document).on("keydown", function (event) {
  const key = event.key
  //console.log(event.keyCode)
  const keyBox = $('[data-key="' + key + '"]')

  keyBox.toggleClass("key--pressed")
  write(event)
  setTimeout(() => keyBox.toggleClass("key--pressed"), 100)
})

function write(e) {
  const letter = e.key
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    outputText.push(letter)
  } else if (e.keyCode == 32) {
    outputText.push("⠀")
  } else if (e.keyCode == 8) {
    outputText.pop()
  }
  outputBox.empty().append(outputText.join(""))
}
