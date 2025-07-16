const projects = [
  {
    id: 1,
    title: "Silence",
    year: "2021",
    image: "./img/7d47d4e2-0eff-4e2f-9734-9d24a8ba067e.png",
  },
  {
    id: 2,
    title: "Resonance",
    year: "2022",
    image: "./img/5eee2d2d-3d4d-4ae5-96d4-cdbae70a2387.png",
  },
  {
    id: 3,
    title: "Essence",
    year: "2022",
    image: "./img/def30e8a-34b2-48b1-86e1-07ec5c28f225.png",
  },
  {
    id: 4,
    title: "Void",
    year: "2023",
    image: "./img/44d7cb23-6759-49e4-9dc1-acf771b3a0d1.png",
  },
  {
    id: 5,
    title: "Presence",
    year: "2023",
    image: "./img/7712fe42-42ca-4fc5-9590-c89f2db99978.png",
  },
  {
    id: 6,
    title: "Flow",
    year: "2024",
    image: "./img/cbee1ec5-01b6-4ffe-9f34-7da7980454cf.png",
  },
  {
    id: 7,
    title: "Clarity",
    year: "2024",
    image: "./img/2e91a9d1-db85-4499-ad37-6222a6fea23b.png",
  },
  {
    id: 8,
    title: "Breath",
    year: "2024",
    image: "./img/ff2ac3d3-fa94-4811-89f6-0d008b27e439.png",
  },
  {
    id: 9,
    title: "Stillness",
    year: "2025",
    image: "./img/c39a4043-f489-4406-8018-a103a3f89802.png",
  },
  {
    id: 10,
    title: "Surrender",
    year: "2025",
    image: "./img/e5e399f2-4050-463b-a781-4f5a1615f28e.png",
  },
]

function preloadImages() {
  projects.forEach((project) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = project.image
  })
}

let activeBackgroundElement

function initializeBackground(box) {
  activeBackgroundElement = document.createElement("div")
  activeBackgroundElement.classList.add("image")

  box.style.opacity = "0"
  box.appendChild(activeBackgroundElement)
}

function updateBackground(project, box) {
  if (activeBackgroundElement) {
    activeBackgroundElement.style.backgroundImage = `url(${project.image})`

    activeBackgroundElement.classList.remove("image--open")
    void activeBackgroundElement.offsetWidth
    activeBackgroundElement.classList.add("image--open")

    box.style.opacity = "1"
  }
}

function clearBackground(box) {
  if (activeBackgroundElement) {
    box.style.opacity = "0"
  }
}

function createProjectItem(project, box) {
  const option = document.createElement("li")
  option.classList.add("item")
  option.innerHTML = `<span class="item-title">${project.title}</span><span class="item-date">${project.year}</span>`

  option.addEventListener("mouseenter", () => {
    updateBackground(project, box)
  })
  option.addEventListener("mouseleave", () => {
    clearBackground(box)
  })

  return option
}

document.addEventListener("DOMContentLoaded", function () {
  const menuBox = document.querySelector(".menu")
  const backgroundBox = document.querySelector(".background")

  initializeBackground(backgroundBox)

  projects.forEach((project) => {
    menuBox.appendChild(createProjectItem(project, backgroundBox))
  })

  preloadImages()
})
