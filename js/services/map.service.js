import { GoogleMapsApi } from './gmap.class.js';
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'
import LoremIpsum from './loremIpsum.js';
import utilService from './util.service.js';

var map;

var marker;

var service;

var markers;

const KEY = 'mapAppKey';

var uniqueId = 1;


function initMap(lat = 32.0749831, lng = 34.9120554) {

    console.log('InitMap');

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load()
        .then(() => {
            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.LEFT_BOTTOM
                    }
                })
              //////////auto complete for search input/////////
              var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-33.8902, 151.1759),
                new google.maps.LatLng(-33.8474, 151.2631));
            var options = {
                bounds: defaultBounds,
            };
            var input = document.getElementById('autocomplete');
            var autocomplete = new google.maps.places.Autocomplete(input, options);
        });
}


function addMarker(loc) {
    marker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP
    });
    marker.addListener('click', toggleBounce);
    console.log('adding marker');
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }


function setCenter(loc) {
    map.setCenter(loc);
    console.log('marker set center');
}

function copyUrl(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}

function query(filter = null) {
    return storageService.load(KEY)
        .then(emails => {
            console.log('emails: ', emails);
            if (!emails) {
                emails = generatePlaces();
                storageService.store(KEY, emails);
            }
            if (filter === null) return emails;
     })
}

function generatePlaces() {

    var places = []
    for (let index = 0; index < 6; index++) {
        var place = createPlace()
        places.push(place)

    }
    return places;
}

function createPlace() {
    var loremIpsum = new LoremIpsum();

    var place = {
        id: uniqueId++,
        name: loremIpsum.generate(utilService.getRandomInt(5, 11), utilService.getRandomInt(1, 4))
    }
    return place;
}


export default {
    initMap,
    addMarker,
    setCenter,
    copyUrl,
    query
}




//google api key: AIzaSyBSwBN9DWvwKbCTD8_iLPOZJwRwZGj3-aE
