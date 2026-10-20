import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TESTIMONIAL_INVITES from "../../data/testimonialInvites";
import "./TestimonialPage.css";

const QUOTE_MAX = 1500;

/* Private page, one per client. What they send is emailed to us for review;
   nothing here publishes to the site on its own. */
function TestimonialPage() {
    const { slug } = useParams();
    const invite = TESTIMONIAL_INVITES[slug];

    const [form, setForm] = useState({ name: "", role: "", quote: "", credit: "full", website: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    if (!invite) {
        return (
            <div className="tm-page">
                <Navbar logoOnly />
                <main className="tm-container">
                    <p className="tm-eyebrow mono">Link not found</p>
                    <h1 className="tm-title">This testimonial link doesn't exist.</h1>
                    <p className="tm-lede">
                        Check the link you were sent, or email{" "}
                        <a href="mailto:info@urawake.dev" className="tm-link">info@urawake.dev</a>.
                    </p>
                </main>
            </div>
        );
    }

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/testimonial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug, ...form }),
            });
            setStatus(res.ok ? "sent" : "error");
        } catch {
            setStatus("error");
        }
    }

    if (status === "sent") {
        return (
            <div className="tm-page">
                <Navbar logoOnly />
                <main className="tm-container">
                    <p className="tm-eyebrow mono">Received</p>
                    <h1 className="tm-title">Thank you.</h1>
                    <p className="tm-lede">
                        We got it. We'll show you how it looks before it goes live on urawake.dev.
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="tm-page">
            <Navbar logoOnly />
            <main className="tm-container">
                <p className="tm-eyebrow mono">{invite.client}</p>
                <h1 className="tm-title">How was it working with us?</h1>
                <p className="tm-lede">
                    A few honest sentences about {invite.project} help other business owners
                    decide whether to work with us. What changed for you? What would you tell
                    someone thinking about hiring us?
                </p>

                <form className="tm-form" onSubmit={handleSubmit}>
                    <label className="tm-field">
                        <span className="tm-label mono">Your name *</span>
                        <input
                            className="tm-input"
                            type="text"
                            required
                            maxLength={120}
                            autoComplete="name"
                            value={form.name}
                            onChange={update("name")}
                        />
                    </label>

                    <label className="tm-field">
                        <span className="tm-label mono">Your role</span>
                        <input
                            className="tm-input"
                            type="text"
                            maxLength={120}
                            placeholder={`Owner, ${invite.client}`}
                            value={form.role}
                            onChange={update("role")}
                        />
                    </label>

                    <label className="tm-field">
                        <span className="tm-label mono">Your testimonial *</span>
                        <textarea
                            className="tm-input tm-textarea"
                            required
                            rows={7}
                            maxLength={QUOTE_MAX}
                            value={form.quote}
                            onChange={update("quote")}
                        />
                        <span className="tm-count mono">{form.quote.length} / {QUOTE_MAX}</span>
                    </label>

                    <fieldset className="tm-field tm-credit">
                        <legend className="tm-label mono">Show it on the site as</legend>
                        {[
                            ["full", "Full name and business"],
                            ["first", "First name and business"],
                            ["business", "Business name only"],
                        ].map(([value, label]) => (
                            <label key={value} className="tm-radio">
                                <input
                                    type="radio"
                                    name="credit"
                                    value={value}
                                    checked={form.credit === value}
                                    onChange={update("credit")}
                                />
                                <span>{label}</span>
                            </label>
                        ))}
                    </fieldset>

                    {/* Honeypot: hidden from people, irresistible to bots. */}
                    <input
                        className="tm-hp"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        value={form.website}
                        onChange={update("website")}
                    />

                    {status === "error" && (
                        <p className="tm-error" role="alert">
                            That didn't go through. Try again, or email it to{" "}
                            <a href="mailto:info@urawake.dev" className="tm-link">info@urawake.dev</a>.
                        </p>
                    )}

                    <button className="tm-submit" type="submit" disabled={status === "sending"}>
                        {status === "sending" ? "Sending…" : "Send testimonial →"}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default TestimonialPage;
