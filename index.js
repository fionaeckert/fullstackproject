const express = require('express');
const bodyParser = require('body-parser');
const { users } = require('./models');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const logger = require('./logger');
const key = process.env.KEY;
const { sendEmail } = require('./sendEmail');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const methodOverride = require('method-override');
const session = require('express-session');
const axios = require('axios').default;


const app = express()
app.set('view engine', 'ejs')

app.use(methodOverride('_method'));

const sendGridKey = process.env.SENDGRID_KEY;
const resetSecret = process.env.RESET_SECRET;

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'profession speaker sofa shine cable conglomerate efflux studio bang money', resave: false, saveUninitialized: false}));

app.use(express.static("public"));


//Renders the registration (sign up) page on the port identified in app.use statement (3000)
app.get('/', (req, res)=> {
    res.render("signUp",{
        error : req.session.error
    })
    req.session.error = ''
})

//Renders the login page on the port identified in app.use statement (3000)
app.get('/login', (req, res)=> {
    if(req.session.userId != null) {
        res.redirect("/home")
    }
    else {
        res.render("login",{
            error : req.session.error
        })
        req.session.error = ''
    }
    
})

//Renders the user's data from the database and displays it on the home page
app.get('/home', async (req, res)=> {
    let selectedArticles = [];
    console.log('userId1: ', req.session.userId)
    if(req.session.userId == null) {
        res.redirect("/login")
    }
    else {
        const user = await users.findOne({
            where: {
                id: req.session.userId
            }
        })
        axios.get(`https://newsdata.io/api/1/news?apikey=${key}&q=technology&language=en`)
        .then(function (response) {
        for(let i=0; i<11; i++){
        let article = {
            "Title": response.data.results[i].title,
            "Author": response.data.results[i].creator,
            "Link": response.data.results[i].link,
            "Description": response.data.results[i].description
        }
        selectedArticles.push(article)
        }})
        .catch(function (error) {
            // handle error
            res.statusCode = 500 // Internal Server Error
            res.send('Unable to generate articles');
        })
        res.render("home",{
            username: user.username,
            firstName: user.firstName,
            lastName : user.lastName,
            selectedArticles: selectedArticles
        })
    }
    
})

// render forgot password page
app.get('/forgotpassword', (req, res)=> {
    // console.log(req.body.email)
    res.render("forgotpassword",{ sendEmail: sendEmail})
})

// run send email function to send an email
app.put('/forgotpassword', async (req,res) => {
    // get user that matches email sent in body
    const user = await users.findOne({
        where: {
            email : req.body.email
        }
    })

    // if user is found then run sendEmail function
    if(user != null) {
        sendEmail(req.body.email, users)
    }
    
    res.redirect('/resetpassword')
})

// render resetpassword page
app.get('/resetpassword', (req, res)=> {
    res.render("resetpassword",{ error: req.session.error})
    
})

// update password
app.put('/resetpassword', async (req, res)=> {
    req.session.error = ''
    console.log(req.body.email)
    console.log(req.body.resetLink)

    // see if email and reset code match whats in the database
    const user = await users.findOne({
        where: {
            email : req.body.email,
            resetLink : req.body.resetLink
        }
    })

    // regex check for password
    var pwregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/

    // if new password is valid and user email is valid and resetcode is valid 
    if(req.body.password == req.body.confirmpassword && req.body.password.length > 6 && req.body.password.length < 20 && pwregex.test(req.body.password) == true && user != null) {
        console.log("passwords match")
        //new hash for password
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                await users.update({ "password" : hash }, {
                    where: {
                       email : req.body.email,
                       resetLink : req.body.resetLink
                    }
                  });
            })
        })

        // reset reset code to empty
        await users.update({ "resetLink" : '' }, {
            where: {
                email : req.body.email,
                resetLink : req.body.resetLink
            }
          });

        res.redirect('/login')
    }
    else {
        req.session.error = 'Unsuccesful'
        res.redirect('/resetpassword')

    }

    
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
                username = user.username
                req.session.userId = user.id
                res.redirect("/home")
            }
            else {
                res.redirect('/login')
            }
        });
    }
    else {
        res.redirect('/login')
    }
})

app.post('/createuser', async (req, res) => {
    req.session.error = ''
    const user = await users.findOne({
        where: {
            username : req.body.username
        }
        
    })
    console.log('terms', typeof req.body.confirmterms)
    console.log('age',(typeof req.body.confirmage))
    console.log('first',typeof(req.body.username))
    console.log('email', req.body.email)
    
    var regex = /^[A-Za-z]+$/;
    var userregex = /^[a-z0-9_-]{3,16}$/; // Letters, Numbers, Underscore and dash, min 3, max 16
    var pwregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/
    var emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // console.log(regex.test(req.body.firstname))
    
    if(regex.test(req.body.firstname) == false){
        // alert('Please enter a valid first name.')
        req.session.error = 'Please enter a valid first name.'
    }
    else if(regex.test(req.body.lastname) == false){
        // alert('Please enter a valid last name.')
        req.session.error = 'Please enter a valid last name.'
    }
    else if(userregex.test(req.body.username) == false){
        // alert('Please enter a valid username.')
        req.session.error = 'Please enter a valid username.'
    }
    else if(emailregex.test(req.body.email) == false){
        // alert('Please enter a valid username.')
        req.session.error = 'Please enter a valid email.'
    }
    else if(pwregex.test(req.body.password) == false){
        // alert('Please enter a valid password.')
        req.session.error = "Please enter a valid password"
    }
    else if(req.body.password.length < 6 || req.body.password.length > 20){
        // alert('Please enter a password between 6-20 characters.')
        req.session.error = 'Please enter a password between 6-20 characters.'
    }
    else if(req.body.password != req.body.confirmpassword) {
        // console.log(req.body.password)
        // console.log(req.body.confirmpassword)
        req.session.error = "Passwords do not match"
    }
    else if(req.body.confirmage == undefined) {
        // console.log(req.body.password)
        // console.log(req.body.confirmpassword)
        req.session.error = "Please confirm age"
    }
    else if(req.body.confirmterms == undefined) {
        // console.log(req.body.password)
        // console.log(req.body.confirmpassword)
        req.session.error = "Please confirm terms"
    }
    else {
        req.session.error = ''
    }
    
    if(user == null && req.session.error == '') {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                users.create({
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                })
            })
        })
    }
    else if(req.session.error == '') {
        req.session.error = 'username already exists'
    }
    if (req.session.error == '') {
        res.redirect('/login')
    }
    else {
        res.redirect('/')
    }
    
})

app.post('/logout', (req, res)=> {
    req.session.userId = null
    res.redirect('/login')
})

var port = process.env.PORT || 3000;

app.listen(port);