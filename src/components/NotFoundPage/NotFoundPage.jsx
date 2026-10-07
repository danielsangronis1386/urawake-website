import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./NotFoundPage.css";

function NotFoundPage() {

    return (
        <>
            <Navbar />
            <main className="notfound-page">
                <p className="notfound-code mono">// 404</p>
                <h1 className="notfound-title">PAGE<br />NOT<br />FOUND</h1>
                <p className="notfound-sub">
                    That URL doesn't lead anywhere. Here's what does:
                </p>
                <nav className="notfound-links">
                    <Link to="/">Home</Link>
                    <Link to="/#projects">Projects</Link>
                    <Link to="/why-us">Why Us</Link>
                    <Link to="/team">Team</Link>
                    <Link to="/#contact">Contact</Link>
                </nav>
            </main>
            <Footer />
        </>
    );
}

export default NotFoundPage;
