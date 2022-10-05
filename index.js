const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')
const { users } = require('./models')
const bcrypt = require('bcrypt');
const saltRounds = 8;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
let error = null

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res)=> {
    res.render("signUp",{
        error : error
    })
})


app.post('/createuser', async (req, res) => {
    error = null
    const user = await users.findOne({
        where: {
            username : req.body.username
        }
        
    })
    
    var regex = /^[A-Za-z]+$/;

    if(regex.test(req.body.firstname)){
        // alert('Please enter a valid first name.')
        error = 'Please enter a valid first name.'
    }
    else if(typeof(req.body.lastname)!='string'){
        // alert('Please enter a valid last name.')
        error = 'Please enter a valid last name.'
    }
    else if(typeof(req.body.username)!='string'){
        // alert('Please enter a valid username.')
        error = true
    }
    else if(typeof(req.body.password)!='string'){
        // alert('Please enter a valid password.')
        error = true
    }
    else if(Object.keys(req.body.password).length < 6 || Object.keys(req.body.password).length > 20){
        // alert('Please enter a password between 6-20 characters.')
        error = true
    }
    else {
        error = null
    }
    
    if(user == null && error == null) {
        await users.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        username: req.body.username,
        password: req.body.password
        })
    }
    else {
        error = 'username already exists'
    }
    
    res.redirect('/')
})

app.listen(3000, console.log('Server running on port 3000'))