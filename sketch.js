var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodsGroup, obstaclesGroup;
var score = 0;

function preload()
{
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
  createCanvas(700, 500);

  monkey = createSprite(50,450,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(350,450,700,10);
  ground.shapeColor = "green";
  
  foodsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() 
{
  background("skyblue");
  
  if(foodsGroup.isTouching(monkey))
    {
      foodsGroup.destroyEach();
    }
  
  if(keyDown("space"))
    {
      monkey.velocityY = -10;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  score = score + Math.round(getFrameRate()/60);
  
  spawnObstacle();
  
  spawnBanana();
  
  drawSprites();
  
  fill("black");
  textSize(30);
  text("SURVIVAL TIME = " + score, 200, 50);
  
  monkey.collide(ground);
}

function spawnBanana()
{
  if(frameCount % 100 === 0)
    {
      banana = createSprite(700, Math.round(random(150, 350)), 20,20);
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -(8 + score/50);
      banana.lifetime = 140;
      
      foodsGroup.add(banana);
    }
}

function spawnObstacle()
{
  if(frameCount % 175 == 0)
    {
      obstacle = createSprite(700, 410, 20, 20);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.2;
      obstacle.velocityX = -(8 + score/100);
      obstacle.lifetime = 140;
      
      obstaclesGroup.add(obstacle);
    }
}