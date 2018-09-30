var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

c.fillStyle = "white";
c.lineWidth = 5;

var mouse ={
	x:undefined,
	y:undefined
}

var maxRadius = 40;
var minRadius = 3;

var colorArray = [
	'#fff',
	'orange',
	'#F3FA03  ',
	'blue',
	'red',
	'#29984a',
	'#ACF10D',
	'#CDD5B9',
];


window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();

});
function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy= dy;
	this.radius = radius;
	this.minRadius =2;
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)]



	this.draw = function(){
		// console.log("DSfsd")
		c.beginPath();
		// c.clearRect(0, 0,innerWidth,innerHeight);
		c.arc (this.x,this.y,this.radius,0, Math.PI*2,false);
		// c.strokeStyle = "blue";
		c.stroke();
		c.fillStyle = this.color;
		// c.strokeStyle = "blue";
		c.fill();
	} 
	this.update = function(){
		if(this.x+this.radius > innerWidth || this.x-this.radius<0 ){

				this.dx =- this.dx;
		}
		if(this.y+this.radius > innerHeight || this.y-this.radius<0 ){

				this.dy =-this. dy;
		}
		this.x+=this.dx;
		this.y+=this.dy;
		if(mouse.x-this.x<=200 && mouse.x-this.x>=-200 && mouse.y-this.y<=200 && mouse.y-this.y>=-200){
			if(this.radius<maxRadius){
				this.radius+=2;
			}
			
		}
		else if(this.radius>this.minRadius){
			this.radius-=1
		}
		this.draw();
	}

}



	var circleArray = [];

// console.log(circleArray)
function init(){
	for (var i = 0; i < 150; i++) {
		var radius = Math.random()*30+2;
		var x=Math.random()*(innerWidth-radius*2)+radius;
		var dx=(Math.random()-0.5)*8;
		var y=Math.random()*innerHeight;
		var dy=(Math.random()-0.5)*8;
		circleArray.push(new Circle(x, y, dx, dy, radius))
		// var circle  = new Circle(200,200,3,3,30);

	}
}

function animate(){
	requestAnimationFrame(animate);

	c.clearRect(0, 0,innerWidth,innerHeight);
	// circle.update();
	for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
	}
	// y+=2;
	// console.log("sad");
}
init()
animate();
