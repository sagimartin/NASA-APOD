import { useState, useEffect } from "react";
import Modal from "./Modal";

import "../styles/Gallery.scss";

export default function Gallery() {
    const [apodList, setApodList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState({
        date: "",
        url: "",
        title: "",
        explanation: "",
    });

    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    const fetchRandomApodList = async () => {
        const randomDates = [];
        const currentDate = new Date();

        for (let i = 0; i < 6; i++) {
            const randomDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - Math.floor(Math.random() * 365)
            );

            if (randomDate < currentDate) {
                const formattedDate = randomDate.toISOString().split("T")[0];
                randomDates.push(formattedDate);
            }
        }

        const apodDataList = await Promise.all(
            randomDates.map(async (date) => {
                const response = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
                );
                return response.json();
            })
        );

        setApodList(apodDataList);
    };

    useEffect(() => {
        fetchRandomApodList();
    }, []);

    const openModal = (date, url, title, explanation) => {
        setSelectedImage({ date, url, title, explanation });
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
                    <div className="media-container" key={index} onClick={() => openModal(apodData.date, apodData.url, apodData.title, apodData.explanation)}>
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
                        <h3>{apodData.title}</h3>
                    </div>
                ))}
            </div>
            <button onClick={fetchRandomApodList}>
                REFRESH GALLERY
            </button>
            {showModal && (
                <Modal
                    apodData={selectedImage}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
