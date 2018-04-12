import emailService from "../../services/email.service.js";


export default {
    props: ['selectedEmail'],
    template: `
        <section class="">
        <button @click="deleteEmail">Delete</button>
          <h3>{{selectedEmail.subject}}</h3>
          <h3>{{selectedEmail.sendAt}}</h3>
          <p>{{selectedEmail.sendAt}}</p>
          <p>{{selectedEmail.description}}</p>
        </section>
    `,
    methods: {
        //not refresh
        deleteEmail() {
            emailService.deleteEmail(this.selectedEmail)
            .then(res => {
                this.$router.push('/email');
            })
        }
    },
    data() {
        return {
        }
    }
   
}

