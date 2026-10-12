// One source for the homepage FAQ and its FAQPage schema, so the answers a
// visitor reads and the answers Google is handed can never drift apart.
// Every answer here is backed by the estimator, a case study, or Why Us.
const FAQ = [
    {
        q: "How much does a website cost?",
        a: "It depends on what it has to do. Landing pages start around $350, business websites around $700, and CRMs or custom booking systems around $1,800. The estimator below gives you a ballpark range in five questions. The final quote comes after a quick call.",
    },
    {
        q: "How long does it take?",
        a: "A landing page or small business site can be done within a month. Bigger builds take longer: the Eliot's Adventures website and CRM took four months, and the ToursToDo website took about three.",
    },
    {
        q: "Do you keep working on it after launch?",
        a: "Yes. We still maintain the systems we built for both of our current clients. A website nobody touches eventually breaks, and we'd rather not let that happen to something we built.",
    },
    {
        q: "Can it connect to the tools I already use?",
        a: "Yes. Our builds take payments through Stripe, send email through SendGrid and Gmail, and connect to booking platforms like FareHarbor and Bokun. One of them turns Airbnb and Viator confirmation emails into bookings automatically, so nothing has to be copied by hand.",
    },
    {
        q: "Do you only work with tourism businesses?",
        a: "No. Our first clients happen to be in tourism, but we build for any small business: shops, services, studios. Online stores, booking systems, customer lists and email campaigns work the same way whatever you sell.",
    },
    {
        q: "Do you work with clients outside Los Angeles?",
        a: "Yes, across the US and internationally. We're based in Los Angeles, both of our current clients are in Puerto Rico, and the whole project runs remotely over calls and email, in English or Spanish.",
    },
];

export function faqSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
        })),
    };
}

export default FAQ;
