import "../styles/Modal.scss";

export default function Modal({ apodData, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-close" onClick={onClose}>&times;</div>
                {apodData.url.includes("youtube.com") ? (
                    // YouTube link? --> video
                    <iframe
                        title={apodData.title}
                        src={apodData.url.replace("watch?v=", "embed/")}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                ) : (
                    // IMG
                    <img
                        alt={apodData.title}
                        className="gallery-image"
                        src={apodData.url}
                    />
                )}
                <div className="title">
                    <h2>{apodData.title}</h2>
                    <h2>{apodData.date}</h2>
                </div>
                <div className="modal-explanation">
                    <p>{apodData.explanation}</p>
                </div>
            </div>
        </div>
    );
}
