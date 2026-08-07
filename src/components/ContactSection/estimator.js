/* ===== LEAD ESTIMATOR: BRANCHING PATHS BY PROJECT TYPE ===== */

// After projectType is selected, this determines the question sequence
export const PATHS = {
    landing:   ["projectType", "landing_goal",      "design", "landing_features",  "timeline"],
    business:  ["projectType", "business_pages",    "design", "business_features", "timeline"],
    ecommerce: ["projectType", "ecommerce_products","design", "ecommerce_features","timeline"],
    crm:       ["projectType", "crm_users",         "crm_manages", "crm_features", "timeline"],
    custom:    ["projectType", "custom_type",        "design", "custom_features",  "timeline"],
    other:     ["projectType", "business_pages",    "design", "business_features", "timeline"],
};

export const STEPS = {
    projectType: {
        id: "projectType",
        label: "01 / Project type",
        question: "WHAT TYPE OF PROJECT DO YOU NEED?",
        type: "single",
        options: [
            { value: "landing",   label: "Landing Page",            price: 350  },
            { value: "business",  label: "Business Website",        price: 700  },
            { value: "ecommerce", label: "E-commerce Store",        price: 1400 },
            { value: "crm",       label: "CRM / Dashboard",         price: 1800 },
            { value: "custom",    label: "Custom Web Application",  price: 2200 },
            { value: "other",     label: "Other",                   price: 600  },
        ],
    },

    // ── LANDING PAGE ──
    landing_goal: {
        id: "landing_goal",
        label: "02 / Goal",
        question: "WHAT'S THE MAIN GOAL OF THIS PAGE?",
        type: "single",
        options: [
            { value: "leads",       label: "Capture leads",        price: 0   },
            { value: "product",     label: "Showcase a product",   price: 100 },
            { value: "event",       label: "Promote an event",     price: 0   },
            { value: "appointment", label: "Book appointments",    price: 200 },
        ],
    },
    landing_features: {
        id: "landing_features",
        label: "04 / Extras",
        question: "DO YOU NEED ANY OF THESE?",
        hint: "Select all that apply, or skip.",
        type: "multi",
        options: [
            { value: "form",        label: "Contact / lead form",  price: 150 },
            { value: "video",       label: "Video background",     price: 200 },
            { value: "newsletter",  label: "Email newsletter",     price: 150 },
            { value: "analytics",   label: "Analytics setup",      price: 100 },
            { value: "multilang",   label: "Spanish + English",    price: 300 },
        ],
    },

    // ── BUSINESS WEBSITE ──
    business_pages: {
        id: "business_pages",
        label: "02 / Scope",
        question: "HOW MANY PAGES DO YOU NEED?",
        type: "single",
        options: [
            { value: "2-5",  label: "2 to 5 pages",  price: 200 },
            { value: "6-10", label: "6 to 10 pages", price: 500 },
            { value: "10+",  label: "More than 10",  price: 900 },
        ],
    },
    business_features: {
        id: "business_features",
        label: "04 / Features",
        question: "WHAT DO YOU NEED ON THE SITE?",
        hint: "Select all that apply, or skip.",
        type: "multi",
        options: [
            { value: "blog",       label: "Blog",                  price: 200 },
            { value: "cms",        label: "Content management",    price: 350 },
            { value: "booking",    label: "Booking / scheduling",  price: 450 },
            { value: "gallery",    label: "Gallery or portfolio",  price: 150 },
            { value: "multilang",  label: "Spanish + English",     price: 300 },
            { value: "payments",   label: "Payments",              price: 350 },
        ],
    },

    // ── E-COMMERCE ──
    ecommerce_products: {
        id: "ecommerce_products",
        label: "02 / Catalog",
        question: "HOW MANY PRODUCTS WILL YOU SELL?",
        type: "single",
        options: [
            { value: "1-20",  label: "1 to 20",   price: 0   },
            { value: "21-100",label: "21 to 100", price: 300 },
            { value: "100+",  label: "100+",      price: 700 },
        ],
    },
    ecommerce_features: {
        id: "ecommerce_features",
        label: "04 / Features",
        question: "WHAT DOES YOUR STORE NEED?",
        hint: "Select all that apply, or skip.",
        type: "multi",
        options: [
            { value: "inventory",   label: "Inventory management", price: 400 },
            { value: "discounts",   label: "Discount codes",       price: 200 },
            { value: "reviews",     label: "Reviews",              price: 150 },
            { value: "subscriptions", label: "Subscriptions",      price: 500 },
            { value: "multilang",   label: "Spanish + English",    price: 300 },
            { value: "analytics",   label: "Sales analytics",      price: 250 },
        ],
    },

    // ── CRM / DASHBOARD ──
    crm_users: {
        id: "crm_users",
        label: "02 / Team size",
        question: "HOW MANY PEOPLE WILL USE IT?",
        type: "single",
        options: [
            { value: "1-5",  label: "1 to 5",   price: 0   },
            { value: "6-20", label: "6 to 20",  price: 400 },
            { value: "20+",  label: "More than 20", price: 900 },
        ],
    },
    crm_manages: {
        id: "crm_manages",
        label: "03 / What to manage",
        question: "WHAT DO YOU NEED TO MANAGE?",
        hint: "Select all that apply.",
        type: "multi",
        options: [
            { value: "leads",      label: "Leads / prospects",    price: 300 },
            { value: "bookings",   label: "Bookings / orders",    price: 400 },
            { value: "customers",  label: "Customer records",     price: 250 },
            { value: "inventory",  label: "Inventory",            price: 350 },
            { value: "campaigns",  label: "Email campaigns",      price: 450 },
        ],
    },
    crm_features: {
        id: "crm_features",
        label: "04 / Integrations",
        question: "DO YOU NEED ANY INTEGRATIONS?",
        hint: "Select all that apply, or skip.",
        type: "multi",
        options: [
            { value: "email",     label: "Gmail / email sync",   price: 350 },
            { value: "stripe",    label: "Stripe payments",      price: 300 },
            { value: "reporting", label: "Reports and charts",   price: 400 },
            { value: "whatsapp",  label: "WhatsApp",             price: 300 },
            { value: "api",       label: "Other API connections",price: 400 },
        ],
    },

    // ── CUSTOM APP ──
    custom_type: {
        id: "custom_type",
        label: "02 / App type",
        question: "WHAT KIND OF APPLICATION?",
        type: "single",
        options: [
            { value: "saas",      label: "SaaS tool",            price: 500 },
            { value: "marketplace", label: "Marketplace",        price: 800 },
            { value: "booking",   label: "Booking platform",     price: 600 },
            { value: "internal",  label: "Internal tool",        price: 300 },
        ],
    },
    custom_features: {
        id: "custom_features",
        label: "04 / Core features",
        question: "WHAT DOES IT NEED?",
        hint: "Select all that apply, or skip.",
        type: "multi",
        options: [
            { value: "auth",      label: "User authentication",  price: 300 },
            { value: "payments",  label: "Payments",             price: 350 },
            { value: "realtime",  label: "Real-time updates",    price: 500 },
            { value: "ai",        label: "AI features",          price: 700 },
            { value: "api",       label: "API integrations",     price: 350 },
            { value: "admin",     label: "Admin panel",          price: 550 },
        ],
    },

    // ── SHARED ──
    design: {
        id: "design",
        label: "03 / Design",
        question: "DO YOU ALREADY HAVE A DESIGN?",
        type: "single",
        options: [
            { value: "yes",      label: "Yes, I have one",       price: 0   },
            { value: "no",       label: "No, but I have ideas",  price: 150 },
            { value: "included", label: "Need full design",      price: 450 },
        ],
    },
    timeline: {
        id: "timeline",
        label: "05 / Timeline",
        question: "WHAT'S YOUR EXPECTED TIMELINE?",
        type: "single",
        options: [
            { value: "asap",     label: "ASAP",            multiplier: 1.2  },
            { value: "month",    label: "Within a month",  multiplier: 1.05 },
            { value: "quarter",  label: "2 to 3 months",   multiplier: 1    },
            { value: "flexible", label: "Flexible",        multiplier: 0.95 },
        ],
    },
};

