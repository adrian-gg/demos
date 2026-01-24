const NUM_PORTS = 25 // 5 x 5
const cableConfigs = [
  { color: "#f96157", width: 9, maxLength: 150, startPort: 10, endPort: 23 },
  { color: "#f96157", width: 9, maxLength: 100, startPort: 17, endPort: 8 },
  { color: "#fcd973", width: 9, maxLength: 150, startPort: 0, endPort: 1 },
  { color: "#fcd973", width: 9, maxLength: 150, startPort: 15, endPort: 16 },
  { color: "#51b4a0", width: 9, maxLength: 100, startPort: 5, endPort: 2 },
  { color: "#51b4a0", width: 9, maxLength: 120, startPort: 12, endPort: 4 },
]

/* == UTILS ===================================== */
function getCenter(el) {
  return {
    x: el.offsetLeft + el.offsetWidth / 2,
    y: el.offsetTop + el.offsetHeight / 2,
  }
}

function getPortUnder(end) {
  const rect = end.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2

  return ports.find((p) => {
    const r = p.getBoundingClientRect()
    return x > r.left && x < r.right && y > r.top && y < r.bottom
  })
}

/* == SETUP ===================================== */
const rack = document.getElementById("rack")
const portsGrid = document.getElementById("ports")
const svg = document.getElementById("svg")

const ports = []
const cables = []

let draggingEnd = null
let offsetX = 0
let offsetY = 0

/* == PUERTOS 5x5 =============================== */
for (let i = 0; i < NUM_PORTS; i++) {
  const port = document.createElement("div")
  port.className = "port"
  port.dataset.index = i
  port.dataset.occupied = ""
  portsGrid.appendChild(port)
  ports.push(port)
}

/* == CABLE ===================================== */
function updateCable(end) {
  const cable = cables.find((c) => c.ends.includes(end))
  const [a, b] = cable.ends

  if (!a.dataset.port || !b.dataset.port) return

  const p1 = getCenter(a)
  const p2 = getCenter(b)

  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const sagY = Math.min(cable.maxLength, Math.abs(dy) + 50)

  const control1 = { x: p1.x + dx * 0.25, y: p1.y + sagY }
  const control2 = { x: p1.x + dx * 0.75, y: p2.y + sagY }

  cable.path.setAttribute(
    "d",
    `M ${p1.x} ${p1.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${p2.x} ${p2.y}`,
  )
}

/* == SNAP ====================================== */
function snapToPort(end, port) {
  if (end.dataset.port) {
    ports[end.dataset.port].dataset.occupied = ""
    ports[end.dataset.port].classList.remove("occupied")
  }

  const rackRect = rack.getBoundingClientRect()
  const rect = port.getBoundingClientRect()
  const x = (rect.left - rackRect.left + rect.width / 2 - 9) / 10
  const y = (rect.top - rackRect.top + rect.height / 2 - 9) / 10

  end.style.left = `${x}rem`
  end.style.top = `${y}rem`
  end.dataset.port = port.dataset.index
  end.lastValid = { x, y, portIndex: port.dataset.index }

  port.dataset.occupied = "true"
  port.classList.add("occupied")

  updateCable(end)
}

/* == CABLES ==================================== */
cableConfigs.forEach((cfg) => {
  // Crear path SVG
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("stroke", cfg.color)
  path.setAttribute("stroke-width", cfg.width)
  path.setAttribute("fill", "none")
  path.setAttribute("stroke-linecap", "round")
  svg.appendChild(path)

  // Crear extremos
  const endA = createEnd(cfg.color)
  const endB = createEnd(cfg.color)

  const cable = {
    path,
    ends: [endA, endB],
    maxLength: cfg.maxLength,
    startPort: cfg.startPort,
    endPort: cfg.endPort,
  }

  cables.push(cable)

  // Conectar extremos a los puertos por defecto
  snapToPort(endA, ports[cfg.startPort])
  snapToPort(endB, ports[cfg.endPort])
})

/* == EXTREMIDADES ============================== */
function createEnd(color) {
  const end = document.createElement("div")
  end.className = "end"
  end.style.borderColor = color
  end.dataset.port = ""
  end.inParking = false
  end.lastValid = null

  rack.appendChild(end)

  end.addEventListener("mousedown", (e) => {
    draggingEnd = end
    const rect = end.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top
  })

  return end
}

/* == RESTAURAR ================================= */
function restoreLastValid(end) {
  if (!end.lastValid) return
  const last = end.lastValid
  end.style.left = `${last.x}rem`
  end.style.top = `${last.y}rem`
  end.dataset.port = last.portIndex
  updateCable(end)
}

/* == DRAG ====================================== */
document.addEventListener("mousemove", (e) => {
  if (!draggingEnd) return

  const rackRect = rack.getBoundingClientRect()
  draggingEnd.style.position = "absolute"
  draggingEnd.style.left = `${e.clientX - rackRect.left - offsetX}px`
  draggingEnd.style.top = `${e.clientY - rackRect.top - offsetY}px`

  updateCable(draggingEnd)
})

document.addEventListener("mouseup", () => {
  if (!draggingEnd) return

  const port = getPortUnder(draggingEnd)
  if (port && !port.dataset.occupied) snapToPort(draggingEnd, port)
  else restoreLastValid(draggingEnd)

  draggingEnd = null
})
