import { GoogleMapsApi } from './gmap.class.js';
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'
import LoremIpsum from './loremIpsum.js';
import utilService from './util.service.js';
import locService from './loc.service.js';

var map;

var marker;

var service;

var markers = [];

const KEY = 'mapAppKey';

var uniqueId = 1;

var places =  [
            {
                name: 'tel aviv',
                description: 'hhhhhhasdakdsjdlkadsjlkdsajkadjadljdalkajjssssdsdds',
                id: 1,
                img: 'https://www.lastminute.com/flights/lastminute/img/tel_aviv.jpg',
                pos: {
                    lat: 32.0852999,
                    lng: 34.78176759999999
                },
                tag: 'food',
                marker: 'find costuem marker'
            },
            {
                name: 'haifa',
                description: 'hhhhhhasdakdsjdlkadsjlkdsajkadjadljdalkajjssssdsdds',
                id: 2,
                img: 'https://www.planetware.com/photos-large/ISR/israel-haifa-bahai-shrine-and-gardens.jpg',
                pos: {
                     lat: 32.7940463,
                     lng: 34.989571
                },
                tag: 'food',
                marker: 'find costuem marker'
            },
            {
                name: 'ramat gan',
                description: 'hhhhhhasdakdsjdlkadsjlkdsajkadjadljdalkajjssssdsdds',
                id: 3,
                img: 'https://static.timesofisrael.com/www/uploads/2013/01/Web_F070530ML13.jpg',
                pos: {
                     lat: 32.068424,
                     lng: 34.824785
                },
                tag: 'food',
                marker: 'find costuem marker'
            }
]


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
                        position: google.maps.ControlPosition.TOP_RIGHT
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

            var list = document.querySelector('.list');
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(list);
            var search = document.querySelector('.search');
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(search);
            var details = document.querySelector('.details');
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(details);
        });
}

                function search(input) {
                   marker.setMap(null);
                   return locService.getCords(input)
                        .then(pos => {
                            console.log('pos for search', pos);
                            addMarker(pos);
                            setCenter(pos);
                            return pos
                        })
                        .catch(err => {
                            console.log('err!!!', err);
                        })
                }


                //old need to delete
                    // function search(input) {
                    //     marker.setMap(null);
                    //     return locService.getCords(input)
                    //         .then(pos => {
                    //             console.log('pos for search', pos);
                    //             addMarker(pos);
                    //             setCenter(pos);
                    //         })
                    //         .catch(err => {
                    //             console.log('err!!!', err);
                    //         })
                    // }


function addMarker(loc) {
    marker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP
    });
    markers.push(marker);
}

function setMarkers(){
    addMarker(places[0].pos);
    addMarker(places[1].pos);
    addMarker(places[2].pos);
    setCenter(places[2].pos); // for testing set center for last place in marker list
}

// function addMarker(loc) {
//     var infowindow = new google.maps.InfoWindow();
//     var service = new google.maps.places.PlacesService(map);
//     /////////////////get place id from google////////////////
//     var googlePlaceId;
//     locService.getPlaceId(loc)
//     .then(pos => {
//         console.log('place id call from add marker', pos);
//         googlePlaceId = pos;
//         console.log('googlePlaceId got placeid',  googlePlaceId);
//         service.getDetails({
//         placeId:  googlePlaceId  // get place id 
//       }, function(place, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             ////regular add marker lines
//             console.log('place', place);
//             var marker = new google.maps.Marker({
//                 position: loc, 
//                 map: map
//             });
//             markers.push(marker);
//            ////////////////////////////
//        google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent(`<div class="info-window"><strong>Address: ${place.formatted_address}</strong><br>'
//           ${marker.position} </div>`);
//         infowindow.open(map, this);
//                });
//              }
//           });
//     })
//     .catch(err => {
//         console.log('err!!!', err);
//     })
//     ///////////////////////////////////////////////////////
// } 

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
                emails =  places // just for checking 
                // emails = generatePlaces();
                storageService.store(KEY, emails);
            }
            if (filter === null) return emails;
        })
}

// function getGooglePlaceId () {

// }


// function generatePlaces() {

//     var places = []
//     for (let index = 0; index < 6; index++) {
//         var place = createPlace()
//         places.push(place)

//     }
//     return places;
// }

// function createPlace() {
//     var loremIpsum = new LoremIpsum();

//     var place = {
//         id: uniqueId++,
//         name: loremIpsum.generate(utilService.getRandomInt(5, 11), utilService.getRandomInt(1, 4))
//     }
//     return place;
// }

function deletePlace(placeId) {
    return storageService.load(KEY)
        .then(places => {
            var placeIdx = places.findIndex(place => place.id === placeId);
            markers[placeIdx].setMap(null);
            places.splice(placeIdx, 1);
            storageService.store(KEY, places);
            return storageService.load(KEY)
        })
}

function addPlace(place) {
    return storageService.load(KEY)
        .then(places => {
            places.unshift(place);
            addMarker(place.pos);
            // markers[placeIdx].setMap(null); //figure out adding marker of new place 
            storageService.store(KEY, places);
            return storageService.load(KEY)
        })
}

export default {
    initMap,
    addMarker,
    setCenter,
    copyUrl,
    query,
    deletePlace,
    search,
    setMarkers,
    addPlace
}




//google api key: AIzaSyBSwBN9DWvwKbCTD8_iLPOZJwRwZGj3-aE
