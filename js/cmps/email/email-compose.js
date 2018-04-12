export default {
    template:`
    <section class="car-filter">
        <h1>Filter!</h1>
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