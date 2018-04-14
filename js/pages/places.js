
import placesMap from "../cmps/places/places-map.js";
import placesList from "../cmps/places/places-list.js";
import placesSearch from "../cmps/places/places-search.js";
import placesDetails from "../cmps/places/places-details.js";
import placesAdd from "../cmps/places/places-add.js"

import locService from "../services/loc.service.js";
import mapService from "../services/map.service.js";
import placesSave from "../cmps/places/places-save.js";




export default {
    template: `
     <section class="">
        <div class="map">
            <places-map></places-map>
        </div>
        <div class="search">
            <places-search></places-search>
        </div>
        <div class="list">
            <places-list v-if="places" :places="places" @selected="placeToShow" @delete="deletePlace"></places-list>
        </div>
        <div class="details" v-if="selectedPlace">
            <places-details :places="places" :selectedPlace="selectedPlace"></places-details>
        </div>
        <div>
            <places-add v-if="newPlace" @added="addPlace"></places-add>
        </div>
    </section>
    `,
    data() {
        return {
            places: null,
            selectedPlace: null,
            newPlace: null
        }
    },
    created(){
        mapService.query()
        .then(places => {
            console.log('get places', places);
            this.places = places;
        })
    },
    methods: {
        placeToShow(placeClicked) {
           this.selectedPlace = this.places.find(place => place.id === placeClicked);
           mapService.setCenter(this.selectedPlace.pos);
           console.log('clicked place',this.selectedPlace);
        },
        deletePlace(placeId){
            //part of trying to render next mail after deletion
            this.selectedPlaceIdx = this.places.findIndex(place => place.id === placeId);
            //
            console.log('select place',placeId);
            mapService.deletePlace(placeId)
            .then(places =>{
                this.places = places;
                this.selectedPlace = this.places[this.selectedPlaceIdx];
            })
        },
        addPlace(place){
            this.newPlace = place;
            mapService.addPlace(place)
            .then(places =>{
                this.places = places;
                
            })
            this.newPlace = null;
            console.log('new place data sent to service')
        }
        },
    components: {
        placesMap,
        placesList,
        placesSearch,
        placesDetails
    }
}

