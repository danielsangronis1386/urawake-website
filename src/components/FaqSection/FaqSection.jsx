import FAQ from "../../data/faq";
import "./FaqSection.css";

/* Native <details>: every answer is in the HTML for crawlers whether or not
   it's open, and it needs no JS to work. */
function FaqSection() {
    return (
        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
            <p className="faq-eyebrow mono">Before you ask</p>
            <h2 id="faq-heading" className="faq-title">FAQ</h2>
            <div className="faq-list">
                {FAQ.map(({ q, a }) => (
                    <details key={q} className="faq-item">
                        <summary className="faq-q">
                            <span className="faq-q-text">{q}</span>
                            <span className="faq-icon mono" aria-hidden="true">+</span>
                        </summary>
                        <p className="faq-a">{a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}

export default FaqSection;
