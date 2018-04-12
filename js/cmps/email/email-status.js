export default {
    template:`
    <section class="email-status">
        <h1>email-status</h1>
    </section>
    `,
    data() {
        return {
            filter: {byVendor: ''}
        }
    },
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
        }
    }
}