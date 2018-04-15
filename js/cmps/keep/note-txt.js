export default {
    template:`
    <section class="car-filter">
        <h1>Filter!</h1>
        <input type="text" v-model="filter.byVendor" @input="emitFilter">
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