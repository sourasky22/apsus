
export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            <h5 class="title is-size-5">{{email.subject}}</h5>
             <p>{{email.sentAt}}</p>
             <p><button @click.stop="toggleRead">{{email.isOpen}}</button></p>
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
