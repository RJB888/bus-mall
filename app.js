'use strict';

var products = [];
var totalClicks = 0;
var clickedId;
var priorPics = [];
var currentPics = [];

//Constructor function for image object

function Product(name, photoId, photoSrc) {

  this.name = name;
  this.id = photoId;
  this.imgSource = photoSrc;
  this.timesShown = 0;
  this.timesClicked = 0;
}

var prodNames = ['bag', 'banana', 'bathroom','boots','breakfast', 'bubblegum','chair','cthulu','dogDuck','dragon','pen','petSweep','scissors','shark','tauntaun','unicorn','usb','waterCan','wineGlass',];

var photoId = ['bagpic','bananapic','bathroompic', 'bootspic','breakfastpic','bubblegumpic','chairpic', 'cthulupic','dogDuckpic', 'dragonpic','penpic','petSweeppic','scissorspic','sharkpic','tauntaunpic','unicornpic','usbpic', 'waterCanpic','wineGlasspic',];

var imageSource = ['img/bag.jpg','img/banana.jpg','img/bathroom.jpg','img/boots.jpg', 'img/breakfast.jpg','img/bubblegum.jpg','img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

for (var i = 0; i < prodNames.length; i++){
  var newItem = new Product(prodNames[i], photoId[i], imageSource[i]);
  products.push(newItem);
}

function imageSwap(){
  for (var i = 0; i < 3; i++){
    var newIndex = Math.floor(Math.random() * products.length);
    while (currentPics.includes(newIndex) || priorPics.includes(newIndex)) {
      newIndex = Math.floor(Math.random() * products.length);
    }
    currentPics.push(newIndex);
    var image = document.getElementById('slot' + i);
    image.src = products[newIndex].imgSource;
    image.id = products[newIndex].id;
    products[newIndex].timesShown ++;
  }
  console.log(currentPics);
  priorPics = currentPics;
  console.log(priorPics);
  currentPics = [];
  console.log('Clicked Index' + products[priorPics[clickedId]].timesClicked);
  products[priorPics[clickedId]].timesClicked ++;

}

var image1 = document.getElementById('slot0');
var image2 = document.getElementById('slot1');
var image3 = document.getElementById('slot2');

image1.addEventListener('click',getClickedId);
image2.addEventListener('click',getClickedId);
image3.addEventListener('click', getClickedId);

function getClickedId(potato) {
  var locatedElement = potato.srcElement.id;
  clickedId = parseInt(locatedElement.charAt(locatedElement.length - 1));
  console.log('Yep, it was clicked');
  console.log(clickedId);
  totalClicks ++;
  if (totalClicks < 25){
    for (var x = 0; x < products.length; x ++){
      if (true);
    }
    imageSwap();
  }
  else {
    image1.removeEventListener('click', getClickedId);
    image2.removeEventListener('click', getClickedId);
    image3.removeEventListener('click', getClickedId);
    console.log('Done clicking');
    report();
  }
}
imageSwap();
// function report() {
//   for (var x = 0; x < products.length; x ++){
//     document.write(products[x].name + '<br>');
//     document.write('Shown: ' + products[x].timesShown + '<br>');
//     document.write('Clicked: ' + products[x].timesClicked + '<br>');
//     document.write('<br>');
//     document.write('<br>');
//   }
// }
