'use strict';

(function () {
  var canvas = document.getElementById('playground');
  var clearButton = document.getElementById('clear');
  var context = canvas.getContext('2d');

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.strokeStyle = "black";
  context.lineJoin = "round";
  context.lineWidth = 5;
  var prevX;
  var prevY;

  function draw(x, y, dragging) {
    context.beginPath();

    if (dragging) {
      context.moveTo(prevX, prevY);
    } else {
      context.moveTo(x - 1, y);
    }

    context.lineTo(x, y);
    context.closePath();
    context.stroke();
  }

  var drawStart = function (e) {
    var x = (e.touches ? e.touches[0].pageX : e.pageX) - this.offsetLeft;
    var y = (e.touches ? e.touches[0].pageY : e.pageY) - this.offsetTop;

    prevX = x;
    prevY = y;

    draw(x, y, false);
  };

  var drawMove = function (e) {
    e.preventDefault();

    if (e.buttons || e.touches) {
      var x = (e.touches ? e.touches[0].pageX : e.pageX) - this.offsetLeft;
      var y = (e.touches ? e.touches[0].pageY : e.pageY) - this.offsetTop;

      draw(x, y, true);

      prevX = x;
      prevY = y;
    }
  };

  var clearCanvas = function () {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  canvas.addEventListener('mousedown', drawStart, false);
  canvas.addEventListener('mousemove', drawMove, false);

  canvas.addEventListener('touchstart', drawStart, false);
  canvas.addEventListener('touchmove', drawMove, false);

  clearButton.addEventListener('click', clearCanvas, false);
}());
