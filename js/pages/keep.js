
import keepServices from '../services/keep.services';
import noteTxt from '../cmps/keep/note-txt';
import noteImg from '../cmps/keep/note-img';

export default {
     template:`
    <section class="grid-keep">
     <accordion-group>
         <accordion title="About our Sevices" >
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quo suscipit aperiam quaerat vel ducimus tempora porro quasi in veniam, dignissimos animi alias quae doloremque illo incidunt eum fugit odio!</p>
         </accordion>
         <accordion title="About our Sevices">
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quo suscipit aperiam quaerat vel ducimus tempora porro quasi in veniam, dignissimos animi alias quae doloremque illo incidunt eum fugit odio!</p>
         </accordion>
     </accordion-group>
         
         
         <h1>About {{greet}}</h1>
         Happy? {{isHappy}}
         <br/><br/><br/> 
         <toggle-btn v-model="isHappy"></toggle-btn>
         <button @click="goHome">Go Home</button>
         <h1>Notes:</h1>
         <ul>
             <li v-for="note in notes">
                 <component :is="note.type" :conf="note.config"></component>
             </li>
         </ul>
     </section>
     `,
     data() {
         return {
             isHappy: true, 
             greet: this.$route.params.greet,
             notes: []
         }
     },
     created() {
         noteService.query().then(notes => {
             this.notes = notes
         })
     },
     methods: {
     },
     components: {
         noteImage,
         noteTxt
     }
}