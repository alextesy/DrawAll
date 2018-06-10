


    var canvas = document.getElementById("imgCanvas");
    var context = canvas.getContext("2d");
    canvas.addEventListener('click',createElement,false )
    serverAddress='http:/localhost:3000/';
    var shape='Triangle';
    var color='black';
    var size=50;
    var ip='0.0.0.0';
    var currentElement;
    //var x;
    //var y;
    
    
    function saveElement(elm){
        shape=elm;
    
    }
    function canvasReady(){
        canvas.onmousedown = draw;
        redraw()
 
    }
  
    function redraw(){
        $.getJSON(serverAddress, function(result){
            $.each(result, function(i, field){
                draw(field)
            });
        });
    }
    function createElement(e){

        var rect = canvas.getBoundingClientRect();
        var color=document.getElementById('colorP').value;
        var currElement={
            ip:ip,
            shape:shape,
            size:size,
            color:color,
            x:e.clientX - rect.left,
            y:e.clientY - rect.top,
        }
        saveElementDB(canvas,currElement)
        draw(currElement)

    }
    function draw(element){
        if(element.shape=='Circle'){
            drawCirle(element);
        }
        else if(element.shape=='Triangle'){
            drawTriangle(element);
        }
        else if(element.shape=='Rectangle'){
            drawRectangle(element);
        }

    }
    function drawRectangle(element){
        //var pos = getMousePos(canvas, e);
        posx = element.x;
        posy = element.y;
        context.fillStyle = element.color;
        context.beginPath();
        context.rect(posx-(size/2),posy-(element.size/2),element.size,element.size); 
        context.fill();
        
    }
    function drawCirle(element) {
        //var pos = getMousePos(canvas, e);
        posx =element.x;
        posy = element.y;
        context.fillStyle = element.color;
        context.beginPath();
        context.arc(posx, posy, element.size/2, 0, 2*Math.PI);
        context.fill();
    }
    

    function drawTriangle(element){
        //var pos = getMousePos(canvas, e);
        posx = element.x;
        posy = element.y;
        context.beginPath();
        context.moveTo(posx, posy);
        context.lineTo(posx, posy+element.size);
        context.lineTo(posx+element.size, posy+element.size);
        context.fillStyle = element.color;
        context.closePath();
        context.fill();
    }

    function saveElementDB(canvas,element) {
        var rect = canvas.getBoundingClientRect();
        $.ajax({
            method: "POST",
            url: serverAddress+"element",
            data:{
                'ip':element.ip,
                'shape':element.shape,
                'color':element.color,
                'size':element.size,
                'x': element.x,
                'y': element.y
            },
          
          })
          
    }



    canvasReady();

