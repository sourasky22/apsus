import mapService from "../../services/map.service.js";

export default {
    props: ['selectedPlace'],
    template: `
         <section class="">
         <h3>{{selectedPlace.name}}</h3>
          <h3>{{selectedPlace.address}}</h3>
          <h3>{{selectedPlace.description}}</h3>
        </section>
    `,
    data() {
        return {
            
        }
    },
   
}