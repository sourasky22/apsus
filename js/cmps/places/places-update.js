
export default {
    props: ['existPlace'],
    template:`
    <section class="compose">
        <form class="flex flex-column justify-start" @submit.prevent="updatePlace">
            <input type="text" v-model="placeToUpdate.name" placeholder="{{existPlace.name}}"></input>
            <input type="text" v-model="placeToUpdate.address" placeholder="{{existPlace.address}}"></input>
            <textarea type="text" v-model="placeToUpdate.description" placeholder="{{existPlace.description}}"></textarea>
            <input type="text" v-model="placeToUpdate.tag" placeholder="{{existPlace.tag}}"></input>
            <button type="submit">Add place to list</button>
            <button>Cancel</button>
        </form>    
    </section>

    `,
    created() {
        this.placeToUpdate
         = {
            id: this.existPlace.id,
            name: this.existPlace.name,
            address: this.existPlace.address,
            description: this.existPlace.description,
            img: this.existPlace.img,
            pos: {
                lat: this.existPlace.lat,
                lng: this.existPlace.lng
            },
            tag: this.existPlace.tag,
            marker: null
        };
    },
    data() {
        return {
            placeToUpdate: null
        }
    },
    methods : {
        updatePlace() {
            this.$emit('updated', this.placeToUpdate)
            console.log('updated place emited from places-update to father', this.placeToUpdate
        )
        },
    }
}