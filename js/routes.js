import home from "./pages/home.js";
import email from "./pages/email.js";
import keep from "./pages/keep.js";
import place from "./pages/place.js";



const routes = [
    {path: '/', component: home},
    {path: '/email', component: email },
    {path: '/email/:emailId', component: email },
    {path: '/place', component:place },
    {path: '/keep', component: keep}
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;