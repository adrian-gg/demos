$(document).ready(function () {

  $('.reproductor').html('<audio id="play" class="play" src=""></audio>');
  var versiones = 'aircheck';
  var $reprop = document.getElementById('play');

  $('.directo-toggle').click(function () {
    $('.directo-toggle span').toggleClass('clicado');

    if ($('.directo-toggle span').hasClass('clicado')) {
      versiones = 'live';
    } else {
      versiones = 'aircheck';
    }
  });

  $(".cancion").click(function () {
    var $reprop = document.getElementById('play');

    if ($(this).parents('.contenedor-cancion').hasClass('in-play')) {
      $reprop.pause();

    } else if ($(this).parents('.contenedor-cancion').hasClass('in-pause')) {
      $reprop.play();

    } else {
      $reprop.pause();
      $(".cancion").parents('.contenedor-cancion').removeClass('in-pause')
      $(".cancion").parents('.contenedor-cancion').removeClass('in-play');
      $(this).parents('.contenedor-cancion').addClass('in-pause');

      var iD = $(this).children("img").attr("alt");

      $(".nombre h1").text("♪  " + iD);
      $(".cancion").parents('.contenedor-cancion').removeClass("cancion-sec");
      $(this).parents('.contenedor-cancion').addClass("cancion-sec");

      var enlace = "https://acmusicext.com/static/kk/" + versiones + "/" + iD + ".ogg";
      $('.reproductor').children().replaceWith('<audio id="play" class="play" src="' + enlace + '" loop></audio>');
      $reprop = document.getElementById('play');
      $reprop.currentTime = 0;
      $reprop.play();
      //$reprop.volume = 1.0;
      /*  1.0 is highest volume (100%. This is default)
        0.5 is half volume (50%)
        0.0 is silent (same as mute)*/
    }

    $(this).parents('.contenedor-cancion').toggleClass('in-play');
    $(this).parents('.contenedor-cancion').toggleClass('in-pause');

  });
});