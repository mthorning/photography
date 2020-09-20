import nodemailer from 'nodemailer'
import env from 'node-env-file'

env(__dirname + '../../../../.env');

// create transporter object with smtp server details
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export default  async function send({ from, subject, html }) {
    await transporter.sendMail({
        from,
        to: process.env.EMAIL_ADDRESS,
        subject,
        html
    });
}
        
