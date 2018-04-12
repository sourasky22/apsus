import emailPreview from "./email-preview.js";
import emailService from "../../services/email.service.js";



export default {
    props: ['emails', 'emailIdx'] ,
    template:`
    <section>
        <h1>Email list</h1>
        <h1 v-if="msg">{{msg}}</h1>
        <button @click="sortBySubject">Subject</button>
        <button @click="sortByDate">Date</button>
        <ul>
          <li class="email-preview" v-for="email in emails">
               <email-preview :email="email" @toggleRead="$emit('toggleRead',$event) " @click.native="emitSelected(email.id)"></email-preview>
          </li>
         </ul>

    </section>
    `,
    data() {
        return {
        }
    },
    computed: {
        msg() {
            return this.emails.length? '' : 'You suck and nobody likes you! Take your lumber and go home...';
        }
    },
    created() {
        if (this.emails.length === 0) return;
        this.$emit('selected', this.emails[0].id);

    },
    methods : {
        emitSelected(id) {
            this.$emit('selected', id);
        },
        sortBySubject() {
            console.log('sorting by subject')
            this.$emit('sortSubject', this.emails);
        },
        sortByDate() {
            console.log('sorting by date')
            this.$emit('sortDate', this.emails);
        },
        // toggleRead(email) {
        //     email.isOpen = !$email.isOpen;

        //     console.log('toggling read status of', email.isOpen)
        // }
    },

    components: {
        emailPreview
    }
}