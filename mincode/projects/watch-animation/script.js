const watchBox = document.querySelector(".watch")
const times = {
  inSpeed: 0.3,
  rotationSpeed: 0.6,
  moveSpeed: 0.25,
  opacitySpeed: 0.6,
  delay: 0.6,
  rotationDelay: 0.4,
}

watchBox.style.setProperty("--in-speed", times.inSpeed + "s")
watchBox.style.setProperty("--rotation-speed", times.rotationSpeed + "s")
watchBox.style.setProperty("--rotation-delay", times.rotationDelay + "s")
watchBox.style.setProperty("--move-speed", times.moveSpeed + "s")
watchBox.style.setProperty(
  "--move2-delay",
  times.inSpeed + times.rotationSpeed * 11 + times.moveSpeed + "s"
)
watchBox.style.setProperty("--opacity-speed", times.opacitySpeed + "s")
watchBox.classList.add("anim")

const interval = setInterval(() => {
  watchBox.classList.remove("anim")
  watchBox.offsetWidth
  watchBox.classList.add("anim")
}, (times.inSpeed + times.rotationSpeed * 11 + times.moveSpeed + times.opacitySpeed + times.delay) * 1000)
