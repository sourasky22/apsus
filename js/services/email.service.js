
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'
import LoremIpsum from './loremIpsum.js';
import utilService from './util.service.js';

var uniqueId = 0;

const KEY = 'emailAppKey';

function query(filter = null) {
    return storageService.load(KEY)
        .then(emails => {
            console.log('emails: ', emails);
            if (!emails) {
                emails = generateEmails();
                storageService.store(KEY, emails);
            }
            if (filter === null) return emails;
            else return emails.filter(email => email.vendor.includes(filter.byVendor))
        })
}

function getById(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        })
}

function deleteEmail(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            storageService.store(KEY, emails);
            return storageService.load(KEY)
        })
}


function addEmail(email) {
    return storageService.load(KEY)
    console.log('legnth before adding', emails.length)
    .then(emails => {
        emails.push(email);
        storageService.store(KEY, emails);
        console.log('legnth after adding', emails.length)
        return storageService.load(KEY)
    })
}

function saveEmail(email) {
    return storageService.load(KEY)
        .then(emails => {
            if (email.id) {
                var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
                emails.splice(emailIdx, 1, email);
            } else {
                email.id = Date.now();
                emails.push(email);
            }
            return storageService.store(KEY, emails);
        });
}

function generateEmails() {

    var emails = []
    for (let index = 0; index < 20; index++) {
        var email = createEmail()
        emails.push(email)

    }
    return emails;
}


function createEmail() {
    var loremIpsum = new LoremIpsum();

    var email = {
        id: uniqueId++,
        title: loremIpsum.generate(utilService.getRandomInt(1, 4), utilService.getRandomInt(3, 6)),
        subject: loremIpsum.generate(utilService.getRandomInt(5, 11), utilService.getRandomInt(1, 4)),
        sentAt: moment(Date.now()).format('LT'),
        description: loremIpsum.generate(utilService.getRandomInt(10, 30), utilService.getRandomInt(1, 4)),
        isOpen: false
    }
    return email;
}




export default {
    query,
    getById,
    deleteEmail,
    saveEmail,
    createEmail,
    generateEmails,
    addEmail
}

