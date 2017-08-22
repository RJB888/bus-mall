'use strict';


//Constructor function for image object
function Product(name, photoId, photoSrc) {

  this.name = name;
  this.id = photoId;
  this.imgSource = photoSrc;
  this.timesShown = 0;
  this.timesClicked = 0;
}

var bag = new Product('bag', 'bagpic', 'img/bag.jpg');
var banana = new Product('banana', 'bananapic', 'img/banana.jpg');
var bathroom = new Product('bathroom', 'bathroompic', 'img/bathroom.jpg');
var boots = new Product('boots', 'bootspic', 'img/boots.jpg');
var breakfast = new Product('bubblegum', 'bubblegumpic', 'img/bubblegum.jpg');
var chair = new Product('chair', 'chairpic', 'img/chair.jpg');
var cthulu = new Product('cthulu', 'cthulupic', 'img/cthulhu.jpg');
var dogDuck = new Product('dogDuck', 'dogDuckpic', 'img/dog-duck.jpg');
var dragon = new Product('dragon', 'dragonpic', 'img/dragon.jpg');
var pen = new Product('pen', 'penpic', 'img/pen.jpg');
var petSweep = new Product('petSweep', 'petSweeppic', 'img/pet-sweep.jpg');
var scissors = new Product('scissors', 'scissorspic', 'img/scissors.jpg');
var shark = new Product('shark', 'sharkpic', 'img/shark.jpg');
var tauntaun = new Product('tauntaun', 'tauntaunpic', 'img/tauntaun.jpg');
var unicorn = new Product('unicorn', 'unicornpic', 'img/unicorn.jpg');
var usb = new Product('usb', 'usbpic', 'img/usb.gif');
var waterCan = new Product('waterCan', 'waterCanpic', 'img/water-can.jpg');
var wineGlass = new Product('wineGlass', 'wineGlasspic', 'img/wine-glass.jpg');

var products = [bag, banana, bathroom, boots, breakfast, chair, cthulu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, usb, waterCan, wineGlass];
var totalClicks = 0;
var clickedId;
var oldJail = [];
var jail = [];

function imageSwap(){
  for (var i = 1; i < 4; i++){
    var newIndex = Math.floor(Math.random() * products.length);
    while (jail.includes(newIndex) || oldJail.includes(newIndex)) {
      newIndex = Math.floor(Math.random() * products.length);
    }
    var image = document.getElementById('slot' + i);
    image.src = products[newIndex].imgSource;
    jail.push(newIndex);
    products[newIndex].timesShown ++;
  }
  products[jail[clickedId - 1]].timesClicked ++;

  oldJail = jail;
  console.log(oldJail);
  jail = [];
}

var image1 = document.getElementById('slot1');
var image2 = document.getElementById('slot2');
var image3 = document.getElementById('slot3');

image1.addEventListener('click',getClickedId);
image2.addEventListener('click',getClickedId);
image3.addEventListener('click', getClickedId);

function getClickedId(potato) {
  var locatedElement = potato.srcElement.id;
  clickedId = parseInt(locatedElement.charAt(locatedElement.length - 1));
  console.log('Yep, it was clicked');
  console.log(clickedId);
  totalClicks ++;
  if (totalClicks <= 25){
    imageSwap();
  }
  else {
    image1.removeEventListener('click',getClickedId);
    image2.removeEventListener('click',getClickedId);
    image3.removeEventListener('click', getClickedId);
    console.log('Done clicking');
    report();
  }
}

function report() {
  for (var x = 0; x < products.length; x ++){
    document.write(products[x].name + '<br>');
    document.write('Shown: ' + products[x].timesShown + '<br>');
    document.write('Clicked: ' + products[x].timesClicked + '<br>');
    document.write('<br>');
    document.write('<br>');
  }
}
