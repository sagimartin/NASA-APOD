import "../styles/Footer.scss";
import arrow from "/arrow.svg"

export default function Footer() {
    const handleArrowClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="footer">
            <img className="arrow-button" src={arrow} alt="Back to home" onClick={handleArrowClick}
            />
            <div className="divider"></div>
            <h3>2023 // Made with the force <a href="https://www.sagimartin.com/">@sagimartin</a></h3>
        </div>
    )
}