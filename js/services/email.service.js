
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'
import LoremIpsum from './loremIpsum.js';
import utilService from './util.service.js';

var uniqueId = 1;

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
            else return emails.filter(email => {
                if (filter.emailStatus !== 'all') {
                    if (filter.emailStatus !== email.isOpen) return false
                } 
                return true;
            }
            //   email.description.includes(filter.txt) || email.subject.includes(filter.txt)
            )
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



function saveEmail(email) {
    console.log('save email', email)
    return storageService.load(KEY)
        .then(emails => {
            if (email.id) {
                var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
                emails.splice(emailIdx, 1, email);
            } else {
                email = createEmail();
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
        categories: ['Computers', 'Hack'],
        isOpen: 'unread'
    }
    return email;
}




export default {
    query,
    getById,
    deleteEmail,
    saveEmail,
    createEmail,
    generateEmails
}

