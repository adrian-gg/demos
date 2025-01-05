$(document).ready(function () {
  let numbers = [
    [0, 4, 4, 1, 5, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 3, 5, 2, 4, 4, 3],
    [6, 6, 0, 1, 6, 6, 5, 5, 6, 6, 5, 5, 6, 6, 5, 5, 6, 6, 5, 5, 6, 6, 2, 3],
    [0, 4, 4, 1, 2, 4, 1, 5, 0, 4, 3, 5, 5, 0, 4, 3, 5, 2, 4, 1, 2, 4, 4, 3],
    [0, 4, 4, 1, 2, 4, 1, 5, 0, 4, 3, 5, 2, 4, 1, 5, 0, 4, 3, 5, 2, 4, 4, 3],
    [0, 1, 0, 1, 5, 5, 5, 5, 5, 2, 3, 5, 2, 4, 1, 5, 6, 6, 5, 5, 6, 6, 2, 3],
    [0, 4, 4, 1, 5, 0, 4, 3, 5, 2, 4, 1, 2, 4, 1, 5, 0, 4, 3, 5, 2, 4, 4, 3],
    [0, 4, 4, 1, 5, 0, 4, 3, 5, 2, 4, 1, 5, 0, 1, 5, 5, 2, 3, 5, 2, 4, 4, 3],
    [0, 4, 4, 1, 2, 4, 1, 5, 6, 6, 5, 5, 6, 6, 5, 5, 6, 6, 5, 5, 6, 6, 2, 3],
    [0, 4, 4, 1, 5, 0, 1, 5, 5, 2, 3, 5, 5, 0, 1, 5, 5, 2, 3, 5, 2, 4, 4, 3],
    [0, 4, 4, 1, 5, 0, 1, 5, 5, 2, 3, 5, 2, 4, 1, 5, 0, 4, 3, 5, 2, 4, 4, 3],
    /*[6, 6, 6, 6, 6, 0, 1, 6, 6, 2, 3, 6, 6, 0, 1, 6, 6, 2, 3, 6, 6, 6, 6, 6]*/
    [6, 6, 0, 1, 2, 3, 0, 1, 2, 3, 6, 6],
  ]

  //let rules = [ "ctl", "ctr", "cbl", "cbr", "lx", "ly", "dtrbl" ];
  let rules_num = [
    [90, 180],
    [180, 270],
    [0, 90],
    [0, 270],
    [90, 270],
    [180, 0] /*, [45, 225]*/,
    [0, 0],
  ]

  let today = new Date()
  let h = today.getHours()
  let m = today.getMinutes()

  function drawNumber(char, id) {
    $("#main-container").append(
      '<div class="box-number number-' + char + '" id="' + id + '"></div>'
    )
    for (let i = 0; i < numbers[char].length; i++) {
      $("#" + id).append(
        '<div class="clock"><span class="p-m"></span><span class="p-h"></span></div>'
      )
    }
  }

  function drawCss(char) {
    let i = char
    for (let j = 1; j < numbers[i].length + 1; j++) {
      $("#css-box-clocks").append(`
        .number-${i} .clock:nth-child(${j}) .p-m{rotate:${
        rules_num[numbers[i][j - 1]][0]
      }deg;${numbers[i][j - 1] === 6 ? "background-color:#303030;" : ""}}
        .number-${i} .clock:nth-child(${j}) .p-h{rotate:${
        rules_num[numbers[i][j - 1]][1]
      }deg;${numbers[i][j - 1] === 6 ? "background-color:#303030;" : ""}}
      `)
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    drawCss(i)
  }

  drawNumber(0, "h-1")
  drawNumber(0, "h-2")
  drawNumber(10, "space")
  drawNumber(0, "m-1")
  drawNumber(0, "m-2")

  $("#css-box-animations").empty().append(`
    #main-container.digital-mode .clock span.p-m{rotate: ${0}deg}
    #main-container.digital-mode .clock span.p-h{rotate: ${0}deg}
  `)

  setInterval(function () {
    let today = new Date()
    let h = today.getHours()
    let m = today.getMinutes().toFixed(0)
    h = h + m / 100
    let timeString =
      String(Math.floor(h)).padStart(2, "0") + String(m).padStart(2, "0")

    if ($("#main-container").hasClass("digital-mode")) {
      $("#css-box-animations").empty().append(`
        #main-container.digital-mode .clock span.p-m{rotate: ${
          (m * 360) / 60
        }deg}
        #main-container.digital-mode .clock span.p-h{rotate: ${
          (h * 360) / 12
        }deg}
      `)
    } else {
      for (let i = 0; i < 10; i++) {
        $(".box-number").removeClass(`number-${i}`)
      }

      $("#h-1").addClass(`number-${timeString[0]}`)
      $("#h-2").addClass(`number-${timeString[1]}`)
      $("#m-1").addClass(`number-${timeString[2]}`)
      $("#m-2").addClass(`number-${timeString[3]}`)
    }
  }, 1000)

  $("body").click(function () {
    $("#main-container").toggleClass("digital-mode")
  })
})
