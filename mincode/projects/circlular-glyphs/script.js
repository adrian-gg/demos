const $board = document.getElementById("board");
const $input = document.getElementById("input");

const alph = "abcdefghijklmnopqrstuvwxyz0123456789";
const ALPHABET = {
  a: "🟥",
  b: "🟧",
  c: "🟨",
  d: "🟩",
  e: "🟦",
  f: "🟪",
  g: "🟫",
  h: "⬛",
  i: "⬜",
};

$input.addEventListener("input", (e) => {
  let text = e.target.value;
  $board.innerHTML = tranform(text);
});

function setBlock(t) {
  return `<div class="cell"><div style="background-image: url('./assets/${t}.png');"></div></div>`;
}

function tranform(t) {
  let text = clearText(t).toLowerCase().split("");

  text = text.map((char, i) => {
    let letter = char;
    return setBlock(alph.indexOf(letter) >= 0 ? letter : "blank");
  });

  return text.join("");
}

function clearText(t) {
  return t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "");
}
