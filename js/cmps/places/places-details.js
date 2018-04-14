import mapService from "../../services/map.service.js";

export default {
    props: ['selectedPlace'],
    template: `
         <section class="">
         <h3>Place details test</h3>
          <h3>{{selectedPlace.name}}</h3>
          <h3>{{selectedPlace.id}}</h3>
        </section>
    `,
    data() {
        return {
            
        }
    },
   
}