import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import INVOICES from "./invoices";
import "./InvoicePage.css";

function InvoicePage() {
    const { slug } = useParams();
    const inv = INVOICES[slug];

    if (!inv) {
        return (
            <div className="invoice-not-found">
                <p>Invoice not found.</p>
            </div>
        );
    }

    return (
        <div className="invoice-page">
            <Navbar />
            <div className="invoice-container">

                {/* HEADER */}
                <header className="invoice-header">
                    <div className="invoice-from">
                        <p className="invoice-brand">{inv.from.name}</p>
                        <p className="invoice-from-detail mono">{inv.from.email}</p>
                        <p className="invoice-from-detail mono">{inv.from.web}</p>
                    </div>
                    <div className="invoice-meta">
                        <p className="invoice-number mono">{inv.invoiceNumber}</p>
                        <div className="invoice-meta-row">
                            <span className="invoice-meta-label">Issued</span>
                            <span className="invoice-meta-value">{inv.issued}</span>
                        </div>
                        <div className="invoice-meta-row">
                            <span className="invoice-meta-label">Due</span>
                            <span className="invoice-meta-value invoice-due">{inv.due}</span>
                        </div>
                    </div>
                </header>

                <div className="invoice-rule" />

                {/* BILL TO */}
                <div className="invoice-bill-to">
                    <p className="invoice-section-label mono">// Bill To</p>
                    <p className="invoice-client-name">{inv.client.name}</p>
                    <p className="invoice-client-contact">{inv.client.contact}</p>
                </div>

                <div className="invoice-rule" />

                {/* LINE ITEMS */}
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Period</th>
                            <th>Months</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inv.lineItems.map((item, i) => (
                            <tr key={i}>
                                <td className="invoice-item-num">{i + 1}</td>
                                <td data-label="Item"><p className="invoice-item-name">{item.description}</p></td>
                                <td data-label="Period" className="invoice-item-period">{item.period}</td>
                                <td data-label="Months">{item.months}</td>
                                <td data-label="Rate">${item.rate.toFixed(2)}/mo</td>
                                <td data-label="Total" className="invoice-amount">${item.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="invoice-rule" />

                {/* TOTAL */}
                <div className="invoice-total-row">
                    <span className="invoice-total-label">Total Due</span>
                    <span className="invoice-total-amount">${inv.total.toFixed(2)}</span>
                </div>

                <div className="invoice-rule" />

                {/* PAYMENT */}
                <div className="invoice-payment">
                    <p className="invoice-section-label mono">// Payment</p>
                    {inv.paymentLink && (
                        <a href={inv.paymentLink} target="_blank" rel="noopener noreferrer" className="invoice-pay-btn">
                            Pay ${inv.total.toFixed(2)} Now →
                        </a>
                    )}
                    <p className="invoice-payment-text">
                        Questions? Contact us at{" "}
                        <a href={`mailto:${inv.from.email}?subject=Invoice ${inv.invoiceNumber}`} className="invoice-email-link">
                            {inv.from.email}
                        </a>
                    </p>
                </div>

                {/* FOOTER */}
                <footer className="invoice-footer">
                    <p className="mono">// {inv.from.name} | {inv.from.web}</p>
                </footer>

            </div>
        </div>
    );
}

export default InvoicePage;
