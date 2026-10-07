import LeadEstimator from "./LeadEstimator";
import "./ContactSection.css";

function ContactSection() {
    return (
        <section className="contact-section" id="contact">

            <div className="section-label-vertical">CONTACT</div>

            <div className="contact-body">

            {/* CTA above the estimator */}
            <div className="contact-cta">
                <p className="contact-cta-text">GET AN INSTANT PROJECT ESTIMATE.</p>
                <svg className="contact-cta-arrow" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35,0 Q35,0 35,8 L35,58 L12,58 Q4,58 4,65 Q4,70 10,76 L46,112 Q50,116 54,112 L90,76 Q96,70 96,65 Q96,58 88,58 L65,58 L65,8 Q65,0 58,0 Z" fill="#000"/>
                </svg>
            </div>

            <div className="contact-form-row">
            {/* LEFT: intro */}
            <div className="contact-left">
                <h2 className="contact-display">HOW<br />MUCH?</h2>
                <p className="contact-intro">
                    Answer five questions and get a ballpark price range for your project.
                    No back-and-forth, no waiting on a quote.
                </p>
                <p className="contact-intro">
                    Rather talk it through? Email me at{" "}
                    <a href="mailto:info@urawake.dev" className="contact-email-link">info@urawake.dev</a>
                </p>
            </div>

            {/* RIGHT: estimator */}
            <div className="contact-right">
                <LeadEstimator />
            </div>
            </div>{/* contact-form-row */}

            </div>{/* contact-body */}

        </section>
    );
}

export default ContactSection;
