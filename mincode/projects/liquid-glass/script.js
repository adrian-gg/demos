const backgrounds = [
  "https://www.publicdomainpictures.net/pictures/620000/velka/seamless-pansy-background-art-1720428019Tvp.jpg",
  "https://www.publicdomainpictures.net/pictures/690000/velka/seamless-damask-art-pattern-1747726831kNl.jpg",
  "https://www.publicdomainpictures.net/pictures/560000/velka/pansy-floral-vintage-seamless-1701456953LQP.jpg",
  "https://www.publicdomainpictures.net/pictures/540000/velka/blue-floral-seamless-pattern-1695177876xJ3.jpg",
  "https://www.publicdomainpictures.net/pictures/610000/velka/seamless-floral-wallpaper-art-1715193626Gct.jpg",
  "https://www.publicdomainpictures.net/pictures/560000/velka/chinese-flower-background-seamless-17029340927Zx.jpg",
]

const menu = document.querySelector(".menu-wrapper")
const menuOptions = document.querySelector(".menu-options")
const randomIndex = Math.floor(Math.random() * backgrounds.length)

function randomBackground() {
  const background = backgrounds[randomIndex]
  document.querySelector("body").style.backgroundImage = `url(${background})`
}

function updateBackground(i) {
  const background = backgrounds[i]
  document.querySelector("body").style.backgroundImage = `url(${background})`
}

function generateOptions() {
  const menuBox = document.getElementById("menu")

  for (let i = 0; i < backgrounds.length; i++) {
    const option = document.createElement("div")
    option.classList.add("menu-option")
    option.style.backgroundImage = `url(${backgrounds[i]})`
    if (i === randomIndex) {
      option.classList.add("active")
    }

    option.addEventListener("click", () => {
      if (!option.classList.contains("active")) {
        const optionActive = document.querySelector(".menu-option.active")
        if (optionActive) {
          optionActive.classList.remove("active")
        }
        option.classList.add("active")
        updateBackground(i)
      }
    })

    menuBox.appendChild(option)
  }
}

randomBackground()
generateOptions()
