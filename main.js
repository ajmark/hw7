
window.onload = function() {

$(function(){
  // Bind the swipeleftHandler callback function to the swipe event on div.box
  $( "#response" ).on( "swipeleft", swipeleftHandler );
  $( "#response" ).on( "swiperight", swiperightHandler );
  $( "#response" ).bind( "taphold", tapholdHandler );
  // Callback function references the event target and adds the 'swipeleft' class to it
  function swipeleftHandler( event ){
    $( event.target ).css( "background-color","blue" );
  }
  function swiperightHandler(event){
    $(event.target ).css("background-color", "red");
  }
  function tapholdHandler(event){
    $(event.target).css("background-color","green");
  }
});

document.ontouchmove = function(e){ e.preventDefault(); }

  var draw = {
    // fill: "#8D172F",
    // stroke: "#8D172F",
    clear: "whitesmoke",
    size: 7,
    cap: 'round',
    join: 'round',
    width: 800,
    height: 800
  }

  var canvas  = document.getElementById('drawspace');
  var canvastop = canvas.offsetTop;
  var canvasleft = canvas.offsetLeft;	

  var context = canvas.getContext("2d");

  var lastx;
  var lasty;

  function clear() {
    context.fillStyle = draw.clear;
    context.rect(0, 0, draw.width, draw.height);
    context.fill();
  }

  
  function path( moves ) {
    context.beginPath();
    context.strokeStyle = draw.stroke;
    context.fillStyle = draw.fill;
    context.lineCap = draw.cap;
    context.lineJoin = draw.join;
    context.lineWidth = draw.size;

    moves();

    // context.fill();
    // context.stroke();
    // context.closePath();
    document.getElementById("response").innerHTML = "<p>Width: </p>" + lastx + "<p>Height: " + lasty;
  }

  // function dot(x,y) {
  //   path(function(){
  //     context.arc(x,y,5,0,Math.PI*2,false);
  //     context.fillStyle = '#8D172F';
  //     context.fill();
  //     context.closePath();
  //   });
  // }

  // function line(fromx,fromy, tox,toy) {
  //   path(function(){
  //     context.moveTo(fromx, fromy);
  //     context.lineTo(tox, toy);
  //     context.strokeStyle = "#8D172F";
  //     context.stroke();
  //     context.closePath();
  //   });
  // }

  function square(fromx,fromy,tox,toy){
    path(function(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.rect(fromx, fromy, tox, toy);
      context.strokeStyle = '#8D172F';
      context.stroke();
      context.closePath();
    });
  }

  function position(event,action) {

    event.preventDefault();		

    var newx = event.touches[0].clientX - canvasleft;	
    var newy = event.touches[0].clientY - canvastop;	


    action(lastx,lasty, newx,newy);

    lastx = newx;
    lasty = newy;
  }

  canvas.ontouchstart = function(event){
    if (event.touches[0]){
      position(event,function(lastx,lasty, newx,newy){
              square(newx,newy,200 ,200 );
      });
    };
  }

  canvas.ontouchmove = function(event){                  
    position(event,function(lastx,lasty, newx,newy){
      square(lastx,lasty, 200 ,200);
    })
  }


  var clearButton = document.getElementById('clear');
  clearButton.onclick = clear;



  clear();
}