const CASE_STUDIES = [
    {
        slug: "eliots-adventures",
        title: "Eliot's Adventures",
        titleLabelWords: 0,
        metaTitle: "Eliot's Adventures Case Study — Full-Stack Tour Booking System | URAWAKE",
        metaDescription: "How URAWAKE built a complete tour booking website and CRM for a Puerto Rico tour operator — 100+ bookings, ~20 hours/month automated, from zero online presence.",
        subtitle: "From zero online presence to a fully operational tour booking system in 4 months.",
        industry: "Tourism & Hospitality",
        location: "Puerto Rico",
        duration: "4 months (Feb – Jun 2026)",
        liveUrl: "https://www.eliotsadventures.com/",
        stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Stripe", "Gmail API", "Heroku", "PDFKit"],
        metrics: [
            { label: "Bookings in first 4 months", value: "100+" },
            { label: "Unique customers", value: "100+" },
            { label: "Hours/month automated", value: "~20" },
            { label: "Waivers digitized", value: "130+" },
            { label: "Commits", value: "389" },
        ],
        sections: [
            {
                heading: "The client",
                body: `Eliot's Adventures is a husband-and-wife tour operation in Puerto Rico with over 15 years of local expertise. They run guided tours, airport and cruise port transfers, and ferry taxi services across the island. Before this project, every booking came in through a phone call or a WhatsApp message, manually tracked, manually followed up, manually collected.

They had no website, no logo, no online booking system, and no way to take a payment online. Everything ran on the owners' memory and their phones.`,
            },
            {
                heading: "The problem",
                body: `The manual process had a ceiling. Every new booking required a back-and-forth conversation to confirm details, collect payment information, and send a waiver. Tour listings existed only as photos shared on Instagram. Airbnb and Viator bookings had to be read from confirmation emails and manually entered into a spreadsheet.

There was no customer history, no analytics, no way to know which tours were driving revenue, which customers were repeat visitors, or how many waivers were still unsigned the morning of a tour.

The business was working. The system holding it together was not.`,
            },
            {
                heading: "What we built",
                body: `We built two connected systems: a public-facing website and an internal CRM, both designed from scratch.

The public website launched with 9 fully detailed tour pages, each with pricing, itineraries, photos, and reviews. Customers can book and pay directly through Stripe. Airport, cruise port, and ferry transfers are bookable the same way. Digital waivers are sent via QR code and completed online before the tour date. An SEO-optimized blog drives organic traffic. The site is prerendered for performance and includes full structured data.

The admin CRM is where the real automation lives. The booking calendar shows the full lifecycle of every reservation: confirmed, cancelled, rescheduled, no-show, paid. Customer profiles track history and notes across every interaction. A Gmail inbox syncs every 5 minutes and parses incoming emails automatically. When an Airbnb or Viator confirmation arrives, a booking is created in the system. When a cancellation arrives, it is cancelled. What used to take 15 minutes of manual entry now takes zero.

Staff accounts with JWT authentication let multiple team members access the system. Booking analytics give the owners a live view of their business. Promo codes, quote generation with PDF export, and a waiver tracking dashboard round out the platform.`,
            },
            {
                heading: "The results",
                body: `In the first four months in production, the platform handled over 100 bookings from more than 100 unique customers, all processed online, all paid through Stripe, none requiring a phone call to confirm.

The manual time savings are real. With dozens of bookings per month at an estimated 15 minutes of manual intake, follow-up, and entry each, the automation accounts for roughly 20 hours per month returned to the owners. Airbnb and Viator email parsing and automatic waiver collection add further savings that are harder to quantify but immediately visible in their day-to-day.

The business went from zero online presence to a fully operational booking system in 4 months.`,
            },
            {
                heading: "Key integrations",
                body: `Stripe handles all payment processing for tour bookings and transfers. Gmail API powers the inbox sync that auto-creates and auto-cancels bookings from Airbnb and Viator emails. PDFKit generates quote PDFs on demand. QR codes are generated dynamically for each waiver and tracked through completion. The entire backend runs on Heroku with a PostgreSQL database managed through Prisma.`,
            },
        ],
    },
    {
        slug: "eliots-crm",
        title: "Eliot's Adventures CRM",
        titleLabelWords: 2,
        metaTitle: "Eliot's Adventures CRM Case Study — Custom Booking & Operations Platform | URAWAKE",
        metaDescription: "How URAWAKE built the internal operations platform behind Eliot's Adventures — Gmail inbox parsing, automatic Airbnb and Viator booking creation, waiver tracking, and a full booking calendar.",
        subtitle: "The operations engine behind the booking system — Gmail parsing, automated booking creation, waiver dashboard, and full customer history in one platform",
        industry: "Tourism & Hospitality",
        location: "Puerto Rico",
        duration: "4 months (Feb – Jun 2026)",
        liveUrl: null,
        stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Gmail API", "PDFKit", "JWT", "Heroku"],
        sections: [
            {
                heading: "The client",
                body: `Eliot's Adventures is a husband-and-wife tour operation in Puerto Rico. While the public website handles customer bookings and payments, the internal side of the business ran entirely on the owners' phones and memory.

Every confirmation email from Airbnb and Viator had to be read manually, copied into a spreadsheet, and tracked by hand. Waivers were physical paper. There was no customer history, no analytics, no way to know what was happening in the business without asking someone directly.`,
            },
            {
                heading: "The problem",
                body: `The manual intake process was the bottleneck. A booking from Airbnb arrives as a confirmation email. Someone reads it, extracts the details, creates a record, follows up with the customer, sends a waiver, tracks whether it came back. When it cancels, someone reads that email too, finds the record, and updates it.

Multiply that by dozens of bookings a month across multiple platforms and the math breaks down. The business was handling volume that the system was not built for.`,
            },
            {
                heading: "What we built",
                body: `We built a full internal operations platform alongside the public booking site.

The booking calendar shows every reservation in real time with its full lifecycle state: confirmed, cancelled, rescheduled, no-show, paid. Staff can create, edit, and manage bookings directly. Customer profiles track history, notes, and all past interactions across every tour and transfer.

The Gmail inbox syncs every 5 minutes. When an Airbnb confirmation email arrives, a booking is created automatically. When a Viator cancellation arrives, the booking is cancelled. What used to take 15 minutes of manual entry per booking now takes zero. Staff accounts with JWT authentication allow multiple team members to access the system with their own credentials.

Waivers are generated per booking and tracked through a dedicated dashboard. Quote generation with PDF export lets the team send professional estimates in seconds. Promo codes and booking analytics give the owners a live view of revenue, occupancy, and customer behavior.`,
            },
            {
                heading: "The results",
                body: `The manual intake process is gone. Every Airbnb and Viator booking enters the system automatically. Every cancellation is handled the same way. The owners no longer spend time reading confirmation emails and copying details into a spreadsheet.

With dozens of bookings per month at roughly 15 minutes of manual intake each, the automation returns approximately 20 hours per month to the operations team. Waiver tracking moved entirely off paper. Customer history is now searchable and attached to every booking.

The CRM launched alongside the public website and handled over 100 bookings and 130 waivers in its first 4 months in production.`,
            },
        ],
    },
    {
        slug: "tourstodopr",
        title: "Tours ToDo PR",
        titleLabelWords: 0,
        metaTitle: "ToursToDo PR Case Study — Custom CRM & Email Automation | URAWAKE",
        metaDescription: "How URAWAKE replaced Freshworks with a custom CRM for a Puerto Rico adventure tour operator — automated bookings, drip sequences, affiliate portal, and 8 integrations in one system.",
        subtitle: "From Freshworks dependency and manual Gmail replies to a fully custom CRM with automated flows, campaign engine, and affiliate portal",
        industry: "Adventure Tourism",
        location: "Puerto Rico",
        duration: "In progress — CRM in production",
        liveUrl: "https://tourstodopr.com",
        stack: ["React 18", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "SendGrid", "Gmail IMAP", "FareHarbor", "Stripe", "Google Gemini", "Bokun", "JWT", "Render", "Netlify"],
        sections: [
            {
                heading: "The client",
                body: `ToursToDo PR is an adventure tourism operator in Puerto Rico offering hiking, kayak, snorkel, ATV, horseback riding, city tours, and more. They run a high volume of bookings through FareHarbor and had built their customer operations on top of Freshworks and manual Gmail.

The business was growing. The tooling underneath it was expensive, fragmented, and required a person to read and respond to every single email by hand.`,
            },
            {
                heading: "The problem",
                body: `Every booking confirmation from FareHarbor arrived as an email. Every customer follow-up went out manually from Gmail. There was no centralized view of leads, customers, or subscribers as distinct groups. No automation. No drip sequences. No way to run a campaign without exporting a list and sending one by one.

Freshworks handled the CRM layer but at a recurring monthly cost, with no customization for how a tour operator actually works, and no integration with the tools already in use.

The team spent significant time every day doing work that should have been automatic.`,
            },
            {
                heading: "What we built",
                body: `We built a full CRM from scratch, designed around how ToursToDo PR actually operates.

The system separates contacts into three independent cohorts: leads, customers, and subscribers, each with their own segmentation logic. A campaign engine lets the team build and send emails to any dynamic audience segment, with open and click tracking via pixel. A Flow Engine handles drip automation with configurable triggers: days before a tour, days after a tour, days after enrollment. Every pre and post-tour communication now runs without human intervention.

The inbox is synced via Gmail IMAP, centralizing all incoming client communication in one place. Emails are composed and refined with Google Gemini. Digital waivers are generated as PDFs with electronic signature. An affiliate portal gives partners a self-serve dashboard to track clicks and commissions without any manual reporting.

Bookings arrive via FareHarbor webhook and email parsing. Leads flow in from WordPress forms and Meta ads. Everything lives in one system with 32 data models and 8 external integrations.`,
            },
            {
                heading: "The results",
                body: `The monthly Freshworks cost is gone, replaced entirely by a system built for this specific business.

Zero manual emails go out for booking sequences. The Flow Engine handles every pre-tour and post-tour communication automatically. Three independent audience cohorts with dynamic segmentation give the team control over campaigns that did not exist before.

Eight external systems, FareHarbor, SendGrid, Gmail, Stripe, WordPress, Meta, Google Gemini, and Bokun, are consolidated into a single interface. The affiliate program runs itself. Waivers are signed digitally and stored as PDFs.

The web migration from WordPress to React is in active development. The CRM is already in production.`,
            },
        ],
    },
];

export default CASE_STUDIES;
