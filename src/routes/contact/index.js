import sendMail from '../../utils/email.js';

export async function post(req, res, next) {
    const { name, email, message } = req.body;
sendMail({
    from: email,
    subject:  `Contact from ${name}`,
    html: `
<h3>Message from ${name} (${email}):</h3>
<p>${message}</p>
    `
})
    res.end(JSON.stringify({ name, email, message}))
}
