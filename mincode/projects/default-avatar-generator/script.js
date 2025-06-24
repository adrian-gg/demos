// UTILS
const getRandomSeed = (length = 8) => {
  const newSeed = Array.from({ length }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  ).join("")
  document.querySelector(".seed").innerText = newSeed
  return newSeed
}

const seedToNumber = (seed) => {
  let num = 0
  for (let i = 0; i < seed.length; i++) {
    num = (num * 31 + seed.charCodeAt(i)) >>> 0
  }
  return num
}

const mulberry32 = (seed) => {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const getRandomInt = (min, max, rand) =>
  Math.floor(rand() * (max - min + 1)) + min

function generateAvatar(avatarBox, seed) {
  const seedNum = seedToNumber(seed)
  const rand = mulberry32(seedNum)

  const COLORS = [
    "#f48836",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#267c81",
    "#268147",
    "#528126",
  ]
  const SIZES = [5, 7, 9]
  //const SIZES = [5]

  const getRandomColor = () => COLORS[Math.floor(rand() * COLORS.length)]
  const getRandomSize = () => SIZES[Math.floor(rand() * SIZES.length)]

  const randomColor = getRandomColor()
  const randomSize = getRandomSize()
  let avatar = Array.from({ length: randomSize }, () =>
    Array.from({ length: (randomSize - 1) / 2 }, () => getRandomInt(0, 1, rand))
  ).map((row) => [...row, getRandomInt(0, 1, rand), ...[...row].reverse()])

  let avatarBackground = ""
  avatar.forEach((row, i) => {
    let line = `linear-gradient(to right, `
    row.forEach((p, j) => {
      const color = p ? randomColor : "transparent"
      line += `${color} ${j}rem, ${color} ${j + 1}rem${
        j === row.length - 1 ? "" : ", "
      }`
    })
    line += `)${i === row.length - 1 ? "" : ", "}`
    avatarBackground += line
  })

  avatarBox.style.backgroundImage = avatarBackground
  avatarBox.style.backgroundSize = `${randomSize}rem 1rem`
  avatarBox.style.backgroundPosition = avatar
    .map((_, i) => `0rem ${i}rem`)
    .join(", ")
  avatarBox.style.width = `${randomSize}rem`
  avatarBox.style.height = `${randomSize}rem`
}

const avatarBox = document.querySelector(".avatar")
generateAvatar(avatarBox, "XYZKGSMQ")
document.querySelector("button").addEventListener("click", () => {
  generateAvatar(avatarBox, getRandomSeed())
})
