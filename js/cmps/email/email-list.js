import emailPreview from "./email-preview.js";
import emailService from "../../services/email.service.js";



export default {
    props: ['emails', 'emailIdx'] ,
    template:`
    <section>
        <h1 v-if="msg">{{msg}}</h1>
        <div class="filterByBtns">
        <p class="title is-4">Filter by:</p>
        <button class="button is-primary" @click="sortBySubject">Subject</button>
        <button class="button is-primary" @click="sortByDate">Date</button>
        </div>
        <ul class="email-preview">
          <li v-for="email in emails">
               <email-preview :email="email" @toggleRead="$emit('toggleRead',$event)" @click.native="emitSelected(email.id)"></email-preview>
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
    },

    components: {
        emailPreview
    }
}