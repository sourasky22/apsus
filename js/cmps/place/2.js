
export default {
    props: ['cars'],
    template: `
        <section class="car-list">
            <ul>
                <li v-for="car in cars">
                    {{car}}
                    <router-link :to="'/car/'+car.id">Details</router-link> |
                    <router-link :to="'/car/edit/'+car.id">Edit</router-link>
                </li>
            </ul>
            
        </section>
    `,
    data() {
        return {
        }
    },
   
}