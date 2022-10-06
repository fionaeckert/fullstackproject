const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')
const { users } = require('./models')
const bcrypt = require('bcrypt');
const saltRounds = 8;
let error = ''
let username = null

app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.static("public"));


//Renders the registration (sign up) page on the port identified in app.use statement (3000)
app.get('/', (req, res)=> {
    res.render("signUp",{
        error : error
    })
    error = ''
})

//Renders the login page on the port identified in app.use statement (3000)
app.get('/login', (req, res)=> {
    res.render("login",{
        error : error
    })
    error = ''
})

//Renders the user's data from the database and displays it on the home page
app.get('/home', async (req, res)=> {
    console.log('username: ', username)
    const user = await users.findOne({
        where: {
            'username' : username
        }
    })
    console.log(user.username)

    res.render("home",{
        username: user.username,
        firstName: user.firstName,
        lastName : user.lastName

    })
    username = null
})

app.post('/checkpassword', async (req, res)=> {

    const user = await users.findOne({
        where: {
            username : req.body.username
        }
    })
    // console.log('user found:', user)
    if(user!=null) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {

            if(result == true) {
                console.log('password matches')
                username = user.username
                res.redirect("/home")
            }
            else {
                res.redirect('/login')
                console.log('password does not match')
            }
        
        
        });

    }
    else {
        res.redirect('/login')
    }

})

app.post('/createuser', async (req, res) => {
    error = ''
    const user = await users.findOne({
        where: {
            username : req.body.username
        }
        
    })
    
    var regex = /^[A-Za-z]+$/;
    var userregex = /^[a-z0-9_-]{3,16}$/; // Letters, Numbers, Underscore and dash, min 3, max 16
    var pwregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/
    console.log(regex.test(req.body.firstname))
    
    if(regex.test(req.body.firstname) == false){
        // alert('Please enter a valid first name.')
        error = 'Please enter a valid first name.'
    }
    else if(regex.test(req.body.lastname) == false){
        // alert('Please enter a valid last name.')
        error = 'Please enter a valid last name.'
    }
    else if(userregex.test(req.body.username) == false){
        // alert('Please enter a valid username.')
        error = 'Please enter a valid username.'
    }
    else if(pwregex.test(req.body.password) == false){
        // alert('Please enter a valid password.')
        error = "Please enter a valid password. Your password must have at least one uppercase letter, at least one lowercase letter, at least one special character, and at least one number."
    }
    else if(req.body.password.length < 6 || req.body.password.length > 20){
        // alert('Please enter a password between 6-20 characters.')
        error = 'Please enter a password between 6-20 characters.'
    }
    else if(req.body.password != req.body.confirmpassword) {
        error = "Passwords do not match"
    }
    else {
        error = ''
    }
    
    if(user == null && error == '') {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
        users.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        username: req.body.username,
        password: hash
        })
  })
})
    }
    else if(error == '') {
        error = 'username already exists'
    }
    
    res.redirect('/registration')
})

app.listen(process.env.PORT || 3000);