export default {

    template:`
    <section class="email-filter">
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