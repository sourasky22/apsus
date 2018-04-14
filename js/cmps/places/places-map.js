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
                // mapService.addMarker({lat: 32.0749831, lng: 34.9120554});
            }
        );
    }
}