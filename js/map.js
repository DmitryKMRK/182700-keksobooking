'use strict';

var offerTitles = ['', 'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo'];
var offerTimes = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var fragment = document.createDocumentFragment();
var dialog = document.querySelector('.dialog');
var dialogTitle = document.querySelector('.dialog__title');
var dialogPanel = document.querySelector('.dialog__panel');

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var placements = [];
for (var i = 1; i <= 8; i++) {
  var placementTemplate = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    location: {
      x: getRandomNum(300, 900),
      y: getRandomNum(100, 500)
    },
    offer: {
      title: offerTitles[i],
      address: '' + location.x + ', ' + location.y,
      price: getRandomNum(1000, 1000000),
      type: getRandomElement(offerTypes),
      rooms: getRandomNum(1, 5),
      guests: getRandomNum(1, 10),
      checkin: getRandomElement(offerTimes),
      checkout: getRandomElement(offerTimes),
      features: offerFeatures.slice(0, getRandomNum(0, 6)),
      description: '',
      photos: []
    }
  };
  placements.push(placementTemplate);
}

var renderPin = function (placement) {
  var pinElement = document.createElement('div');
  var img = '<img src="' + placement.author.avatar + '" class="rounded" width="40" height="40">';
  pinElement.classList.add('pin');
  pinElement.style = 'left: ' + (placement.location.x - 28) + 'px; top: ' + (placement.location.y + 75) + 'px';
  pinElement.insertAdjacentHTML('afterbegin', img);
  return pinElement;
};

for (i = 0; i < placements.length; i++) {
  fragment.appendChild(renderPin(placements[i]));
}

pinMap.appendChild(fragment);

var renderPlacement = function (placement) {
  var lodgeElement = lodgeTemplate.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = placement.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = placement.offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = placement.offer.price + '&#x20bd;/ночь';
  if (placement.offer.type === 'flat') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Квартира';
  } else if (placement.offer.type === 'bungalo') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Бунгало';
  } else if (placement.offer.type === 'house') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Дом';
  }
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + placement.offer.guests + ' гостей в ' + placement.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + placement.offer.checkin + ', выезд до ' + placement.offer.checkout;
  for (i = 0; i < placement.offer.features.length; i++) {
    var span = '<span class="feature__image feature__image--' + placement.offer.features[i] + '"></span>';
    lodgeElement.querySelector('.lodge__features').insertAdjacentHTML('afterbegin', span);
  }
  lodgeElement.querySelector('.lodge__description').textContent = placement.offer.description;
  return lodgeElement;
};

fragment.appendChild(renderPlacement(placements[0]));
dialog.replaceChild(fragment, dialogPanel);
dialogTitle.querySelector('img').src = placements[0].author.avatar;
