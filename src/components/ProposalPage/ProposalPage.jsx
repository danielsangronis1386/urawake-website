import { useParams } from "react-router-dom";
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

    return <ProposalComponent />;
}

export default ProposalPage;
