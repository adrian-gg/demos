const orbitalPositions = {
  mercury: 29,
  venus: 54,
  earth: 81,
  mars: 130,
  jupiter: 227,
  saturn: 256,
  uranus: 314,
  neptune: 347,
}
const newOrbitalPositions = getNewOrbitalPositions()
const planets = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
]

planets.forEach((planet) => {
  if (planet != "earth") {
    const planetPosition = newOrbitalPositions[planet]
    const idPlanet = `#${planet} .orbit`
    const planetOrbitContainer = document.querySelector(idPlanet)
    planetOrbitContainer.style.transform = `rotate(${planetPosition}deg)`
  }
})

function getNewOrbitalPositions() {
  const orbitalPeriods = {
    mercury: 88,
    venus: 225,
    earth: 365,
    mars: 687,
    jupiter: 4333,
    saturn: 10759,
    uranus: 30687,
    neptune: 60190,
  }

  const initialDate = new Date("2024-04-13")
  const today = new Date()
  const elapsedDays = Math.floor((today - initialDate) / (1000 * 60 * 60 * 24))

  const newOrbits = {}

  for (const planet in orbitalPeriods) {
    const initialPosition = orbitalPositions[planet]
    const newPosition = (initialPosition + elapsedDays) % 360
    newOrbits[planet] = newPosition
  }

  return newOrbits
}
