const MovieCard = (num) => {
  return `<article class="card">
          <img
            src="https://placehold.co/341x192/333/555?text=${num}"
            style="width: 100%"
          />
          <div class="card-details">
            <h1 class="card-title">Movie title</h1>
            <p class="card-description">Lorem ipsum dolor sit amet</p>
            <button class="more"><span class="material-icons"> keyboard_arrow_down </span></button>
          </div>
        </article>`
}

$(document).ready(function () {
  function setSlides() {
    const sliderBox = $("#slider")

    sliderBox.empty()

    for (let i = 0; i < 10; i++) {
      sliderBox.append(MovieCard(i + 1))
    }
  }

  setSlides()

  // Initialize Slick Slider
  $(".flickfeed").on("init", function () {
    $(this).removeClass("hideme") // Show the slider after init
    setTimeout(function () {
      $(".flickfeed").addClass("loaded")
    }, 10)

    let currentfirst = $(this).find(".slick-active").first()
    $(currentfirst).addClass("firster")
    let currentlast = $(this).find(".slick-active").last()
    $(currentlast).addClass("laster")
  })

  // Reapply background images after each change
  $(".flickfeed").on("afterChange", function () {
    let currentfirst = $(this).find(".slick-active").first()
    $(this).find(".slick-slide").removeClass("firster")
    $(currentfirst).addClass("firster")

    let currentlast = $(this).find(".slick-active").last()
    $(this).find(".slick-slide").removeClass("laster")
    $(currentlast).addClass("laster")
  })

  // Slick slider settings
  $(".flickfeed").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    appendDots: $(".slick-slider-dots"),
    prevArrow: `<button type="button" class="slick-prev">
    <span class="material-icons">arrow_back_ios_new</span>
    </button>`,
    nextArrow: `<button type="button" class="slick-next">
    <span class="material-icons">arrow_forward_ios</span>
    </button>`,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          dots: false,
          arrows: false,
          draggable: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  })

  // Hover effects for slides
  $(".slick-slide").mouseenter(function () {
    if ($(window).width() > 991) {
      if ($(this).hasClass("firster")) {
        var hoverslide = $(this)
        $(hoverslide).nextAll().addClass("furthernextslides")
      } else if ($(this).hasClass("laster")) {
        var hoverslide = $(this)
        $(hoverslide).prevAll().addClass("furtherprevslides")
      } else {
        var hoverslide = $(this)
        $(hoverslide).nextAll().addClass("nextslides")
        $(hoverslide).prevAll().addClass("prevslides")
      }
    }
  })

  $(".slick-slide").mouseleave(function () {
    if ($(window).width() > 991) {
      $(this).parent().find(".slick-slide").removeClass("nextslides")
      $(this).parent().find(".slick-slide").removeClass("prevslides")
      $(this).parent().find(".slick-slide").removeClass("furthernextslides")
      $(this).parent().find(".slick-slide").removeClass("furtherprevslides")
    }
  })
})
