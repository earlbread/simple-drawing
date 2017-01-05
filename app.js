(function() {
    var canvas = document.getElementById('playground');
    var context = canvas.getContext('2d');

    var drawStart = function(e) {
        var x = (e.touches ? e.touches[0].pageX : e.pageX) - this.offsetLeft;
        var y = (e.touches ? e.touches[0].pageY : e.pageY) - this.offsetTop;

        paint = true;
        addClick(x, y, false);
        redraw();
    };

    var drawMove = function(e) {
		if(paint){
            var x = (e.touches ? e.touches[0].pageX : e.pageX) - this.offsetLeft;
            var y = (e.touches ? e.touches[0].pageY : e.pageY) - this.offsetTop;
			addClick(x, y, true);
			redraw();
		}
    };

    var drawEnd = function(e) {
        paint = false;
        redraw();
    };

    var drawCancel = function(e) {
        paint = false;
    };


    canvas.addEventListener('mousedown', drawStart, false);
    canvas.addEventListener('mousemove', drawMove, false);
    canvas.addEventListener('mouseup', drawEnd, false);
    canvas.addEventListener('mouseleave', drawCancel, false);

	canvas.addEventListener('touchstart', drawStart, false);
	canvas.addEventListener('touchmove', drawMove, false);
	canvas.addEventListener('touchend', drawEnd, false);
	canvas.addEventListener('touchcancel', drawCancel, false);

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging)
    {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    function redraw(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        context.strokeStyle = "black";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for(var i=0; i < clickX.length; i++) {
            context.beginPath();
            if(clickDrag[i] && i){
                context.moveTo(clickX[i-1], clickY[i-1]);
            }else{
                context.moveTo(clickX[i]-1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }
}());
