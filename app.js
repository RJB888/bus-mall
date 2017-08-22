'use strict';


//Constructor function for image object
function Product(name, photoId, photoSrc) {

  this.name = name;
  this.id = photoId;
  this.imgSource = photoSrc;
  this.hasBeenDisplayed = 0;
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

//randomize photos
var oldJail = ['','',''];
var jail = ['', '',''];

function imageSwap(){
  // console.log('im going');

  for (var i = 1; i < 4; i++){
    var newIndex = Math.floor(Math.random() * products.length);
    // console.log(newIndex);
    while (jail.includes(newIndex) || oldJail.includes(newIndex)) {
      newIndex = Math.floor(Math.random() * products.length);
    }
    // debugger;
    var image = document.getElementById('slot' + i);
    image.src = products[newIndex].imgSource;
    // jail[i] = newIndex;
    jail.push(newIndex);
    // products[newIndex].hasBeenDisplayed = true;
  }
  // console.log('done');
  oldJail = jail;
  console.log(oldJail);
  jail = [];
}

window.setInterval(imageSwap, 1000);
//event listener and handler for clicking on photos. (one for each photo?)

// swaps numbered image with given product number image
// function imageSwap(imgNum, prodNum) {
//   var image = document.getElementById('image' + imgNum);
//   image.src = products[prodNum].imgSource;
// }
