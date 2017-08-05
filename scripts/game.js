var canvas = document.getElementById("game-table");
var context = canvas.getContext("2d");

function drawCanvas (){
    context.beginPath();
    context.lineWidth = 6;
    context.strokeStyle = 'red';
    context.strokeRect(0, 0, 1000, 450);
}

var keysPressed = {};

window.addEventListener('keydown', function(event) {
    keysPressed[event.keyCode] = true;
});

window.addEventListener('keyup', function(event) {
    delete keysPressed[event.keyCode];
});


function Paddle (x, y){
    this.x = x;
    this.y = y;
    this.color = 'white';
    this.width = 15;
    this.height = 100;
    this.velocity_y = 10;
    this.edge = {
        top: this.y,
        bottom: this.y + this.height,
        right: this.x + this.width,
        left: this.x
    };
}

Paddle.prototype.move = function(dy){
    context.clearRect(this.x, this.y, this.width, this.height);
    this.y += dy;
    this.edge.top += dy;
    this.edge.bottom += dy;
    this.velocity_y += dy;
    
};

Paddle.prototype.update = function(){
    for(var key in keysPressed) {
        var val = Number(key);
        if (val === 40) {
            if(human.paddle.y <= 340){
                human.paddle.move(10);
            }
        } else if (val === 38) {
            if(human.paddle.y >= 10){
                human.paddle.move(-10);
            }
        }
    }
};

Paddle.prototype.render = function(){
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
};

function keyPress (keyDirection){
    if(keyDirection.keyCode === 40){
        if(human.paddle.y <= 340){
            human.paddle.move(10);
        }
    } else if(keyDirection.keyCode === 38){
        if(human.paddle.y >= 10){
            human.paddle.move(-10);
        }
    }
}

function Human (){
    this.paddle = new Paddle(5, 175);
}

function Computer (){
    this.paddle = new Paddle(979.5, 175);
}

var human = new Human();
var computer = new Computer();

function Ball (){
    this.x = 500;
    this.y = 225;
    this.color = 'white';
    this.radius = 15;
    this.velocity_x = -5;
    this.velocity_y = 0;
    this.edge = {
        right: this.x + this.radius,
        left: this.x - this.radius,
        top: this.y - this.radius,
        bottom: this.y + this.radius
    };
}

Ball.prototype.render = function(){
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
};

var gameBall = new Ball();

Ball.prototype.update = function(human, computer){
    var p1 = human.paddle;
    var p2 = computer.paddle;
    
    this.x += this.velocity_x;
    this.y += this.velocity_y;
    
    this.edge.left += this.velocity_x;
    this.edge.right += this.velocity_x;
    
    this.edge.top += this.velocity_y;
    this.edge.bottom += this.velocity_y;
    
    if(this.edge.left === p1.edge.right){
        if(this.edge.top < p1.edge.bottom && this.edge.bottom > p1.edge.top){
            this.velocity_x = -this.velocity_x;
        }
    } 
    
    if (this.edge.right === p2.edge.left){
        if(this.edge.top < p2.edge.bottom && this.edge.bottom > p2.edge.top){
            this.velocity_y = -this.velocity_y;
        }
    }
};

var update = function(){
    gameBall.update(human, computer);
    human.paddle.update();
};

var render = function(){
    drawCanvas();
    human.paddle.render();
    computer.paddle.render();
    gameBall.render();
};

var step = function(){
    update();
    render();
    animate(step);
};

var animate = window.requestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000/60);
};


window.onload = function(){
    step();
};