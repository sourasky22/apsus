
import placesPreview from "./places-preview.js"

import mapService from "../../services/map.service.js";


export default {
    props: ['places'] ,
    template:`
    <section class="">
        <h1>Places list</h1>
        <ul>
          <li class="places" v-for="place in places">
            <button @click="deletePlace(place.id)">Delete</button>
            <!-- <button @click="updatePlace(place)">Edit</button> -->
            <places-preview :place="place" @click.native="emitSelected(place.id)"></places-preview>
          </li>
         </ul>
    </section>
    `,
    data() {
        return {
        }
    },
    methods : {
        emitSelected(id) {
            this.$emit('selected', id);
        },
        deletePlace(id) {
            this.$emit('delete',id);
        },
        updatePlace(place) {
            this.$emit('update', place);
        }
    },
    components: {
       placesPreview
    }
}