import asyncHandler from "express-async-handler";
import nodemailer from 'nodemailer';

const sendMail = asyncHandler(async (req, res) => {
    const { from, to, subject, body, password, emailService } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: from,
                pass: password, 
            },
        });

        const mailOptions = {
            from, 
            to, 
            subject,
            text: body,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email', details: error.message });
    }
});

export { sendMail };
