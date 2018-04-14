import emailService from "../../services/email.service.js";


export default {
    props: ['selectedEmail'],
    template: `
        <section class="">
          <a @click="deleteEmail" class="button is-danger is-outlined">
                <span>Delete</span>
                    <span class="icon is-small">
                    <i class="fas fa-times"></i>
                </span>
            </a>
          <h1 class="title is-2">{{selectedEmail.subject}}</h1>
          <h3>{{selectedEmail.sentAt}}</h3>
          <p>{{selectedEmail.description}}</p>
        </section>
    `,
    methods: {
        //not refresh
        deleteEmail() {
            
            this.$emit('delete', this.selectedEmail.id);
            }
    },
    data() {
        return {
        }
    }
   
}

