$(document).ready(function () {
  const watch = {
    h1: $("#h1"),
    h2: $("#h2"),
    m1: $("#m1"),
    m2: $("#m2"),
    s1: $("#s1"),
    s2: $("#s2"),
  }

  let now = new Date()
  const date = {
    h: 0,
    m: 0,
    s: 0,
  }

  const setBinary = (num) => {
    return Number(num).toString(2).padStart(4, "0")
  }

  function setDate() {
    now = new Date()
    date.h = now.getHours().toString().padStart(2, "0")
    date.m = now.getMinutes().toString().padStart(2, "0")
    date.s = now.getSeconds().toString().padStart(2, "0")
  }

  function renderDots() {
    Object.entries(date).forEach(([key, val]) => {
      watch[key + 1].html(
        setBinary(val[0])
          .split("")
          .map((n) => `<div class="dot d${n}"></div>`)
      )
      watch[key + 2].html(
        setBinary(val[1])
          .split("")
          .map((n) => `<div class="dot d${n}"></div>`)
      )
    })
  }

  setInterval(() => {
    setDate()
    renderDots()
  }, 1000)

  setDate()
})
