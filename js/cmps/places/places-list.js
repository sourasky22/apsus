
import placesPreview from "./places-preview.js"

export default {
    props: ['places'] ,
    template:`
    <section class="">
        <h1>Places list</h1>
        <ul>
          <li class="places" v-for="place in places">
            <button @click="deleteEmail">Delete</button>
            <places-preview :place="place" @click.native="emitSelected(place.id)"></places-preview>
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
        deleteEmail() {
            this.$emit('delete', this.selectedEmail.id);
      }
    },
    components: {
       placesPreview
    }
}