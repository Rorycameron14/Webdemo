const transporter = require('../config/email');

const sendClientConfirmation = async (enquiry) => {
  const { first_name, last_name, email, project_type } = enquiry;

  await transporter.sendMail({
    from: `"Rory Dev" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'We received your project enquiry — Rory Dev',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
        <div style="margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 700; color: #0f0f0f; margin: 0;">Rory Dev</h1>
        </div>
        <h2 style="font-size: 20px; font-weight: 600; color: #0f0f0f;">Thanks, ${first_name}!</h2>
        <p style="color: #6b7280; line-height: 1.6;">
          We've received your enquiry about <strong style="color: #0f0f0f;">${project_type}</strong> and will be in touch within 1–2 business days.
        </p>
        <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="margin: 0; color: #374151; font-size: 14px;"><strong>Name:</strong> ${first_name} ${last_name}</p>
          <p style="margin: 8px 0 0; color: #374151; font-size: 14px;"><strong>Project type:</strong> ${project_type}</p>
        </div>
        <p style="color: #6b7280; font-size: 14px;">If you have any questions in the meantime, just reply to this email.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Rory Dev. All rights reserved.</p>
      </div>
    `,
  });
};

const sendAdminNotification = async (enquiry) => {
  const { first_name, last_name, email, phone, company, project_type, budget, project_description } = enquiry;

  await transporter.sendMail({
    from: `"Rory Dev System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New enquiry from ${first_name} ${last_name} — ${project_type}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
        <h2 style="font-size: 20px; font-weight: 600; color: #0f0f0f;">New Project Enquiry</h2>
        <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin: 16px 0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
            <tr><td style="padding: 6px 0; font-weight: 600; width: 140px;">Name</td><td>${first_name} ${last_name}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Email</td><td><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Phone</td><td>${phone}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Company</td><td>${company}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Project Type</td><td>${project_type}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Budget</td><td>${budget}</td></tr>
          </table>
        </div>
        <div style="margin-top: 16px;">
          <p style="font-weight: 600; color: #0f0f0f; margin-bottom: 8px;">Project Description</p>
          <p style="color: #6b7280; line-height: 1.6; background: #f9fafb; border-radius: 8px; padding: 16px;">${project_description}</p>
        </div>
        <p style="margin-top: 24px;"><a href="${process.env.CLIENT_URL}/admin/leads" style="background: #7c3aed; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">View in Dashboard</a></p>
      </div>
    `,
  });
};

module.exports = { sendClientConfirmation, sendAdminNotification };
