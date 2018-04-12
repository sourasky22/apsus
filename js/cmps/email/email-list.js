import emailPreview from "./email-preview.js";

export default {
    props: ['emails', 'emailIdx'] ,
    template:`
    <section class="">
        <h1>Email list</h1>
        <h1 v-if="msg">{{msg}}</h1>
        <ul>
          <li class="email-preview" v-for="email in emails">
               <email-preview :email="email" @click.native="emitSelected(email.id)"></email-preview>
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
            return this.emails.length? '' : 'You suck and nobody likes you!';
        }
    },
    created() {
        if (this.emails.length === 0) return;
        this.$emit('selected', this.emails[0].id);

    },
    methods : {
        emitSelected(id) {
            this.$emit('selected', id);
        }
    },

    components: {
        emailPreview
    }
}