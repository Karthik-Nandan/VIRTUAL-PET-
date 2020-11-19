//Create variables here
var  dog;
var dogImage,dogImage2;
var happyDog;
var database;
var foodS;
var foodStock;
var milk; 
var milk1;
var milkImage;
var milkImage1,lastFed;

function preload(){
//load images here
dogImage=loadImage("images/dogImg.png");
dogImage2=loadImage("images/dogImg1.png");
milkImage=loadImage("images/milk.png");
milkImage1=loadImage("images/milk1.png");
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(249,250);
  dog.addImage(dogImage);
  dog.scale = 0.15;


  feed = createButton ("Feed the dog");
  feed.position (700,95);
  feed.mouisePressed (feedDog);

  addFood=createButton ("Add Food");
  addFood.position (800,95);
  addFood.mousePressed (addFoods);

  database = firebase.database();
  console.log(database);

  foodStock = database.ref('food');
  foodStock.on("value", readStock, showError);
  foodStock.set(20);

  milk = createSprite(140,435,10,10);
  milk.addImage(milkImage);
  milk.scale = 0.1;

  milk1 = createSprite(211,280,10,10);
  milk1.addImage(milkImage1);
  milk1.scale = 0.025;
  milk1.visible = false;

}


function draw() { 
  background("orange");
  
  

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage2);
    milk1.visible = true;
   }
   if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage);
    milk1.visible = false;
   }
  }
 


  fill (255,255,254);
  textSize(15);
  if(lastFed>=12){
    text ("Last Feed: "+lastFed%12 + "PM",350,30);
  }else if (lastFed==0){
    text ("Last Feed : 12 AM", 350 , 30);
  }else {
    text ("Last Feed : "+lastFed+"AM",350,30);
  }








  if(foodS == 0){
    dog.addImage(dogImage);
    foodS = 20;
  }

 
  //add styles here
  drawSprites();
  textSize(17);
  fill("black");
  text("Long Press up arrow key to feed your pet dog jery",50,50);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);
}





function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

function feedDog (){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function showError(){
  console.log("Error in writing to the database");
}
