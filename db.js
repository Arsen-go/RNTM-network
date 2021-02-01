const mongoose = require('mongoose')
const url = 'mongodb+srv://ADR:socialnetwork@cluster0.duqbf.mongodb.net/network?retryWrites=true&w=majority'
mongoose.connect(
    process.env.MONGODB_URI || url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => {
        console.log('connected to database')
    }
)
