import storageService from './storage.service.js'



const KEY = 'keepAppKey';

// When app is loaded - init our initial storage
(() => {
    storageService.load(KEY).then(notes => {
        if (!notes) storageService.store(KEY, [
            {type:'note-txt', config:{title: 'Main Title', txt: 'Lorem Appsus'}},
            {type:'note-audio', config:{url: 'img/car/1.png'}},
            {type:'note-txt', config:{title: 'Main Title', txt: 'Lorem Appsus'}},
            {type:'note-txt', config:{title: 'Main Title', txt: 'Lorem Appsus'}},
        
        ])
    })
})();


function query(filter = null) {
    return storageService.load(KEY)
        .then(notes => {
            console.log('Notes: ', notes);
            return notes;
        })
}


export default {
    query
}

