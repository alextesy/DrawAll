


    var canvas = document.getElementById("imgCanvas");
    var context = canvas.getContext("2d");
    canvas.addEventListener('click',draw,false )
    serverAddress='http:/localhost:3000/';
    var element='Triangle';
    var color='black';
    var size=50;
    var ip='0.0.0.0';
    var x;
    var y;
    function saveColor(){
        color=document.getElementById('colorP').value
    }
    
    function saveElement(elm){
        element=elm;
    
    }
    function canvasReady(){
        canvas.onmousedown = draw;
 {x:evt.clientX - rect.left,
            y:evt.clientY - rect.top }
    }
  
    function redraw(){
        $.getJSON(serverAddress, function(result){
            $.each(result, function(i, field){
                $("div").append(field + " ");
            });
        });
    }
    function getCoordinates(e){
        var rect = canvas.getBoundingClientRect();
        x=e.clientX - rect.left;
        y=e.clientY - rect.top;
    }
    function draw(e){
        if(element=='Circle'){
            drawCirle(e);
        }
        else if(element=='Triangle'){
            drawTriangle(e);
        }
        else if(element=='Rectangle'){
            drawRectangle(e);
        }

    }
    function drawRectangle(e){
        var pos = getMousePos(canvas, e);
        posx = pos.x;
        posy = pos.y;
        context.fillStyle = color;
        context.beginPath();
        context.rect(posx-size,posy-size,size*2,size*2); 
        context.fill();
        
    }
    function drawCirle(e) {
        var pos = getMousePos(canvas, e);
        posx = pos.x;
        posy = pos.y;
        context.fillStyle = color;
        context.beginPath();
        context.arc(posx, posy, size, 0, 2*Math.PI);
        context.fill();
    }
    

    function drawTriangle(e){
        var pos = getMousePos(canvas, e);
        posx = pos.x;
        posy = pos.y;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(posx-size, posy-size);
        context.lineTo(posx-size, posy+size);
        context.lineTo(posx+size, posy+size);
        context.closePath();
        context.fill();
    }

    function getMousePos(canvas,evt) {
        var rect = canvas.getBoundingClientRect();
        color=document.getElementById('colorP').value
        $.ajax({
            method: "POST",
            url: serverAddress+"element",
            data:{
                'ip':ip,
                'element':element,
                'color':color,
                'size':size,
                'x': evt.clientX - rect.left,
                'y': evt.clientY - rect.top
            },
          
          })
          return {x:evt.clientX - rect.left,
            y:evt.clientY - rect.top }
    }



    canvasReady();

