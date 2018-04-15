export default {
    props: ['percent'],
    template:`
    <section class="email-status" style="width:100%; height:100%">
    <div class="progress-bar " style="width:100%; height:100%"> 
        <div style="height:80%; background:pink; text-align:right" :style="{width: percent + '%'}">
                <slot></slot>
        </div>
    </div>
    </section>
    `,
    created() {    
    },
    data() {
        return {
            filter: {byVendor: ''},
            prog: 0,
            
        }
    },
    
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
        }
    },
}