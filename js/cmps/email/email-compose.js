import emailService from "../../services/email.service.js";

export default {
    // props: ['email'],
    template:`
    <section >
        <form class="flex flex-column justify-start" @submit.prevent="addEmail">
            <input type="text" v-model="newEmail.to" placeholder="To"></input>
            <input type="text" v-model="newEmail.subject" placeholder="Subject"></input>
            <textarea type="text" v-model="newEmail.description" placeholder="Description"></textarea>
            <button type="submit">Send</button>
        </form>    
    </section>
    
    `,
    data() {
        return {
            newEmail : this.getEmptyEmail(),
        }
    },
    methods : {
        getEmptyEmail() {
            return {
                id: Date.now(),
                to: '',
                subject: '',
                sentAt: moment(Date.now()).format('LT'),
                description: '',
                isOpen: false
            };
        },
        addEmail() {
            emailService.addEmail(this.newEmail)
            .then(saveEmail => {
                console.log("Email sent")
                this.email = this.getEmptyEmail()
            })
            .catch(err => {
                console.error('Email was NOT Sent', err);
            })
        }
    }
}