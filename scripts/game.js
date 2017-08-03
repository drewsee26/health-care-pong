var canvas = document.getElementById("game-table");
var context = canvas.getContext("2d");

function drawCanvas (){
    context.beginPath();
    context.lineWidth = 6;
    context.strokeStyle = 'red';
    context.strokeRect(0, 0, 1000, 450);
}

function addKeyEvent(){
    window.addEventListener('keydown', keyPress, true);
}

function Paddle (x, y){
    this.x = x;
    this.y = y;
    this.color = 'white';
    this.width = 15;
    this.height = 100;
    var speed = 10;
    
    this.move = function(dy){
        context.clearRect(this.x, this.y, this.width, this.height);
        this.y += dy;
    };
    
    this.render = function(){
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

var player = new Paddle(5, 175);
var computer = new Paddle(979.5, 175);

function keyPress (keyDirection){
    if(keyDirection.keyCode === 40){
        if(player.y <= 340){
            player.move(10);
        }
    } else if(keyDirection.keyCode === 38){
        if(player.y >= 10){
            player.move(-10);
        }
    }
}

function Ball (){
    this.x = 500;
    this.y = 225;
    var color = 'white';
    this.radius = 15;
    this.render = function(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fill();
    };
}

var gameBall = new Ball(500, 225);

var render = function(){
    drawCanvas();
    player.render();
    computer.render();
    gameBall.render();
    animate(render);
};

var animate = window.requestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000/60);
};

var step = function(){
    render();
};





window.onload = function(){
    step();
    addKeyEvent();
};