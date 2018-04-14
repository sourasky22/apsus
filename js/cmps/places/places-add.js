
export default {
    props: ['newPlace'],
    template:`
    <section class="compose">
        <form class="flex flex-column justify-start" @submit.prevent="addPlace">
            <input type="text" v-model="placeToAdd.name" placeholder="Name"></input>
            <input type="text" v-model="placeToAdd.address" placeholder="Address"></input>
            <textarea type="text" v-model="placeToAdd.description" placeholder="Description"></textarea>
            <input type="text" v-model="placeToAdd.tag" placeholder="Tag"></input>
            <button type="submit">Add place to list</button>
            <button>Cancel</button>
        </form>    
    </section>

    `,
    created() {
        this.placeToAdd = {
            id: Date.now(),
            name: '',
            address: '',
            description: '',
            img: null,
            pos: {
                lat: this.newPlace.lat,
                lng: this.newPlace.lng
            },
            tags: '',
            marker: null
        };
    },
    data() {
        return {
            placeToAdd : null
        }
    },
    methods : {
        addPlace() {
            this.$emit('added', this.placeToAdd)
            console.log('new place emited from places-save to father', this.placeToAdd)
        },
    }
}