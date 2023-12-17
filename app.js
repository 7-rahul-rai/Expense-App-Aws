const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const router = require('./routes/user')
const router1 = require('./routes/expenseroutes')
const router2 = require('./routes/purchase')
const router3 = require('./routes/premium')
const router4 = require('./routes/forgotp')
const User = require('./models/user')
const Expenses = require('./models/expense')
const Order = require('./models/order')
const connection = require('./util/db')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('public'))
app.use(cors())


app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

app.use('/',router)
app.use('/',router1)
app.use('/',router2)
app.use('/',router3)
app.use('/',router4)

User.hasMany(Expenses)
Expenses.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

app.listen(PORT,()=>{
    console.log(`app is running on the port ${PORT}`);
})