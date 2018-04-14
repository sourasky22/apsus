
export default {
    template:` 
    <section class="compose">
        <form class="message flex flex-column justify-start" @submit.prevent="sendEmail">
            <input class="msg-to" type="text" v-model="newEmail.to" placeholder="To"></input>
            <input class="msg-subj" type="text" v-model="newEmail.subject" placeholder="Subject"></input>
            <textarea class="msg-desc" type="text" v-model="newEmail.description" placeholder="Description"></textarea>
            <button class="send-btn" type="submit">Send</button>
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
                sentAt: moment(Date.now()).format('llll'),
                description: '',
                isOpen: false
            };
        },
        sendEmail() {
            this.$emit('sent', this.newEmail)
            console.log('new mail emit sent from compose to father', this.newEmail)
        },
    }
}