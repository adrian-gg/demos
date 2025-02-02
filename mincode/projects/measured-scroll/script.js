const scrollContainerBox = document.querySelector("#scrollContainer")
const scrollPositionBox = document.querySelector("#scrollPosition")
const htmlBox = document.querySelector("html")

const linesSpacing = 30 //30px

htmlBox.style.setProperty("--lines-spacing", `${linesSpacing / 10}rem`)
scrollContainerBox.addEventListener("scroll", (e) => {
  let scrollPosition = Math.floor(scrollContainerBox.scrollTop) - linesSpacing
  scrollPositionBox.innerHTML = scrollPosition < 0 ? 0 : scrollPosition
})
