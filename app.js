const express = require('express')
const bodyParser = require('body-parser')

const placesRoutes = require('./src/routes/place-routes')

const app = express()

app.use('/api/places',placesRoutes); // => /api/places/

//error handling
app.use((error, req, res, next) => {
    if(res.headerSent){
        return(next(error))
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occured!' })
})

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(4000)
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


