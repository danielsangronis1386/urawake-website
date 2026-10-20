// One private testimonial link per client: urawake.dev/testimonial/<slug>.
// The server only accepts submissions for slugs listed here, so a link works
// as the client's invitation. Add a client, push, and send them the URL.
const TESTIMONIAL_INVITES = {
    "eliots-adventures": {
        client: "Eliot's Adventures",
        project: "your website and booking CRM",
    },
    "tourstodo": {
        client: "ToursToDo PR",
        project: "your website and CRM",
    },
};

export default TESTIMONIAL_INVITES;
