const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')
const { users } = require('./models')
const bcrypt = require('bcrypt');
const saltRounds = 8;
const logger = require('./logger');
const sendEmail = require('./sendEmail');
const jwt = require('jsonwebtoken');
const sendGridKey = process.env.SENDGRID_KEY;
const resetSecret = process.env.RESET_SECRET;
const sgMail = require('@sendgrid/mail');
const { message } = require('./sendEmail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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
    // console.log('username: ', username)
    const user = await users.findOne({
        where: {
            'username' : username
        }
    })
    // console.log(user.username)

    res.render("home",{
        username: user.username,
        firstName: user.firstName,
        lastName : user.lastName

    })
    username = null
})


app.get('/forgotpassword', (req, res)=> {
    console.log(message)
    res.render("forgotpassword",{ sendEmail: sendEmail})
})

app.post('/checkpassword', async (req, res)=> {
    console.log(req.body.username)
    console.log(req.body.password)
    const user = await users.findOne({
        where: {
            username : req.body.username
        }
    })
    // console.log('user found:', user)
    if(user!=null) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {

            if(result == true) {
                // console.log('password matches')
                username = user.username
                res.redirect("/home")
            }
            else {
                res.redirect('/login')
                // console.log('password does not match')
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
    else if(emailregex.test(req.body.email) == false){
        // alert('Please enter a valid username.')
        error = 'Please enter a valid email.'
    }
    else if(pwregex.test(req.body.password) == false){
        // alert('Please enter a valid password.')
        error = "Please enter a valid password"
    }
    else if(req.body.password.length < 6 || req.body.password.length > 20){
        // alert('Please enter a password between 6-20 characters.')
        error = 'Please enter a password between 6-20 characters.'
    }
    else if(req.body.password != req.body.confirmpassword) {
        // console.log(req.body.password)
        // console.log(req.body.confirmpassword)
        error = "Passwords do not match"
    }
    else if(req.body.confirmage == undefined) {
        // console.log(req.body.password)
        // console.log(req.body.confirmpassword)
        error = "Please confirm age"
    }
    else if(req.body.confirmterms == undefined) {
        // console.log(req.body.password)
        // console.log(req.body.confirmpassword)
        error = "Please confirm terms"
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
                    email: req.body.email,
                    password: hash
                })
            })
        })
    }
    else if(error == '') {
        error = 'username already exists'
    }
    if (error == '') {
        res.redirect('/login')
    }
    else {
        res.redirect('/')
    }
    
})


// function update(id, changes) {
//     return db('users').where({ id }).update(changes);
//   }

// function sendEmail(user, token) {
//     sgMail.setApiKey(sendGridKey);
//     const msg = {
//       to: user.email,
//       from: "reset.chitterchatter@gmail.com", // your email
//       subject: "Reset password requested",
//       html: `
//        <a href="${clientURL}/resetpassword/${token}">${token}</a>
//      `
//      // I'm only going to use an (a tag) to make this easier to
//      // understand but feel free to add any email templates 
//      // in the `html` property
//     };
  
//     sgMail.send(msg)
//       .then(() => {
//         console.log("Email sent");
//     }).catch((error) => {
//         console.error(error);
//     })
//   }

// app.patch('/forgotpassword', async (req, res) => {  
//     try {
//       // look for email in database
//       const user = await users.findOne({
//         where: {
//             email : req.body.email
//         }
//     });
//       // if there is no user send back an error
//       if(!user) {
//         error = 'Email not found. Please try again.'
//         } else {
//         // otherwise we need to create a temporary token that expires in 10 mins
//         const resetLink = jwt.sign({ user: user.email }, 
//         resetSecret, { expiresIn: '10m' });
//         // update resetLink property to be the temporary token and then send email
//         await update(user.id, { resetLink });
//         // we'll define this function below
//         sendEmail(user, resetLink);
//         error = 'Please check your email and follow the link provided.';
//       }
//     } catch(error) {
//         error = 'Invalid input.'
//     }
//   })

//   app.patch('/resetpassword/:token', async (req, res) => {
//     // Get the token from params
//     const resetLink = req.params.token;
//     const newPassword = req.body;
  
//     // if there is a token we need to decoded and check for no errors
//     if(resetLink) {
//       jwt.verify(resetLink, resetPassword, (error, decodedToken) => {
//            if(error) {
//             error = 'Incorrect token or expired.'
//            }
//       })
//     }
  
//     try {
//       // find user by the temporary token we stored earlier
//       const user = await users.findOne({
//         where: {
//             email : req.body.email
//         }});
  
//       // if there is no user, send back an error
//       if(!user) {
//         error = 'User does not exist. To create an account, follow this link.'
//       }
  
//       // otherwise we need to hash the new password  before saving it in the database
//       const hashPassword = bcrypt.hashSync(newPassword.password, 8);
//       newPassword.password = hashPassword;
  
//       // update user credentials and remove the temporary link from database before saving
//       const updatedCredentials = {
//         password: newPassword.password,
//         resetLink: null
//       }
  
//       await update(user.id, updatedCredentials);
//       error = 'User password has been updated. Please follow this link to sign in.';
//     } catch (error) {
//         error = 'Invalid input.'
//     }
//   })
  

//   app.get('/forgotpassword', (req, res)=> {
//     res.render("forgotpassword",{
//         error : error
//     })
//     error = ''
// })

var port = process.env.PORT || 3000;

app.listen(port);