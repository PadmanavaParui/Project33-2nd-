const Engine = Matter.Engine;
const  World = Matter.World;
const Events = Matter.Events;
const  Bodies = Matter.Bodies;

var particle;
var particles = [particle];
var plinkos = [];
var divisions =  [];
var divisionHeight=300;

var score = 0;
var counter = 0;

// creating and initializing the gameState variable
var gameState = "PLAY";

// the setup function
function setup() {
  // creating the canvas
  createCanvas(800, 800);
  // creating hte engine
  engine = Engine.create();
  // creating the world
  world = engine.world;

  // creating the ground
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }


  for (var j = 75; j <=width; j=j+50) 
  {    
     plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) 
  {  
     plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50) 
  {  
     plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) 
  {  
    plinkos.push(new Plinko(j,375));
  }
}
 
// the draw function
function draw() {
  // setting the background colour
  background("black");

  //  the updating the engnie
  Engine.update(engine);

  // setting the text size
  fill("yellow");
  textSize(20)
  text("Score : "+score,20,30);

  // displaying the number of scores in the respective places
  fill("white");
  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);

  ground.display();

  if ( gameState =="END") {
    fill("red");
    textSize(100);
    text("Game Over", 200, 400);
   
  } 

  if(gameState === "PLAY"){

  for(var k = 0; k < plinkos.length; k++) {
   plinkos[k].display();
  }

  if(particle!=null)
  {
   particle.display();
    
   if (particle.body.position.y>700)
   {
      if (particle.body.position.x < 300) 
      {
        score=score+500;      
        particle=null;
        if ( counter>= 5) gameState ="END";                          
      }


      else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
      {
        score = score + 100;
        particle=null;
        if ( counter>= 5) gameState ="END";
      }
      else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
      {
        score = score + 200;
        particle=null;
        if ( counter>= 5)  gameState ="END";
      }           
    }
}

  }
for (var i = 0; i < divisions.length; i++) {
 
divisions[i].display();
}

}


function mousePressed() {
if(gameState !== "END") {
  counter++;
particle = new Particle(mouseX, 50, 10, 10);
}
}
