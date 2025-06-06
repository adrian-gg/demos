$(document).ready(function () {
  const data = {
    profiles: {
      Woody: {
        name: "Woody",
        bg: "#f7c026",
        color: "#ffffff",
        img: "https://annabranco.github.io/toy-story-games/images/avatar/av_woody.png",
        type: "main",
      },
      BuzzLightyear: {
        name: "Buzz Lightyear",
        bg: "#613b6f",
        color: "#ffffff",
        img: "https://annabranco.github.io/toy-story-games/images/avatar/av_buzz.png",
        type: "secondary",
      },
    },
    texts: {
      0: {
        name: "Woody",
        text: ["¡Buzz! Eh, Buzz, ¿estás bien?"],
      },
      1: {
        name: "BuzzLightyear",
        text: [
          "¡Se fue! Todo se fue.",
          "Todo se ha ido. Bye bye, ¡yuju! Adios.",
        ],
      },
      2: {
        name: "Woody",
        text: ["¿Pero qué te ha pasado?"],
      },
      3: {
        name: "BuzzLightyear",
        text: [
          "En un momento estás defendiendo toda la galaxia y de repente te encuentras tomando té de Darjeeling",
          "con María Antonieta y su hermanita. Jijiji",
        ],
      },
      4: {
        name: "Woody",
        text: [
          "Creo que ya has tomado bastante té por hoy. Vamos te sacare de aquí Buzz.",
        ],
      },
      5: {
        name: "BuzzLightyear",
        text: ["¿No lo entiendes? ¿Ves el sombrero? Soy la Sra. Nesbitt."],
      },
    },
  }

  const size = Object.keys(data.texts).length - 1
  let longText = false
  let count = 0,
    countLongText = 0

  const nameId = $("#name")
  const nameBox = $(".name-box")
  const textId = $("#text")
  const imgId = $("#img-box")

  textId.click(function () {
    textId.css("pointer-events", "none")
    next()
  })
  next()

  function next() {
    if (count > size) {
      count = 0
    }

    getText(count)

    if (longText == false) {
      count++
    }
  }

  function getText(num) {
    const { name, text } = data.texts[num]
    const person = data.profiles[name]

    if (text.length - 1 > countLongText) {
      longText = true
      print(person, text)
      countLongText++
    } else {
      longText = false
      print(person, text)
      countLongText = 0
    }
  }

  function print(person, text) {
    nameBox.removeAttr("style")

    person.type == "main"
      ? nameBox.removeClass("name-r")
      : nameBox.addClass("name-r")

    nameBox.css({
      "background-color": person.bg,
      color: person.color,
    })

    imgId.empty().append('<img src="' + person.img + '" alt="">')

    nameId.empty().append(person.name)
    startScrambleText(text[countLongText])
    //textId.empty().append(text[countLongText]);
  }

  function startScrambleText(text) {
    let stringSplit = text.split("")
    let i = 0
    textId.empty()

    for (let j = 0; j < stringSplit.length; j++) {
      textId.append(
        '<span class="letter-' + j + '">' + stringSplit[j] + "</span>"
      )
    }

    let interval = setInterval(function () {
      if (i < stringSplit.length) {
        $(".letter-" + i).css("opacity", 1)
      } else {
        clearInterval(interval)
        textId.css("pointer-events", "initial")
      }
      i++
    }, 30)
  }
})
