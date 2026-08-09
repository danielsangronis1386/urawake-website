import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import CajamarcaProposal from "./CajamarcaProposal";
import "./ProposalPage.css";

const PROPOSALS = {
    cajamarca: CajamarcaProposal,
};

function ProposalPage() {
    const { slug } = useParams();
    const ProposalComponent = PROPOSALS[slug];

    if (!ProposalComponent) {
        return (
            <div className="proposal-not-found">
                <p>Proposal not found.</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <ProposalComponent />
        </>
    );
}

export default ProposalPage;
