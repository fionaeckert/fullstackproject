const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



async function sendEmail(email, users){

    // generate random code to use for resetting password
    resetLink = Math.random().toString(36).substring(3,9)
    // console.log('e', email)
    
    const message = {
        to: `${email}`,
        from: 'chitterchatter.reset@gmail.com', // Use the email address or domain you verified above
        subject: 'Reset you password',
        text: 'Reset your password? Use the confirmation code below to complete the process. eis9fqpf',
        html: `<strong>Reset your password? Use the confirmation code below to complete the process.</strong> <p>${resetLink}</p>`,
    };
    
    await users.update({ "resetLink" : resetLink }, {
        where: {
          "email" : email
        }
      });
    console.log(process.env.SENDGRID_API_KEY)
    console.log(process.env.KEY)
    console.log('inside send email')
    sgMail
    .send(message)
    .then(() => {}, error => {
    console.log('here')
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
  
}

module.exports = { sendEmail }