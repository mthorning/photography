import sendMail from '../../utils/email.js';

export async function post(req, res, next) {
    const { name, email, message } = req.body;
    sendMail({ name, email, message })
    res.end(JSON.stringify({ name, email, message}))
}
