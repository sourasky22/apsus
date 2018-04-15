import mapService from "../../services/map.service.js";
import locService from "../../services/loc.service.js";

export default {
    data(){
        return{
            term: '',
            saveToList: '',
        }
    },
    template: `
    <section id="search">
    <form class="search-bar" @submit.prevent="search">
    <input id="autocomplete" v-model="term" class="search-loc" type="text" placeholder="Enter location">
    </form>
    <a @click="addToList(saveToList)" class="button add-place">
    <span class="icon is-small">
    <i class="fas fa-map-marker"></i>
    </span>
    <span>Add place to list</span>
   </a>
    </section>
    `,
    methods: {
        search() {
            mapService.search(this.term)
             .then(
                (pos)=>{
                    this.term = "";
                    console.log('check search', pos);
                    this.saveToList = pos;
                }
            );
        },
        addToList(pos) {
         this.$emit('posToAdd', pos);
         console.log('add to list', pos)
        }
    }
}




