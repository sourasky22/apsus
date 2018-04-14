
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
            else {
                if (filter.txt === '') {
                    return emails.filter(email => {
                        if (filter.emailStatus !== 'all') {
                            if (filter.emailStatus === 'unread') return email.isOpen === 'unread'
                            else return email.isOpen === 'read'
                        }
                        return emails;
                    })
                } else {
                    return emails.filter(email => {
                       return (email.description.includes(filter.txt) || email.subject.includes(filter.txt))
                    });
                }
            }
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
    // console.log('legnth before adding', emails.length)
    return storageService.load(KEY)
        .then(emails => {
            emails.unshift(email);
            storageService.store(KEY, emails);
            // console.log('legnth after adding', emails.length)
            return storageService.load(KEY)
        })
}

function saveEmail(email) {
    // console.log('save email', email)
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
        })
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
        title: loremIpsum.generate(utilService.getRandomInt(1, 4), utilService.getRandomInt(1, 8)),
        subject: loremIpsum.generate(utilService.getRandomInt(5, 11), utilService.getRandomInt(1, 8)),
        sentAt: moment(Date.now()).format('L'),
        description: loremIpsum.generate(utilService.getRandomInt(30, 150), utilService.getRandomInt(1, 8)),
        isOpen: 'unread'
    }
    return email;
}

// Mail Sorting by Title or Date
function sortBySubject(emails) {
    emails.sort(compareSubject);
    return emails
}
function compareSubject(a, b) {
    if (a.subject > b.subject) return 1;
    if (a.subject < b.subject) return -1;
    else return 0;
}
function sortByDate(emails) {

    emails.sort(compareDate);

    return emails
}
function compareDate(a, b) {
    return b.sentAt - a.sentAt;
}

function toggleReadStatus(email) {
    return storageService.load(KEY)
        .then(emails => {
            var newM = emails.find(e => e.id === email.id)
            newM.isOpen = !newM.isOpen
            // console.log(newM)
            storageService.store(KEY, emails);
            return storageService.load(KEY)
        })
}

export default {
    query,
    getById,
    deleteEmail,
    saveEmail,
    createEmail,
    generateEmails,
    addEmail,
    sortBySubject,
    sortByDate,
    toggleReadStatus
}

