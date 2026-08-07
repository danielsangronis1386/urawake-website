import { useState } from "react";
import { PATHS, STEPS, calculateEstimate, formatPrice, summarizeAnswers } from "./estimator";
import "./LeadEstimator.css";

const emptyLead = { name: "", email: "", phone: "", company: "" };

function LeadEstimator() {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [lead, setLead] = useState(emptyLead);
    const [status, setStatus] = useState("idle");
    const [direction, setDirection] = useState("forward");
    const [path, setPath] = useState(["projectType"]);

    const onGate = stepIndex === path.length;
    const revealed = status === "done";
    const currentStepId = path[stepIndex];
    const step = STEPS[currentStepId];
    const progress = Math.round((Math.min(stepIndex, path.length) / path.length) * 100);

    const goTo = (index, dir) => {
        setDirection(dir);
        setStepIndex(index);
    };

    const selectSingle = (value) => {
        const newAnswers = { ...answers, [step.id]: value };
        setAnswers(newAnswers);

        // After projectType, lock in the path
        if (step.id === "projectType") {
            const newPath = PATHS[value] ?? PATHS.other;
            setPath(newPath);
        }

        setDirection("forward");
        setStepIndex(stepIndex + 1);
    };

    const toggleMulti = (value) => {
        const current = Array.isArray(answers[step.id]) ? answers[step.id] : [];
        setAnswers((prev) => ({
            ...prev,
            [step.id]: current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value],
        }));
    };

    const back = () => {
        if (stepIndex > 0) goTo(stepIndex - 1, "back");
    };

    const handleLeadChange = (e) => {
        setLead((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("sending");

        const estimate = calculateEstimate(answers, path);
        const summary = summarizeAnswers(answers, path);

        const body = [
            `New estimate request from urawake.dev`,
            ``,
            `NAME: ${lead.name}`,
            `EMAIL: ${lead.email}`,
            lead.phone ? `PHONE: ${lead.phone}` : null,
            lead.company ? `COMPANY: ${lead.company}` : null,
            ``,
            `ESTIMATE: ${formatPrice(estimate.low)} to ${formatPrice(estimate.high)}`,
            ``,
            ...summary.map((r) => `${r.question}\n${r.answer}`),
        ].filter((l) => l !== null).join("\n");

        const mailto = `mailto:info@urawake.dev?subject=${encodeURIComponent(`New Project Estimate — ${lead.name}`)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        setStatus("done");
    };

    const restart = () => {
        setAnswers({});
        setLead(emptyLead);
        setStatus("idle");
        setPath(["projectType"]);
        goTo(0, "back");
    };

    if (revealed) {
        const { low, high } = calculateEstimate(answers, path);

        return (
            <div className="est" data-state="result">
                <div className="est-result est-anim-forward">
                    <p className="est-eyebrow mono">// Estimated investment</p>

                    <p className="est-price">
                        {formatPrice(low)} <span className="est-price-sep">to</span> {formatPrice(high)}
                    </p>

                    <ul className="est-summary">
                        {summarizeAnswers(answers, path).map((row) => (
                            <li key={row.id} className="est-summary-row">
                                <span className="est-summary-q mono">{row.question}</span>
                                <span className="est-summary-a">{row.answer}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="est-disclaimer">
                        This is an estimated price based on your answers. A final quote will be provided
                        after discussing your project.
                    </p>

                    <p className="est-note mono">
                        // Your email client opened with this estimate pre-filled. Hit send and we will follow up.
                    </p>

                    <button type="button" className="est-reset mono" onClick={restart}>
                        // Start over
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="est">
            <div className="est-progress">
                <div className="est-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <div className="est-meta">
                <span className="mono">{onGate ? `0${path.length + 1} / Your details` : step?.label}</span>
                <span className="mono">
                    {Math.min(stepIndex + 1, path.length + 1)} / {path.length + 1}
                </span>
            </div>

            <div className={`est-stage est-anim-${direction}`} key={onGate ? "gate" : currentStepId}>
                {onGate ? (
                    <form className="est-form" onSubmit={handleSubmit} noValidate>
                        <h3 className="est-question">YOUR ESTIMATE IS READY.</h3>
                        <p className="est-hint">
                            Enter your details to unlock your personalized project estimate.
                        </p>

                        <div className="est-field">
                            <label className="est-label mono" htmlFor="est-name">
                                Full Name <span aria-hidden="true">*</span>
                            </label>
                            <input
                                id="est-name" name="name" type="text" required
                                className="est-input" autoComplete="name"
                                value={lead.name} onChange={handleLeadChange}
                                disabled={status === "sending"}
                            />
                        </div>

                        <div className="est-field">
                            <label className="est-label mono" htmlFor="est-email">
                                Email <span aria-hidden="true">*</span>
                            </label>
                            <input
                                id="est-email" name="email" type="email" required
                                className="est-input" autoComplete="email"
                                value={lead.email} onChange={handleLeadChange}
                                disabled={status === "sending"}
                            />
                        </div>

                        <div className="est-field-row">
                            <div className="est-field">
                                <label className="est-label mono" htmlFor="est-phone">
                                    Phone <span className="est-optional">(optional)</span>
                                </label>
                                <input
                                    id="est-phone" name="phone" type="tel"
                                    className="est-input" autoComplete="tel"
                                    value={lead.phone} onChange={handleLeadChange}
                                    disabled={status === "sending"}
                                />
                            </div>

                            <div className="est-field">
                                <label className="est-label mono" htmlFor="est-company">
                                    Company <span className="est-optional">(optional)</span>
                                </label>
                                <input
                                    id="est-company" name="company" type="text"
                                    className="est-input" autoComplete="organization"
                                    value={lead.company} onChange={handleLeadChange}
                                    disabled={status === "sending"}
                                />
                            </div>
                        </div>

                        <div className="est-actions">
                            <button type="button" className="est-back mono" onClick={back}>
                                ← Back
                            </button>
                            <button type="submit" className="est-submit" disabled={status === "sending"}>
                                {status === "sending" ? "OPENING..." : "UNLOCK MY ESTIMATE"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h3 className="est-question">{step.question}</h3>
                        {step.hint && <p className="est-hint">{step.hint}</p>}

                        <div className={`est-options ${step.type === "multi" ? "est-options-multi" : ""}`}>
                            {step.options.map((option, i) => {
                                const val = answers[step.id];
                                const selected =
                                    step.type === "multi"
                                        ? (Array.isArray(val) ? val : []).includes(option.value)
                                        : val === option.value;

                                return (
                                    <button
                                        type="button"
                                        key={option.value}
                                        className="est-option"
                                        aria-pressed={selected}
                                        data-selected={selected}
                                        style={{ "--i": i }}
                                        onClick={() =>
                                            step.type === "multi"
                                                ? toggleMulti(option.value)
                                                : selectSingle(option.value)
                                        }
                                    >
                                        <span className="est-option-check" aria-hidden="true" />
                                        <span className="est-option-label">{option.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="est-actions">
                            <button
                                type="button"
                                className="est-back mono"
                                onClick={back}
                                disabled={stepIndex === 0}
                            >
                                ← Back
                            </button>

                            {step.type === "multi" && (
                                <button
                                    type="button"
                                    className="est-submit"
                                    onClick={() => goTo(stepIndex + 1, "forward")}
                                >
                                    {(Array.isArray(answers[step.id]) && answers[step.id].length) ? "CONTINUE" : "SKIP"}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default LeadEstimator;
