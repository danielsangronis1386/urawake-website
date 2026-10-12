import "./ProblemSection.css";

/* The week a small business owner describes before they hire us, in their
   own words. Kept industry-neutral on purpose: tourism is our proof, not the
   only kind of client we take. */
const PROBLEMS = [
    "Orders come in through Instagram DMs and I track them by hand.",
    "My online store is a template that doesn't fit how I sell.",
    "I have hundreds of customers and no way to email them.",
    "Every booking is a back-and-forth email I answer by hand.",
];

function ProblemSection() {
    return (
        <section className="problem-section" aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="problem-eyebrow mono">Sound familiar?</h2>
            <ul className="problem-list">
                {PROBLEMS.map((line) => (
                    <li key={line} className="problem-line">“{line}”</li>
                ))}
            </ul>
            <p className="problem-answer mono">
                We build the system that takes that off your plate. Here's the proof ↓
            </p>
        </section>
    );
}

export default ProblemSection;
