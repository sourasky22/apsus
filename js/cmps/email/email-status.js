export default {
    props: ['mailCount'],
    template:`
    <section class="email-status">
            <progress class="progress is-primary" value="prog" max="100"></progress>
    </section>
    `,
    created() {
        console.log('current progress' ,this.prog, 'current mailCount is', this.mailCount);
        if (this.mailCount === 100) this.prog = 100;
        else if (this.mailCount <= 90) this.prog = 90;
        else if (this.mailCount <= 75) this.prog = 75;
        else if (this.mailCount <= 60) this.prog = 60;
        else if (this.mailCount <= 45) this.prog = 45;
        else if (this.mailCount <= 30) this.prog = 30;
        else if (this.mailCount <= 15) this.prog = 15;      
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