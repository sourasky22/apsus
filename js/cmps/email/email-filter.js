export default {

    template:`
    <section class="email-filter">
       <button class="button is-danger compose-btn" @click="sendMsg">Comopose</button> 
        <input class="input is-success" type="text" v-model="filter.txt" @input="emitFilter">
        <div class="select">
            <select v-model="filter.emailStatus" @change="emitFilter">
                <option value="all">All</option>
                <option value="read">read</option>
                <option value="unread">unread</option>
             </select>
          </div>
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
        },
        sendMsg() {
            this.$emit('compose')
        }
    }
}