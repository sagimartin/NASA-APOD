import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function Gallery() {
    const [apodList, setApodList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState({
        url: "",
        title: "",
        explanation: "",
    });

    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    // Fetch APOD images from the past 9 days
    useEffect(() => {
        const fetchApodList = async () => {
            const currentDate = new Date();
            const previousDates = [];

            for (let i = 1; i <= 9; i++) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);
                previousDates.push(date.toISOString().split("T")[0]);
            }

            const apodDataList = await Promise.all(
                previousDates.map(async (date) => {
                    const response = await fetch(
                        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
                    );
                    return response.json();
                })
            );

            setApodList(apodDataList);
        };

        fetchApodList();
    }, []);

    const openModal = (url, title, explanation) => {
        setSelectedImage({ url, title, explanation });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="gallery-container">
            <div className="divider">GALLERY</div>
            <div className="gallery">
                {apodList.map((apodData, index) => (
                    <div className="media-container" key={index}>
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
                        <h3 onClick={() => openModal(apodData.url, apodData.title, apodData.explanation)}
                        >{apodData.title}</h3>
                    </div>
                ))}
            </div>
            {showModal && (
                <Modal
                    apodData={selectedImage}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
