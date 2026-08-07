import nodemailer from "nodemailer";

const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const formatMoney = (n) => `$${Number(n).toLocaleString("en-US")}`;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, message, type, phone, company, summary, estimate } = req.body ?? {};
    const isEstimate = type === "estimate";

    if (!name || !email || (!isEstimate && !message)) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (isEstimate && (!estimate || typeof estimate.low !== "number" || typeof estimate.high !== "number")) {
        return res.status(400).json({ error: "Missing estimate" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    let subject;
    let text;
    let html;

    if (isEstimate) {
        const range = `${formatMoney(estimate.low)} to ${formatMoney(estimate.high)}`;
        const rows = Array.isArray(summary) ? summary : [];

        subject = `New lead: ${name} (${range}) | URAWAKE Estimator`;

        text = [
            `Estimated investment: ${range}`,
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "Not provided"}`,
            `Company: ${company || "Not provided"}`,
            "",
            ...rows.map((r) => `${r.question} ${r.answer}`),
        ].join("\n");

        html = `
            <h2>Estimated investment: ${escapeHtml(range)}</h2>
            <p>
                <strong>Name:</strong> ${escapeHtml(name)}<br>
                <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>
                <strong>Phone:</strong> ${escapeHtml(phone) || "Not provided"}<br>
                <strong>Company:</strong> ${escapeHtml(company) || "Not provided"}
            </p>
            <h3>Answers</h3>
            <ul>
                ${rows.map((r) => `<li><strong>${escapeHtml(r.question)}</strong> ${escapeHtml(r.answer)}</li>`).join("")}
            </ul>
        `;
    } else {
        subject = `New message from ${name} (URAWAKE Portfolio)`;
        text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        html = `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;
    }

    try {
        await transporter.sendMail({
            from: `"URAWAKE Portfolio" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject,
            text,
            html,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Mail error:", err);
        return res.status(500).json({ error: "Failed to send email" });
    }
}
