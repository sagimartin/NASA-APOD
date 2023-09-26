import { useState, useEffect } from "react";

export default function Gallery() {
    const [apodList, setApodList] = useState([]);

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

    return (
        <div className="gallery-container">
            <div className="gallery">
                {apodList.map((apodData, index) => (
                    <div className="image-container" key={index}>
                        <img
                            alt={apodData.title}
                            className="gallery-image"
                            src={apodData.url}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}