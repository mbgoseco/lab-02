'use strict';

function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.allAnimals = [];

Animal.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let animalClone = $('div[class = "clone"]');
  let animalHtml = $('#photo-template').html();
  animalClone.html(animalHtml);

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr('src', this.image_url);
  animalClone.find('figcaption').text(this.description);
  animalClone.find('p').text(this.horns);
  animalClone.removeClass('clone');
}

Animal.readJSON = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Animal.allAnimals.push(new Animal(obj))
      })
    })
  
    .then(Animal.loadAnimals)
} 

Animal.loadAnimals = () => {
  Animal.allAnimals.forEach(animal => animal.render());
}  

$(() => Animal.readJSON());