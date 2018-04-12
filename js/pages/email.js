
import emailFilter from "../cmps/email/email-filter.js";
import emailList from "../cmps/email/email-list.js";
import emailStatus from "../cmps/email/email-status.js";
import emailDetails from "../cmps/email/email-details.js";
import emailCompose from "../cmps/email/email-compose.js";

import emailService from "../services/email.service.js";



export default {
    template:`
    <section class="email container grid-container">
        <button>
            <email-compose>
                Compose
            </email-compose>
        </button>
        <div class="item1">
            <email-filter></email-filter>
            <email-list class="email-list" @selected="emailToShow" :emails="emails" :emailIdx="selectedEmailIdx" v-if="emails"></email-list>
        </div>
        <div class="item2">
        <email-details class="email-details" v-if="selectedEmail" :selectedEmail="selectedEmail" @delete="deleteEmail"></email-details>
        </div>
        <div class="item3">
         <email-status></email-status>
        </div>
    </section>
    `,
    data() {
            return {
                emails: null, 
                filter: null,
                selectedEmailIdx: null,
                filteredEmails: [],
                selectedEmail: null
            }
    },
    created(){
        emailService.query()
        .then(emails => {
            console.log('create book', emails);
            this.emails = emails;
        })
    },
    methods: {
        emailToShow(event) {
           this.selectedEmail = this.emails.find(email => email.id === event);
           this.selectedEmail.isOpen = true;
           console.log('select email',this.selectedEmail);
        },
        //desicide if use delete here or in email-preview cmp
        deleteEmail(emailId){
            //part of trying to render next mail after deletion
            this.selectedEmailIdx = this.emails.findIndex(email => email.id === emailId);
            //
            console.log('select email',emailId);
            emailService.deleteEmail(emailId)
            .then(emails =>{
                this.emails = emails;
                this.selectedEmail = this.emails[this.selectedEmailIdx];
            })
        }
    },
    components: {
        emailFilter,
        emailList,
        emailStatus,
        emailDetails,
        emailCompose
    } 
}