"use server"
import nodemailer from 'nodemailer'
type Book = {
    bookId: string,
    treatment: string,
    doctor: string,
    date: string
    time: string
}

type CancellationRequest = {
    bookId: string,
    patientDOB: string,
    patientName: string,
    requestDate: string
    patientPhone: string
}
const transporter = nodemailer.createTransport(
    {
        service: process.env.EMAIL_SERVICE,
        // host: "smtp.gmail.com",
        // port: 465,
        // secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })


export async function sendBookingConfirmationMail(patientName: string, patientEmail: string, bookInfo: Book) {
    try {
        const info = await transporter.sendMail({
            from: 'HospitalBookingSystem@app.com',
            to: patientEmail,
            subject: 'Booking Confirmation - Hospital Booking System',
            text: `Dear ${patientName},

Thank you for booking an appointment with us. Here are your booking details:
    
Booking ID: ${bookInfo.bookId}
Treatment: ${bookInfo.treatment}
Doctor: Dr. ${bookInfo.doctor}
Date: ${bookInfo.date}
Time: ${bookInfo.time}

If you have any questions or need to reschedule, please contact us at hospitalbookingsystem@mail.com.

Best regards,
Hospital Booking System`
        })
    } catch (error) {
        console.error('Something went wrong with sendBookingConfirmationMail() location:libs/mail.ts', error)
    }
}

export async function sendBookingCancellationMail(patientName: string, patientEmail: string, bookInfo: Book) {
    try {
        const info = await transporter.sendMail({
            from: 'HospitalBookingSystem@app.com',
            to: patientEmail,
            subject: 'Booking Cancellation - Hospital Booking System',
            text: `Dear ${patientName},

Your appointment has been successfully cancelled. Here are the details of the cancelled booking:

Booking ID: ${bookInfo.bookId}
Treatment: ${bookInfo.treatment}
Doctor: Dr. ${bookInfo.doctor}
Date: ${bookInfo.date}
Time: ${bookInfo.time}

If this cancellation was a mistake or you wish to reschedule, please contact us at hospitalbookingsystem@mailcom.

Best regards,
Hospital Booking System`
        })
    } catch (error) {
        console.error('Something went wrong with sendBookingCancellationMail() location:libs/mail.ts', error)
    }
}

export async function sendCancellationRequestMail(patientName: string, cancelInfo: CancellationRequest) {
    try {
        const info = await transporter.sendMail({
            from: 'HospitalBookingSystem@app.com',
            to: process.env.ADMIN_EMAIL,
            subject: 'New Cancellation Request - Hospital Booking System',
            text: `Dear Admin,

A new cancellation request has been submitted.

Booking ID: ${cancelInfo.bookId}
Patient Name: ${cancelInfo.patientName}
Phone: ${cancelInfo.patientPhone}
Date of Birth: ${cancelInfo.patientDOB}
Request Date: ${cancelInfo.requestDate}

Please review and take the necessary action.

Best regards,
Hospital Booking System`
        })
    } catch (error) {
        console.error('Something went wrong with sendCancellationRequestMail() location:libs/mail.ts', error)
    }
}

