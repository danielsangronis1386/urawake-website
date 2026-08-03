import { useState } from "react";
import logo1 from "../../assets/logosprop/Cajamarca.png";
import logo2 from "../../assets/logosprop/cajamarca logo 2.png";
import "./ProposalPage.css";

function CajamarcaProposal() {
    const [lightbox, setLightbox] = useState(null);
    return (
        <div className="proposal-page">

            {lightbox && (
                <div className="proposal-lightbox" onClick={() => setLightbox(null)}>
                    <button className="proposal-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                    <img src={lightbox} alt="Logo expanded" className="proposal-lightbox-img" onClick={e => e.stopPropagation()} />
                </div>
            )}

            {/* HEADER */}
            <header className="proposal-header">
                <div className="proposal-header-inner">
                    <p className="proposal-from mono">// Prepared by URAWAKE Stackhouse</p>
                    <h1 className="proposal-brand">CAJAMARCA.COM</h1>
                    <p className="proposal-heading-sub">Brand Identity Proposal — Two Creative Directions</p>
                </div>
            </header>

            {/* INTRO */}
            <section className="proposal-intro">
                <div className="proposal-container">
                    <p className="proposal-eyebrow mono">// Creative Brief</p>
                    <p className="proposal-intro-text">
                        The following two concepts represent distinct creative directions for the Cajamarca brand identity.
                        Each is built around a clear visual language, a defined tone, and a specific audience relationship.
                        Review both directions and share which resonates most with your vision.
                    </p>
                </div>
            </section>

            {/* DIVIDER */}
            <div className="proposal-rule" />

            {/* PROPOSAL 01 */}
            <section className="proposal-concept">
                <div className="proposal-container">
                    <div className="proposal-concept-header">
                        <span className="proposal-number">01</span>
                        <div>
                            <h2 className="proposal-concept-title">The Festival Sunset Badge</h2>
                            <p className="proposal-concept-subtitle">Approachable · Energetic · Festive · Traveler-Friendly</p>
                        </div>
                    </div>

                    <div className="proposal-concept-body">
                        <div className="proposal-logo-display proposal-logo-display--warm">
                            <img src={logo1} alt="Cajamarca — The Festival Sunset Badge" className="proposal-logo-img proposal-logo-clickable" onClick={() => setLightbox(logo1)} />
                        </div>

                        <div className="proposal-concept-details">
                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Form</p>
                                <p className="proposal-detail-text">
                                    A circular badge format built for versatility. Works on merchandise,
                                    signage, digital platforms, and print with equal impact.
                                </p>
                            </div>

                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Color System</p>
                                <div className="proposal-color-strip">
                                    <div className="proposal-swatch" style={{ background: "#F5A623" }}>
                                        <span>Fiesta Gold</span>
                                    </div>
                                    <div className="proposal-swatch" style={{ background: "#C0392B" }}>
                                        <span>Vivid Crimson</span>
                                    </div>
                                    <div className="proposal-swatch" style={{ background: "#00C9D4" }}>
                                        <span>Electric Cyan</span>
                                    </div>
                                </div>
                            </div>

                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Visual Language</p>
                                <p className="proposal-detail-text">
                                    Horizontal color stripes referencing festival flags and Peruvian textiles.
                                    A mountain range silhouette grounds the mark in the Cajamarca landscape.
                                    A mascot with sunglasses brings energy and character — approachable, confident, iconic.
                                </p>
                            </div>

                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Typography</p>
                                <p className="proposal-detail-text">
                                    Bold, playful script lettering. Communicates warmth and celebration
                                    without sacrificing readability at small sizes.
                                </p>
                            </div>

                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Best For</p>
                                <p className="proposal-detail-text">
                                    Tourism platforms, travel apps, merchandise, and audiences
                                    who value personality and cultural connection.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="proposal-rule" />

            {/* PROPOSAL 02 */}
            <section className="proposal-concept">
                <div className="proposal-container">
                    <div className="proposal-concept-header">
                        <span className="proposal-number">02</span>
                        <div>
                            <h2 className="proposal-concept-title">The Modern Monochrome Emblem</h2>
                            <p className="proposal-concept-subtitle">Modern · Elite · Minimalist · Professional</p>
                        </div>
                    </div>

                    <div className="proposal-concept-body">
                        <div className="proposal-logo-display proposal-logo-display--dark">
                            <img src={logo2} alt="Cajamarca — The Modern Monochrome Emblem" className="proposal-logo-img proposal-logo-clickable" onClick={() => setLightbox(logo2)} />
                        </div>

                        <div className="proposal-concept-details">
                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Form</p>
                                <p className="proposal-detail-text">
                                    A high-contrast dark circular emblem. Structured, geometric,
                                    built to read as premium across all applications.
                                </p>
                            </div>

                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Color System</p>
                                <div className="proposal-color-strip">
                                    <div className="proposal-swatch proposal-swatch--light" style={{ background: "#111111" }}>
                                        <span>Obsidian</span>
                                    </div>
                                    <div className="proposal-swatch proposal-swatch--light" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)" }}>
                                        <span style={{ color: "#111" }}>White</span>
                                    </div>
                                </div>
                            </div>

                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Visual Language</p>
                                <p className="proposal-detail-text">
                                    A sleek mascot silhouette rendered in white against dark — refined, not ornate.
                                    Heavy display lettering with tight tracking creates authority.
                                    Minimal detail ensures the mark scales cleanly from business card to billboard.
                                </p>
                            </div>

                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Typography</p>
                                <p className="proposal-detail-text">
                                    Heavy display type with strong geometric structure.
                                    Communicates confidence, modernity, and restraint.
                                </p>
                            </div>

                            <div className="proposal-detail-block">
                                <p className="proposal-detail-label mono">// Best For</p>
                                <p className="proposal-detail-text">
                                    Premium positioning, corporate partnerships, hospitality brands,
                                    and audiences who respond to authority and clean design.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="proposal-rule" />

            {/* FOOTER CTA */}
            <section className="proposal-footer-cta">
                <div className="proposal-container">
                    <p className="proposal-eyebrow mono">// Next Steps</p>
                    <h3 className="proposal-cta-title">Which direction speaks to your brand?</h3>
                    <p className="proposal-cta-text">
                        Select a direction or share feedback and we will refine it into a complete brand system:
                        color palette, typography guide, usage rules, and final file delivery.
                    </p>
                    <a
                        href="mailto:daniel.sangronis1386@gmail.com?subject=Cajamarca Brand Proposal — Feedback"
                        className="proposal-cta-btn"
                    >
                        // Send Feedback →
                    </a>
                </div>
            </section>

        </div>
    );
}

export default CajamarcaProposal;
