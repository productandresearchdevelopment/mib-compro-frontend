import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, subject, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // reCAPTCHA verification commented out for now
    /*
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA token is required." },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    try {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
      const verifyRes = await fetch(verifyUrl, { method: "POST" });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed." },
          { status: 400 }
        );
      }
    } catch (err) {
      console.error("reCAPTCHA verification error:", err);
      return NextResponse.json(
        { error: "Failed to verify reCAPTCHA." },
        { status: 500 }
      );
    }
    */

    // SMTP Configuration from env
    const host = process.env.EMAIL_SMTP_HOST;
    const port = parseInt(process.env.EMAIL_SMTP_PORT || "587");
    const user = process.env.EMAIL_SMTP_USERNAME;
    const pass = process.env.EMAIL_SMTP_PASSWORD;
    const fromName = process.env.EMAIL_FROM_NAME || "MIB Company Profile";
    const fromAddress = process.env.EMAIL_FROM_ADDRESS;

    if (!host || !user || !pass || !fromAddress) {
      console.error("Missing SMTP configuration in environment variables");
      return NextResponse.json(
        { error: "SMTP configuration is incomplete." },
        { status: 500 }
      );
    }

    // Create SMTP Transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    // Custom Western Indonesian Time (WIB) formatting: HH:MM AM/PM - DD Month YYYY
    const dateObj = new Date();
    const timeStr = dateObj.toLocaleTimeString("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const dateStr = dateObj.toLocaleDateString("en-US", {
      timeZone: "Asia/Jakarta",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedDate = `${timeStr} - ${dateStr}`;

    // Email content with a premium card layout on red primary background (no envelope icon)
    const mailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to: fromAddress, // Send to the config email
      replyTo: email, // Set reply-to to the sender's email
      subject: `New form submission on Contact Us`,
      html: `
        <div style="background-color: #0f172a; padding: 48px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; min-height: 100%; display: block; margin: 0;">
          <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; padding: 40px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15);">
            
            <!-- Header Logo -->
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="cid:miblogo" alt="PT. Mitra Inovasi Bisnis" style="height: 64px; width: auto; display: inline-block;" />
            </div>

            <!-- Title and Subtitle -->
            <div style="text-align: center; margin-bottom: 32px;">
              <h2 style="font-size: 22px; font-weight: 700; color: #100420; margin: 0 0 8px 0; letter-spacing: -0.02em;">New Contact Submission</h2>
              <p style="font-size: 14px; color: #64748b; margin: 0; line-height: 1.5;">
                Someone just submitted a form on <a href="https://mib.co.id" style="color: #f22929; text-decoration: none; font-weight: 600;">mib.co.id</a>. Here is what they had to say:
              </p>
            </div>

            <!-- Fields Section -->
            <div style="margin-bottom: 32px; text-align: left;">
              <div style="margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                <span style="font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Name</span>
                <span style="font-size: 15px; font-weight: 600; color: #100420;">${name}</span>
              </div>

              <div style="margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                <span style="font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Email</span>
                <span style="font-size: 15px; font-weight: 600;"><a href="mailto:${email}" style="color: #f22929; text-decoration: none;">${email}</a></span>
              </div>

              ${
                company
                  ? `
              <div style="margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                <span style="font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Company</span>
                <span style="font-size: 15px; font-weight: 600; color: #100420;">${company}</span>
              </div>
              `
                  : ""
              }

              ${
                phone
                  ? `
              <div style="margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                <span style="font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Phone</span>
                <span style="font-size: 15px; font-weight: 600; color: #100420;">${phone}</span>
              </div>
              `
                  : ""
              }

              <div style="margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                <span style="font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Subject / Interested</span>
                <span style="font-size: 15px; font-weight: 600; color: #100420;">${subject || "-"}</span>
              </div>

              <div style="margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; min-height: 80px;">
                <span style="font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Message</span>
                <span style="font-size: 15px; font-weight: 600; color: #100420; white-space: pre-wrap; display: block; line-height: 1.6;">${message}</span>
              </div>
            </div>

            <!-- CTA Reply Button -->
            <div style="text-align: center; margin-top: 32px; margin-bottom: 16px;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #f22929; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(242, 41, 41, 0.2), 0 2px 4px -1px rgba(242, 41, 41, 0.1); transition: background-color 0.2s;">
                Reply to Sender
              </a>
            </div>

          </div>

          <!-- Outer Footer -->
          <div style="max-width: 560px; margin: 24px auto 0 auto; text-align: center;">
            <p style="font-size: 12px; color: #ffffff; margin: 0 0 6px 0; line-height: 1.5;">
              Submitted on ${formattedDate}
            </p>
            <p style="font-size: 11px; color: #ffffff; margin: 0; line-height: 1.5;">
              You are receiving this because this email is configured to receive form submissions from the MIB Company Profile website.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(process.cwd(), "public/images/logo.png"),
          cid: "miblogo",
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully." });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
