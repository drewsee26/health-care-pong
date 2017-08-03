var canvas = document.getElementById("game-table");
var context = canvas.getContext("2d");

context.beginPath();
context.lineWidth = 6;
context.strokeStyle = 'red';
context.strokeRect(0, 0, 1000, 450);

function Paddle (x, y){
    this.x = x;
    this.y = y;
    this.color = 'white';
    this.width = 15;
    this.height = 100;
    this.render = function(){
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
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

var player = new Paddle(5, 175);
var computer = new Paddle(979.5, 175);
var gameBall = new Ball(500, 225);

var render = function(){
    player.render();
    computer.render();
    gameBall.render(); 
};


window.onload = function(){
    render();
};