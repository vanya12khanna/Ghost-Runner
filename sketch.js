var tower, towerImage;
var ghost, ghost_standing, ghost_jumping;
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

localStorage["Highest Score"] = 0;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghost_standing = loadImage("ghost-standing.png");
  ghost_jumping = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower.png", towerImage);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage( ghost_standing);
  ghost.scale = 0.3;
}

function draw(){
  
  if (gameState === PLAY) {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
      ghost.addImage(ghost_jumping);
    }
    
    if(ghost.y>600){
      gameState = END; 
    }
    
    
    ghost.velocityY = ghost.velocityY + 0.5;
    
    
    if(tower.y>400){
    tower.y=300
  }
  
  spawnDoors();
    
 for (var i=0;i<climbersGroup.length;i++){

      if(climbersGroup.get(i).isTouching(ghost)){
         if(climbersGroup.get(i).y>ghost.y){
            ghost.collide(climbersGroup.get(i))
         } else {
             gameState=END;
         }
      }
    }
  
  if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
  
  drawSprites();
}

  if (gameState === END){
        
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("Game Over!!",170,300)
  }
}  

function spawnDoors(){
  
  if(frameCount%200===0){
    
      var door = createSprite(150,0);
      door.addImage(doorImage);
      door.velocityY = 2;
    
      var climber = createSprite(150,50);
      climber.addImage(climberImage);
      climber.velocityY = 2;
    
      door.x = Math.round(random(150,400))
      climber.x = door.x;
    
      ghost.depth = door.depth;
      ghost.depth +=1;
  
      door.lifetime = 300;
      climber.lifetime = 300;

      doorsGroup.add(door);
      climbersGroup.add(climber);
  }      
}