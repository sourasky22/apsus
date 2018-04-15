
import placesPreview from "./places-preview.js"

import mapService from "../../services/map.service.js";


export default {
    props: ['places'] ,
    template:`
    <section class="">
     <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    My places
             </h1>
                </div>
            </div>
         </section>
        <ul>
          <li class="places" v-for="place in places">
            <!-- <button @click="updatePlace(place)">Edit</button> -->
            <places-preview :place="place" @click.native="emitSelected(place.id)"></places-preview>
            <a class="button deleteBtn"  @click="deletePlace(place.id)">Delete</a>
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
