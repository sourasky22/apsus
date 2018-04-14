import mapService from "../../services/map.service.js";

export default {
    template:`
    <section id="map" style="height: 100%; width: 100%;">
    
    </section>
    `,
    mounted(){
        mapService.initMap()
        .then(
            ()=>{
                mapService.setMarkers();
            }
        );
    },
    methods : {
       
    }
}





