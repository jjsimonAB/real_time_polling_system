const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://root:hY7nNkKKtc6nFQjd@pollmongo-esr1o.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log('mongoDB connected'))
.then(err => console.log(err));