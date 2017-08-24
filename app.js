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
var shownProductsNames = [];
var totalTimesShown = [];
var totalTimesClicked = [];
var storageProducts = [];
var numSelectionsAllowed = 5;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvas2 = document.getElementById('pieGraph');
var ctx2 = canvas2.getContext('2d');

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

if(localStorage.getItem('storedProducts')){
  products = JSON.parse(localStorage.getItem('storedProducts'));
} else{
  for (var i = 0; i < prodNames.length; i++){
    var newItem = new Product(prodNames[i], photoId[i], imageSource[i]);
    products.push(newItem);
  }
};

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
  if (totalClicks < numSelectionsAllowed){
    products[event.target.attributes.index.value].timesClicked++;
    imageSwap();
  }
  else {
    products[event.target.attributes.index.value].timesClicked++;
    image1.removeEventListener('click', voteForPic);
    image2.removeEventListener('click', voteForPic);
    image3.removeEventListener('click', voteForPic);
    getChartData();
    doTheChart();
  }
}

function getChartData() {
  productAvgTimesClicked = [];
  productsSelected = [];
  productsShown = [];
  //shownProductsNames = [];
  for (var i = 0; i < products.length; i++){
    totalTimesShown[i] = products[i].timesShown;
    totalTimesClicked[i] = products[i].timesClicked;
    productAvgTimesClicked.push(parseInt((products[i].timesClicked / products[i].timesShown) * 100));
    if (products[i].timesShown > 0){
      //shownProductsNames.push(products[i].name); // had to move this up here and use products instead of productsSelected otherwise it crashed with type "undefined" error
      productsShown.push(products[i]);
      productsSelected.push(products[i]);
    }
  }
  localStorage.setItem('storedProducts', JSON.stringify(products));
}

function doTheChart(){

  // var chartData =  {
  //   type: 'horizontalBar',
  //   data: {
  //     labels: prodNames,
  //     datasets: [{
  //       label: 'Times Selected',
  //       data: totalTimesClicked,
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(12, 232, 224, 0.2)',
  //         'rgba(255, 50, 0, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(12, 232, 224, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //         'rgba(12, 232, 224, 1)',
  //         'rgba(255, 50, 0, 0.2)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //         'rgba(12, 232, 224, 1)',
  //       ],
  //       borderWidth: 1
  //     },
  //     {
  //       label: 'Times Shown',
  //       data: totalTimesShown,
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(12, 232, 224, 0.2)',
  //         'rgba(255, 50, 0, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(12, 232, 224, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //         'rgba(12, 232, 224, 1)',
  //         'rgba(255, 50, 0, 0.2)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //         'rgba(12, 232, 224, 1)',
  //       ],
  //       borderWidth: 1
  //     },
  //     {
  //       label: 'Percent of Times Selected When Shown',
  //       data: productAvgTimesClicked,
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(12, 232, 224, 0.2)',
  //         'rgba(255, 50, 0, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(12, 232, 224, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //         'rgba(12, 232, 224, 1)',
  //         'rgba(255, 50, 0, 0.2)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //         'rgba(12, 232, 224, 1)',
  //       ],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero:true
  //         }
  //       }]
  //     }
  //   }
  // };
  // var myChart = new Chart(ctx, chartData);
  //
  // var chart2Data = {
  var myPieChart = new Chart(ctx2,{
    type: 'pie',
    data: {
      datasets: [{
        data: [10, 20, 30]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
    },
    options: options
  });

  // var myPieChart = new Chart(ctx, chart2Data);
}
