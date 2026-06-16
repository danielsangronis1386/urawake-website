import { useState } from "react";
import "./ContactSection.css";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    subject: `New message from ${form.name} — URAWAKE Portfolio`,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const reset = () => {
        setForm({ name: "", email: "", message: "" });
        setStatus("idle");
    };

    return (
        <section className="contact-section" id="contact">

            {/* LEFT — decorative */}
            <div className="contact-left">
                <p className="contact-eyebrow mono">// Let's build something</p>
                <h2 className="contact-display">LET'S<br />TALK</h2>
                <p className="contact-email mono">daniel.sangronis1386@gmail.com</p>
                <p className="contact-brand mono">URAWAKE STACKHOUSE</p>
            </div>

            {/* RIGHT — form */}
            <div className="contact-right">
                <h2 className="contact-title">CONTACT</h2>

                {status === "success" ? (
                    <div className="contact-success">
                        <p className="contact-success-msg">
                            Message sent. I'll get back to you as soon as possible.
                        </p>
                        <button className="contact-reset mono" onClick={reset}>
                            // Send another
                        </button>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit} noValidate>

                        <div className="contact-field">
                            <label className="contact-label mono" htmlFor="name">
                                Name <span className="required">*</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="contact-input"
                                value={form.name}
                                onChange={handleChange}
                                disabled={status === "sending"}
                                required
                                autoComplete="name"
                            />
                        </div>

                        <div className="contact-field">
                            <label className="contact-label mono" htmlFor="email">
                                Email <span className="required">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="contact-input"
                                value={form.email}
                                onChange={handleChange}
                                disabled={status === "sending"}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="contact-field">
                            <label className="contact-label mono" htmlFor="message">
                                Message <span className="required">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="contact-input contact-textarea"
                                rows={6}
                                value={form.message}
                                onChange={handleChange}
                                disabled={status === "sending"}
                                required
                            />
                        </div>

                        <p className="contact-note mono">* denotes a required field</p>

                        {status === "error" && (
                            <p className="contact-error mono">
                                // There was a problem sending your message. Please try again.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="contact-submit"
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
                        </button>

                    </form>
                )}
            </div>

        </section>
    );
}

export default ContactSection;
