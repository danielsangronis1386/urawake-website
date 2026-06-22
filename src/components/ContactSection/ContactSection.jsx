import { useState } from "react";
import "./ContactSection.css";

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
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok && data.success) {
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

            <div className="section-label-vertical">CONTACT</div>

            <div className="contact-body">

            {/* CTA — fills empty space above form */}
            <div className="contact-cta">
                <p className="contact-cta-text">YOUR NEXT PROJECT STARTS HERE. LET'S BUILD SOMETHING THAT WORKS.</p>
                <svg className="contact-cta-arrow" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#000" strokeWidth="16" strokeLinecap="square"/>
                    <polyline points="15,70 50,110 85,70" fill="none" stroke="#000" strokeWidth="16" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
            </div>

            <div className="contact-form-row">
            {/* LEFT — decorative */}
            <div className="contact-left">
                <p className="contact-eyebrow mono">// Get in touch</p>
                <h2 className="contact-display">LET'S<br />TALK</h2>
                <p className="contact-intro">
                    If you'd like to make an inquiry, feel free to get in touch using the form and I will respond as soon as possible.
                </p>
                <p className="contact-intro">
                    If you prefer to contact me directly, send your email to{" "}
                    <a href="mailto:info@urawake.dev" className="contact-email-link">info@urawake.dev</a>
                </p>
                <p className="contact-brand mono">URAWAKE STACKHOUSE</p>
            </div>

            {/* RIGHT — form */}
            <div className="contact-right">

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
            </div>{/* contact-form-row */}

            </div>{/* contact-body */}

        </section>
    );
}

export default ContactSection;
