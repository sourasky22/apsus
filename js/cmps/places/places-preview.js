
export default {
    props: ['place'],
    template: `
        <section class="preview">
        <h1>{{place.id}}</h1>
        <h1>{{place.name}}</h1>
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


