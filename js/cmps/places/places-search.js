import mapService from "../../services/map.service.js";
import locService from "../../services/loc.service.js";

export default {
    data(){
        return{
            term: '',
        }
    },
    template: `
    <section id="search">
    <form class="search-bar" @submit.prevent="search">
    <input id="autocomplete" v-model="term" class="search-loc" type="text" placeholder="Enter location">
    </form>
    </section>
    `,
    methods: {
        search() {
            locService.getCords(this.term)
                .then(pos => {
                    console.log(pos);
                    mapService.addMarker(pos);
                    mapService.setCenter(pos);
                    this.term = "";
                })
                .catch(err => {
                    console.log('err!!!', err);
                })
        },
        mounted() {

        },
    }
}


