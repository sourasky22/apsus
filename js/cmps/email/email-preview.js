
export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            <h5>{{email.subject}}</h5>
             <p>{{email.sentAt}}</p>
             <p>Unread? <button @click.stop="toggleRead">{{email.isOpen}}</button></p>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        toggleRead(email) {
            this.$emit('toggleRead', this.email);
        }
    }
   
}
