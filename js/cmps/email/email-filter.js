export default {

    template:`
    <section class="email-filter">
        <input type="text" v-model="filter.txt" @input="emitFilter">
            <select v-model="filter.emailStatus" @change="emitFilter">
                <option value="all">All</option>
                <option value="read">read</option>
                <option value="unread">unread</option>
             </select>
      </section>
    `,
    data() {
        return {
            filter: {
                txt: '',
                emailStatus: 'all'
            }
        }
    },
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
            console.log('emailStatus', this.filter.emailStatus)
        }
    }
}