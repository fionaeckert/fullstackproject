var message = {
    from: "reset.chitterchatter@gmail.com",
    to: "fionameckert@gmail.com",
    subject: "Forgot password",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>"
  };


function sendEmail(){
    console.log('inside send email')
    transporter.sendMail(message[(err) => {
        if(err == null){
            console.log('sent email')
        }
        else{
            console.log('failed')
        }
    }])
}

module.exports = {sendEmail() {}, message}