const mongoose = require('mongoose')
const url = 'mongodb+srv://ADR:socialnetwork@cluster0.duqbf.mongodb.net/network?retryWrites=true&w=majority'
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