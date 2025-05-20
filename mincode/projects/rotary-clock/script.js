const numbersBox = document.querySelector(".clock-numbers")
const clockBox = document.querySelector(".clock")
const clockHours = document.querySelector(".hour-hand")
const clockMinutes = document.querySelector(".minute-hand")
const clockSeconds = document.querySelector(".second-hand")

function setNumbers() {
  for (let i = 1; i <= 12; i++) {
    const numberBox = document.createElement("div")
    numberBox.classList.add("clock-number")
    numberBox.style.rotate = `calc((360 / 12) * ${i}deg)`

    const number = document.createElement("span")
    number.innerText = i
    //number.style.transform = `rotate(${(360 / 12) * -i}deg)`

    numberBox.appendChild(number)
    numbersBox.appendChild(numberBox)
  }
}

function setTime() {
  var dt = new Date()
  var seconds = dt.getSeconds()
  var minutes = dt.getMinutes()
  var hours = dt.getHours()
  if (hours > 12) {
    hours = hours - 12
  }
  hours = hours * 1 + (minutes * 1) / 100

  clockHours.style.transform = `rotate(${(hours * 360) / 12}deg)`
  clockMinutes.style.transform = `rotate(${(minutes * 360) / 60 + 3}deg)`
  clockSeconds.style.transform = `rotate(${(seconds * 360) / 60}deg)`
  clockBox.style.transform = `rotate(-${(seconds * 360) / 60}deg)`
}

window.addEventListener("load", () => {
  setNumbers()
  setTime()
})
