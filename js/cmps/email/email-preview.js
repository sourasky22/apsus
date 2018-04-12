
export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            <h5>{{email.subject}}</h5>
             <p>{{email.sentAt}}</p>
             <p>has been opened? {{email.isOpen}}</p>
        </section>
    `,
    data() {
        return {
        }
    }
   
}
