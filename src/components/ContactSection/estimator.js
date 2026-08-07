/* ===== LEAD ESTIMATOR: QUESTIONS + PRICING MODEL ===== */

export const STEPS = [
    {
        id: "projectType",
        type: "single",
        label: "01 / Project type",
        question: "WHAT TYPE OF PROJECT DO YOU NEED?",
        options: [
            { value: "landing",   label: "Landing Page",           price: 600  },
            { value: "business",  label: "Business Website",       price: 1200 },
            { value: "ecommerce", label: "E-commerce",             price: 2200 },
            { value: "crm",       label: "CRM / Dashboard",        price: 2800 },
            { value: "custom",    label: "Custom Web Application",  price: 3500 },
            { value: "other",     label: "Other",                  price: 1000 },
        ],
    },
    {
        id: "pages",
        type: "single",
        label: "02 / Scope",
        question: "HOW MANY PAGES?",
        options: [
            { value: "1",     label: "1",        price: 0    },
            { value: "2-5",   label: "2 to 5",   price: 400  },
            { value: "6-10",  label: "6 to 10",  price: 900  },
            { value: "10+",   label: "10+",      price: 1800 },
        ],
    },
    {
        id: "design",
        type: "single",
        label: "03 / Design",
        question: "DO YOU ALREADY HAVE A DESIGN?",
        options: [
            { value: "yes",      label: "Yes",                  price: 0   },
            { value: "no",       label: "No",                   price: 200 },
            { value: "included", label: "Need design included", price: 700 },
        ],
    },
    {
        id: "features",
        type: "multi",
        label: "04 / Features",
        question: "DO YOU NEED ANY OF THESE FEATURES?",
        hint: "Select all that apply, or skip.",
        options: [
            { value: "auth",     label: "Authentication",   price: 400 },
            { value: "booking",  label: "Booking System",   price: 600 },
            { value: "payments", label: "Payments",         price: 500 },
            { value: "admin",    label: "Admin Dashboard",  price: 900 },
            { value: "cms",      label: "CMS",              price: 500 },
            { value: "blog",     label: "Blog",             price: 300 },
            { value: "api",      label: "API Integrations", price: 500 },
            { value: "ai",       label: "AI Features",      price: 1100 },
        ],
    },
    {
        id: "timeline",
        type: "single",
        label: "05 / Timeline",
        question: "WHAT'S YOUR EXPECTED TIMELINE?",
        options: [
            { value: "asap",     label: "ASAP",           multiplier: 1.2  },
            { value: "month",    label: "Within a month", multiplier: 1.05 },
            { value: "quarter",  label: "2 to 3 months",  multiplier: 1    },
            { value: "flexible", label: "Flexible",       multiplier: 0.95 },
        ],
    },
];

const round50 = (n) => Math.round(n / 50) * 50;

const findOption = (stepId, value) =>
    STEPS.find((s) => s.id === stepId)?.options.find((o) => o.value === value);

/**
 * Turns the collected answers into a ballpark range.
 * Base + scope + design + features, scaled by timeline urgency,
 * then spread into a -10% / +15% range.
 */
export function calculateEstimate(answers) {
    let base = 0;

    for (const id of ["projectType", "pages", "design"]) {
        base += findOption(id, answers[id])?.price ?? 0;
    }

    for (const feature of answers.features ?? []) {
        base += findOption("features", feature)?.price ?? 0;
    }

    const multiplier = findOption("timeline", answers.timeline)?.multiplier ?? 1;
    const total = base * multiplier;

    return {
        low: round50(total * 0.9),
        high: round50(total * 1.15),
    };
}

export const formatPrice = (n) => `$${n.toLocaleString("en-US")}`;

/** Human-readable answer summary, shown on the result card and emailed as the lead. */
export function summarizeAnswers(answers) {
    return STEPS.map((step) => {
        const value = answers[step.id];
        const text =
            step.type === "multi"
                ? (value ?? []).map((v) => findOption(step.id, v)?.label).filter(Boolean).join(", ") || "None"
                : findOption(step.id, value)?.label ?? "Not answered";

        return { id: step.id, question: step.question, answer: text };
    });
}
