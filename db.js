const mongoose = require('mongoose')
const url = 'mongodb+srv://Davit2001:david440787@cluster0.tgmmt.mongodb.net/SocialNetwork?retryWrites=true&w=majority'
mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('connected to database')
    }
)