
import emailFilter from "../cmps/email/email-filter.js";
import emailList from "../cmps/email/email-list.js";
import emailStatus from "../cmps/email/email-status.js";
import emailDetails from "../cmps/email/email-details.js";
import emailCompose from "../cmps/email/email-compose.js";

import emailService from "../services/email.service.js";



export default {
    template:`
    <section class="email container1 grid-container1">
        <transition name="bounce">    
      <email-compose v-if="sendMsg" @sent="addEmail"> </email-compose> 
        </transition> 
        <div class="item1">
            <email-filter @compose="sendEmail" @filtered="filterBy"></email-filter>
            <email-list class="email-list" @selected="emailToShow" :emails="emails" v-if="emails"
             @sortSubject="sortBySubject" @sortDate="sortByDate" @toggleRead="func"></email-list>
        </div>
        <div class="item2">
        <email-details class="email-details" v-if="selectedEmail" :selectedEmail="selectedEmail" @delete="deleteEmail"></email-details>
        </div>
        <div class="item3">
         <email-status :mailCount="mailCount"></email-status>
        </div>
    </section>
    `,
    data() {
            return {
                emails: null, 
                selectedEmailIdx: null,
                filteredEmails: [],
                selectedEmail: null,
                sendMsg: false,
                mailCount: null
            }
    },
    created(){
        emailService.query()
        .then(emails => {
            console.log('create book', emails);
            this.emails = emails;
            this.mailCount = emails.length
        })
    },
    methods: {
        emailToShow(emailClicked) {
           this.selectedEmail = this.emails.find(email => email.id === emailClicked);
           this.selectedEmail.isOpen = 'read';
           emailService.saveEmail(this.selectedEmail);
        },
        //desicide if use delete here or in email-preview cmp
        deleteEmail(emailId){
            this.selectedEmailIdx = this.emails.findIndex(email => email.id === emailId);
            emailService.deleteEmail(emailId)
            .then(emails =>{
                this.emails = emails;
                this.selectedEmail = this.emails[this.selectedEmailIdx];
            })
        },
        filterBy(input) {
            emailService.query(input)
            .then(emails => {
                console.log('create book', emails);
                this.emails = emails;
            })
        },
        addEmail(newEmail) {
            emailService.addEmail(newEmail)
                .then(emails => {
                    this.emails = emails;
                    this.sendMsg = !this.sendMsg;
                })
            console.log('email received')
            console.log(this.emails, this.emails.length)
        },
        sortBySubject() {
            this.emails = emailService.sortBySubject(this.emails)
        },
        sortByDate() {
            this.emails = emailService.sortByDate(this.emails)
        },
        func(email){

            emailService.toggleReadStatus(email)
                .then((emails) => {
                    this.emails =  emails;
                })
 
        },
        sendEmail(event) {
            this.sendMsg = !this.sendMsg;
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