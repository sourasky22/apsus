
export default {
    props: ['place'],
    template: `
        <section class="places-preview">
        <p>{{place.id}}</p>
        <p>{{place.name}}</p>
        </section>
    `,
    data() {
        return {
        }
    },
   
}




// export default {
//     props: ['place'],
//     template: `
//         <section class="places-preview">
//         <p>{{place.name}}</p>
//         </section>
//     `,
//     data() {
//         return {
//         }
//     },
   
// }


