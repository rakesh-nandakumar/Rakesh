import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "@/lib/config";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token (if provided)
    if (recaptchaToken) {
      try {
        const recaptchaResponse = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
          }
        );

        const recaptchaResult = await recaptchaResponse.json();

        if (!recaptchaResult.success) {
          return NextResponse.json(
            { success: false, error: "reCAPTCHA verification failed" },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error("reCAPTCHA verification error:", error);
        // Continue without reCAPTCHA verification in case of network issues
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.password,
      },
    });

    // Email content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            margin: -30px -30px 30px -30px;
            text-align: center;
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            border-left: 4px solid #667eea;
          }
          .field-label {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
          }
          .field-value {
            font-size: 16px;
            word-wrap: break-word;
          }
          .message-field {
            background-color: #fff;
            border: 1px solid #e9ecef;
            padding: 20px;
            border-radius: 5px;
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            text-align: center;
            color: #6c757d;
            font-size: 14px;
          }
          .timestamp {
            color: #6c757d;
            font-size: 12px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Contact Form Submission</h1>
            <p>Someone reached out through your portfolio website!</p>
          </div>
          
          <div class="field">
            <div class="field-label">👤 Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">📧 Email</div>
            <div class="field-value">
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
            </div>
          </div>
          
          ${
            phone
              ? `
          <div class="field">
            <div class="field-label">📞 Phone</div>
            <div class="field-value">
              <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
            </div>
          </div>
          `
              : ""
          }
          
          <div class="field">
            <div class="field-label">📋 Subject</div>
            <div class="field-value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="field-label">💬 Message</div>
            <div class="field-value message-field">${message}</div>
          </div>
          
          <div class="footer">
            <p>This email was sent from your portfolio website contact form.</p>
            <div class="timestamp">
              Received: ${new Date().toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short",
              })}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${EMAIL_CONFIG.user}>`,
      to: EMAIL_CONFIG.user,
      replyTo: email,
      subject: `🚀 New Contact: ${subject}`,
      html: htmlContent,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}${phone ? `\nPhone: ${phone}` : ""}
Subject: ${subject}

Message:
${message}

Received: ${new Date().toLocaleString()}
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", {
      from: email,
      name: name,
      subject: subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email sending failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (for health check)
export async function GET() {
  return NextResponse.json({
    status: "Email service is active",
    service: "Gmail SMTP",
    timestamp: new Date().toISOString(),
  });
}
