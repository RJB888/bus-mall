'use strict';

var products = [];
var productAvgTimesClicked = [];
var productsSelected = [];
var productsShown = [];
var productsNotShown = [];
var totalClicks = 0;
var clickedId;
var priorPics = [];
var currentPics = [];
var numSelectionsAllowed = 5;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
    image.name = products[newIndex].name;
    image.setAttribute('index', newIndex);
    products[newIndex].timesShown ++;
  }
  priorPics = currentPics;
  currentPics = [];

}
imageSwap();

var image1 = document.getElementById('slot0');
var image2 = document.getElementById('slot1');
var image3 = document.getElementById('slot2');

image1.addEventListener('click',voteForPic);
image2.addEventListener('click',voteForPic);
image3.addEventListener('click', voteForPic);

function voteForPic(event) {
  totalClicks ++;
  console.log('Yep, it was clicked');
  console.log('Total clicks: ' + totalClicks);
  if (totalClicks < numSelectionsAllowed){
    products[event.target.attributes.index.value].timesClicked++;
    imageSwap();
  }
  else {
    products[event.target.attributes.index.value].timesClicked++;
    image1.removeEventListener('click', voteForPic);
    image2.removeEventListener('click', voteForPic);
    image3.removeEventListener('click', voteForPic);
    console.log('Done clicking');
    getChartData();
    doTheChart();
  }
}

function getChartData() {
  productAvgTimesClicked = [];
  productsSelected = [];
  productsShown = [];
  productsNotShown = [];
  for (var i = 0; i < products.length; i++){
    if (products[i].timesShown > 0){
      productsShown.push(products[i]);
      productAvgTimesClicked.push(products[i].timesClicked / products[i].timesShown);
      productsSelected.push(products[i]);
    }
    else {
      productsNotShown.push(products[i]);
    }
  }
}

function doTheChart(){

  var chartData =  {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Times Selected',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(12, 232, 224, 0.2)',
          'rgba(255, 50, 0, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(12, 232, 224, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(12, 232, 224, 1)',
          'rgba(255, 50, 0, 0.2)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(12, 232, 224, 1)',
        ],
        borderWidth: 1
      },
      {
        label: 'Times Shown',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(12, 232, 224, 0.2)',
          'rgba(255, 50, 0, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(12, 232, 224, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(12, 232, 224, 1)',
          'rgba(255, 50, 0, 0.2)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(12, 232, 224, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  };
  for (var i = 0; i < productsSelected.length; i++){
    chartData.data.labels[i] = productsSelected[i].name;
    // debugger;
    chartData.data.datasets[0].data[i] = productsSelected[i].timesClicked;
    chartData.data.datasets[1].data[i] = productsSelected[i].timesShown;
  }
  var myChart = new Chart(ctx, chartData);
}
