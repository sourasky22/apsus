
export default {
    props: ['placeClicked'],
    template:`
    <section class="compose">
        <form class="flex flex-column justify-start" @submit.prevent="addPlace">
            <input type="text" v-model="newPlace.name" placeholder="{{placeClicked.name}}"></input>
            <input type="text" v-model="newPlace.address" placeholder="{{placeCLicked.address}}"></input>
            <textarea type="text" v-model="newPlace.description" placeholder="Description"></textarea>
            <input type="text" v-model="newPlace.tag" placeholder="Tag"></input>
            <button type="submit">Add place to list</button>
            <button>Cancel</button>
        </form>    
    </section>

    `,
    data() {
        return {
            newPlace : this.getEmptyPlace(),
        }
    },
    methods : {
        getEmptyPlace() {
            return {
                id: Date.now(),
                name: this.placeClicked.name,
                address: '',
                description: '',
                pics: [],
                lat: this.placeClicked.lat,
                lng: this.placeClicked.lng,
                tags: '',
                marker: ''
            };
        },
        addPlace() {
            this.$emit('added', this.newPlace)
            console.log('new place emited from places-save to father', this.newPlace)
        },
    }
}