const round50 = (n) => Math.round(n / 50) * 50;

export function calculateEstimate(answers, path) {
    let base = 0;

    for (const stepId of path) {
        const step = STEPS[stepId];
        if (!step) continue;
        const val = answers[stepId];
        if (!val) continue;

        if (step.type === "multi") {
            for (const v of (Array.isArray(val) ? val : [])) {
                base += step.options.find((o) => o.value === v)?.price ?? 0;
            }
        } else {
            const opt = step.options.find((o) => o.value === val);
            if (opt?.price) base += opt.price;
        }
    }

    const timelineOpt = STEPS.timeline.options.find((o) => o.value === answers.timeline);
    const multiplier = timelineOpt?.multiplier ?? 1;
    const total = base * multiplier;

    return {
        low:  round50(total * 0.9),
        high: round50(total * 1.15),
    };
}

export const formatPrice = (n) => `$${n.toLocaleString("en-US")}`;

export function summarizeAnswers(answers, path) {
    return path.map((stepId) => {
        const step = STEPS[stepId];
        if (!step) return null;
        const val = answers[stepId];
        const text =
            step.type === "multi"
                ? (Array.isArray(val) ? val : []).map((v) => step.options.find((o) => o.value === v)?.label).filter(Boolean).join(", ") || "None"
                : step.options.find((o) => o.value === val)?.label ?? "Not answered";
        return { id: stepId, question: step.question, answer: text };
    }).filter(Boolean);
}
