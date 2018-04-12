
export default {
    template:`
    <section class="compose">
        <form class="flex flex-column justify-start" @submit.prevent="sendEmail">
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