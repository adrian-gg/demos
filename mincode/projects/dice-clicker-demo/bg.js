// Vertex Shader
const vertexShaderSource = `
  precision mediump float;
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

// Fragment Shader
const fragmentShaderSource = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_intensity;
  uniform float u_speed;
  uniform vec3 u_bgColor;
  uniform vec3 u_lineColor;
  uniform float u_alpha;
  varying vec2 v_uv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) +
      (c - a)* u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  float grid(vec2 uv, float scale, float thickness) {
    uv *= scale;
    vec2 grid = abs(fract(uv - 0.5) - 0.5);
    vec2 line = step(vec2(thickness), grid);
    return min(line.x, line.y);
  }

  void main() {
    vec2 uv = v_uv;
    float n = fbm(uv + u_time * u_speed);
    uv.x += u_intensity * n;
    uv.y += u_intensity * n;
    float g = grid(uv, 17.0, 0.03);
    vec3 color = mix(u_lineColor, u_bgColor, g);
    gl_FragColor = vec4(color, u_alpha);
  }
`

// WebGL setup
const canvas = document.getElementById("canvas")
const gl = canvas.getContext("webgl")

function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  gl.viewport(0, 0, canvas.width, canvas.height)
}

window.addEventListener("resize", resize)
resize()

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    return null
  }
  return program
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
)
const program = createProgram(gl, vertexShader, fragmentShader)

const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
const timeUniformLocation = gl.getUniformLocation(program, "u_time")
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
const intensityUniformLocation = gl.getUniformLocation(program, "u_intensity")
const bgColorUniformLocation = gl.getUniformLocation(program, "u_bgColor")
const lineColorUniformLocation = gl.getUniformLocation(program, "u_lineColor")
const alphaUniformLocation = gl.getUniformLocation(program, "u_alpha")
const speedUniformLocation = gl.getUniformLocation(program, "u_speed")

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

function render(time) {
  time *= 0.001 // convertir a segundos

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)

  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

  gl.uniform1f(timeUniformLocation, time)
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
  gl.uniform1f(intensityUniformLocation, 1.6)
  gl.uniform1f(speedUniformLocation, 0.005)

  gl.uniform3f(bgColorUniformLocation, 1.0, 1.0, 1.0) // fondo blanco
  gl.uniform3f(lineColorUniformLocation, 0.0, 0.0, 0.0) // líneas negras
  gl.uniform1f(alphaUniformLocation, 1.0) // opacity

  gl.drawArrays(gl.TRIANGLES, 0, 6)

  requestAnimationFrame(render)
}

requestAnimationFrame(render)
