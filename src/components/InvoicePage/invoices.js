const INVOICES = {
    "tourstodo": {
        invoiceNumber: "INV-2026-001",
        issued: "August 3, 2026",
        due: "August 3, 2026",
        client: {
            name: "ToursToDo PR",
            contact: "ToursToDo Operations Team",
        },
        from: {
            name: "URAWAKE Stackhouse",
            email: "info@urawake.dev",
            web: "urawake.dev",
        },
        lineItems: [
            {
                description: "Hosting + Maintenance",
                period: "Dec 10, 2025 → Aug 3, 2026",
                months: 8,
                rate: 15,
                total: 120.00,
            },
        ],
        total: 120.00,
    },
    "eliots-adventures": {
        invoiceNumber: "INV-2026-002",
        issued: "August 3, 2026",
        due: "August 3, 2026",
        client: {
            name: "Eliot's Adventures",
            contact: "Eliot's Adventures Operations Team",
        },
        from: {
            name: "URAWAKE Stackhouse",
            email: "info@urawake.dev",
            web: "urawake.dev",
        },
        lineItems: [
            {
                description: "Hosting + Maintenance",
                period: "Mar 20, 2026 → Aug 3, 2026",
                months: 4.5,
                rate: 15,
                total: 67.50,
            },
        ],
        total: 67.50,
    },
};

export default INVOICES;
