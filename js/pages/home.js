export default {
    template:`
    <section class="home flex align-center space-around ">
            <img class="email-icon"src="../img/email/email.svg" alt=""  @click="$router.push('/email')">
            <img class="places-icon"src="../img/places/places.svg" alt=""  @click="$router.push('/places')">
            <img class="keep-icon"src="../img/keep/keep.svg" alt=""  @click="$router.push('/keep')">
    </section>
    `
}