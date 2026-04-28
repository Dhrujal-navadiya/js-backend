// mailtrap.js
import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b10386c834c8de",
    pass: "af2f7745190c0e",
  },
});
