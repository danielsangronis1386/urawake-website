import nodemailer from "nodemailer";
import TESTIMONIAL_INVITES from "../src/data/testimonialInvites.js";

const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const CREDIT_LABELS = {
    full: "Full name and business",
    first: "First name and business",
    business: "Business name only",
};

// Submissions are emailed for review, never published directly: nothing a
// visitor types reaches the live site until Daniel adds it by hand.
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { slug, name, role, quote, credit, website } = req.body ?? {};

    // Honeypot: real people never see this field, bots fill it in.
    if (website) {
        return res.status(200).json({ success: true });
    }

    const invite = TESTIMONIAL_INVITES[slug];
    if (!invite) {
        return res.status(404).json({ error: "Unknown invitation" });
    }

    if (!name || !quote || !CREDIT_LABELS[credit]) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (String(name).length > 120 || String(role ?? "").length > 120 || String(quote).length > 1500) {
        return res.status(400).json({ error: "Too long" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    const subject = `New testimonial: ${invite.client} (${name})`;
    const text = [
        `Client: ${invite.client}`,
        `Name: ${name}`,
        `Role: ${role || "Not provided"}`,
        `Credit as: ${CREDIT_LABELS[credit]}`,
        "",
        quote,
    ].join("\n");
    const html = `
        <p>
            <strong>Client:</strong> ${escapeHtml(invite.client)}<br>
            <strong>Name:</strong> ${escapeHtml(name)}<br>
            <strong>Role:</strong> ${escapeHtml(role) || "Not provided"}<br>
            <strong>Credit as:</strong> ${escapeHtml(CREDIT_LABELS[credit])}
        </p>
        <blockquote style="border-left:4px solid #39FF14;margin:0;padding:0.5em 1em;">
            ${escapeHtml(quote).replace(/\n/g, "<br>")}
        </blockquote>
    `;

    try {
        await transporter.sendMail({
            from: `"URAWAKE Testimonials" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject,
            text,
            html,
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Mail error:", err);
        return res.status(500).json({ error: "Failed to send" });
    }
}
