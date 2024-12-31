$(document).ready(function(){
  
  $('#AGUJA3, #AGUJA4, #AGUJA2').css('transform', 'rotate(-40deg)');
  
  var dt = new Date();
  var segundo = dt.getSeconds().toFixed(0);
  var minuto = dt.getMinutes().toFixed(0);
  var hora = dt.getHours();
  var anyo = dt.getFullYear();
  
  var arrayAnyo = anyo.toString().split("");
  //console.log(arrayAnyo);
  
  if(hora > 12){ hora = hora - 12}
  hora = ((hora*1) + (minuto*1 / 100));
  
  for(i=0; i < arrayAnyo.length; i++){
    $('#ANYO'+(i+1)).css('transform', 'translateY('+ (515 - ((arrayAnyo[i] * 515) / 10)) +'px)');
  }
  
  //else if(hora = 12){ hora = hora - 0 }
  //console.log(hora)
  
  $('#SEC').css('transform', 'rotate('+ (((segundo * 360) / 60) + 135) +'deg)');
  $('#MIN').css('transform', 'rotate('+ (((minuto * 360) / 60) - 45) +'deg)');
  $('#HOR').css('transform', 'rotate('+ (hora * 360) / 12 +'deg)');
  
  
  /* -- ACTIVAR MAQUINA DEL TIEMPO -- */
  $('#PALANCA1').click(function(){
      $('.contenedor').toggleClass('ACTIVO');
  });
});