const CASE_STUDIES = [
    {
        slug: "eliots-adventures",
        title: "Eliot's Adventures",
        metaTitle: "Eliot's Adventures Case Study — Full-Stack Tour Booking System | URAWAKE",
        metaDescription: "How URAWAKE built a complete tour booking website and CRM for a Puerto Rico tour operator — 121 bookings, $22,399 revenue, and 20 hours/month automated from zero online presence.",
        subtitle: "From zero online presence to 121 bookings and $22,399 in revenue",
        industry: "Tourism & Hospitality",
        location: "Puerto Rico",
        duration: "4 months (Feb – Jun 2026)",
        liveUrl: "https://www.eliotsadventures.com/",
        stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Stripe", "Gmail API", "Heroku", "PDFKit"],
        metrics: [
            { label: "Total bookings", value: "121" },
            { label: "Revenue processed", value: "$22,399" },
            { label: "Unique customers", value: "119" },
            { label: "Hours/month automated", value: "~20" },
            { label: "Waivers digitized", value: "133" },
            { label: "Commits", value: "389" },
        ],
        sections: [
            {
                heading: "The client",
                body: `Eliot's Adventures is a husband-and-wife tour operation in Puerto Rico with over 15 years of local expertise. They run guided tours, airport and cruise port transfers, and ferry taxi services across the island. Before this project, every booking came in through a phone call or a WhatsApp message — manually tracked, manually followed up, manually collected.

They had no website, no logo, no online booking system, and no way to take a payment online. Everything ran on the owners' memory and their phones.`,
            },
            {
                heading: "The problem",
                body: `The manual process had a ceiling. Every new booking required a back-and-forth conversation to confirm details, collect payment information, and send a waiver. Tour listings existed only as photos shared on Instagram. Airbnb and Viator bookings had to be read from confirmation emails and manually entered into a spreadsheet.

There was no customer history. No analytics. No way to know which tours were driving revenue, which customers were repeat visitors, or how many waivers were still unsigned the morning of a tour.

The business was working. The system holding it together was not.`,
            },
            {
                heading: "What we built",
                body: `We built two connected systems: a public-facing website and an internal CRM — both designed from scratch.

**The public website (eliotsadventures.com)** launched with 9 fully detailed tour pages, each with pricing, itineraries, photos, and reviews. Customers can book and pay directly through Stripe. Airport, cruise port, and ferry transfers are bookable the same way. Digital waivers are sent via QR code and completed online before the tour date. An SEO-optimized blog (5 posts, markdown-based) drives organic traffic. The site is prerendered for performance and includes full schema.org structured data.

**The admin CRM panel** is where the real automation lives. The booking calendar shows the full lifecycle of every reservation — confirmed, cancelled, rescheduled, no-show, paid. Customer profiles track history and notes across every interaction. A Gmail inbox syncs every 5 minutes and parses incoming emails automatically: when an Airbnb or Viator confirmation email arrives, a booking is created in the system. When a cancellation arrives, the booking is cancelled. What used to take 15 minutes of manual entry now takes zero.

Staff accounts with JWT authentication let multiple team members access the system. Revenue and booking analytics give the owners a live view of their business. Promo codes, quote generation with PDF export, and a waiver tracking dashboard round out the platform.`,
            },
            {
                heading: "The results",
                body: `In production since launch, the platform has processed 121 bookings from 119 unique customers — $22,399 in revenue run entirely through the system. May 2026 alone saw 83 bookings. 133 digital waivers have been created, with 98 signed (74% completion rate).

The manual time savings are material. At 83 bookings per month, with an estimated 15 minutes of manual intake, follow-up, and entry per booking, the automation accounts for roughly 20 hours per month returned to the owners. Airbnb and Viator email parsing and automatic waiver collection add further savings that are harder to quantify but immediately visible in their day-to-day.

The business went from zero online presence to a fully operational booking system in 4 months across 389 commits.`,
            },
            {
                heading: "Key integrations",
                body: `**Stripe** handles all payment processing — tour bookings, transfers, and future use cases. **Gmail API** powers the inbox sync that auto-creates and auto-cancels bookings from Airbnb and Viator emails. **PDFKit** generates quote PDFs on demand. **QR codes** are generated dynamically for each waiver and tracked through completion. The entire backend runs on Heroku with a PostgreSQL database managed through Prisma.`,
            },
        ],
    },
];

export default CASE_STUDIES;
