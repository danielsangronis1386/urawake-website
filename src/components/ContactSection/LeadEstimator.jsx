import { useState } from "react";
import { PATHS, STEPS, calculateEstimate, formatPrice, summarizeAnswers } from "./estimator";
import "./LeadEstimator.css";

function LeadEstimator() {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [direction, setDirection] = useState("forward");
    const [path, setPath] = useState(["projectType"]);
    const [copied, setCopied] = useState(false);

    const done = stepIndex === path.length;
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

    const restart = () => {
        setAnswers({});
        setPath(["projectType"]);
        setCopied(false);
        goTo(0, "back");
    };

    const buildText = (estimate, summary) => [
        `URAWAKE STACKHOUSE — Project Estimate`,
        ``,
        `Estimated investment: ${formatPrice(estimate.low)} to ${formatPrice(estimate.high)}`,
        ``,
        ...summary.map((r) => `${r.question}\n${r.answer}`),
        ``,
        `This is a ballpark range. Final quote after a quick call.`,
        `info@urawake.dev`,
    ].join("\n");

    const handleCopy = (estimate, summary) => {
        const text = buildText(estimate, summary);
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    const handleEmail = (estimate, summary) => {
        const text = buildText(estimate, summary);
        const mailto = `mailto:info@urawake.dev?subject=${encodeURIComponent("New Project Estimate — urawake.dev")}&body=${encodeURIComponent(text)}`;
        window.location.href = mailto;
    };

    if (done) {
        const estimate = calculateEstimate(answers, path);
        const summary = summarizeAnswers(answers, path);

        return (
            <div className="est" data-state="result">
                <div className="est-result est-anim-forward">
                    <p className="est-eyebrow mono">// Estimated investment</p>

                    <p className="est-price">
                        {formatPrice(estimate.low)} <span className="est-price-sep">to</span> {formatPrice(estimate.high)}
                    </p>

                    <ul className="est-summary">
                        {summary.map((row) => (
                            <li key={row.id} className="est-summary-row">
                                <span className="est-summary-q mono">{row.question}</span>
                                <span className="est-summary-a">{row.answer}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="est-disclaimer">
                        This is a ballpark range based on your answers. Final quote after a quick call.
                    </p>

                    <div className="est-result-actions">
                        <button
                            type="button"
                            className="est-submit"
                            onClick={() => handleCopy(estimate, summary)}
                        >
                            {copied ? "COPIED!" : "COPY ESTIMATE"}
                        </button>
                        <button
                            type="button"
                            className="est-submit est-submit--outline"
                            onClick={() => handleEmail(estimate, summary)}
                        >
                            SEND VIA EMAIL
                        </button>
                    </div>

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
                <span className="mono">{step?.label}</span>
                <span className="mono">{stepIndex + 1} / {path.length}</span>
            </div>

            <div className={`est-stage est-anim-${direction}`} key={currentStepId}>
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
            </div>
        </div>
    );
}

export default LeadEstimator;
