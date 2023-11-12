const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const router = require('./routes/user')
const connection = require('./models/index')


var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

app.use('/',router)

app.listen(PORT,()=>{
    console.log(`app is running on the port ${PORT}`);
})