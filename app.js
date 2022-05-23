require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const placesRoutes = require('./src/routes/place-routes')
const userRoutes = require('./src/routes/authRoutes')
const HttpError = require('./src/models/http-error')
const { default: mongoose } = require('mongoose')

const app = express()

//receive body 
app.use(bodyParser.json());

app.use('/api/places',placesRoutes); // => /api/places/
app.use('/api/users',userRoutes); // => /api/places/
//error handling
app.use((error, req, res, next) => {
    if(res.headerSent){
        return(next(error))
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occured!' })
})
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.6whqr.mongodb.net/places?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000);
    })
    .catch(err => {
        console.log("err",err)
    })
    //virtualize id
mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
    }
    });
//if there is unknown route 
app.use((error, req, res, next)=> {
    const error404 = new HttpError('Could not find this route.', 404);
    throw error404;
})


//query param
app.use(bodyParser.urlencoded({ extended: false }))

// app.listen(4000)
//bisa digantikan dengan body parser
// app.use((req, res, next) => {
//     let body = "";
//     req.on('end', () => {
//         const username = body.split('=')[1];
//         if(username){
//             req.body = { name: username }
//         }
//         next()
//     })

//     //menambah data yang sudah di req 
//     req.on('data', chunk => {
//         body += chunk
//     })

// })

// app.post("/user",(req, res, next) => {
//     res.send('<h1> User: '+ req.body.username +'</h1>')
// })

// app.get("/",(req, res, next) => {
//     res.send('<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>')
// })


