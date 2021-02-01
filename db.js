const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/rntmnetwork'
//Arsen mongodb+srv://ADR:socialnetwork@cluster0.duqbf.mongodb.net/network?retryWrites=true&w=majority
mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => {
        console.log('connected to database')
    }
)
