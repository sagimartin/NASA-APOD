import { useState, useEffect } from "react"

import "../styles/PictureOfTheDay.scss";

export default function PictureOfTheDay() {
    const [API_DATE, setAPI_DATE] = useState(new Date().toISOString().split("T"[0]))
    const [apodData, setApodData] = useState({
        date: "",
        title: "",
        url: "",
        explanation: ""
    });

    // Oldest date for picker
    const oldestDate = new Date("1995-06-16");
    const formattedOldestDate = `${oldestDate.getFullYear()}-${String(oldestDate.getMonth() + 1).padStart(2, '0')}-${String(oldestDate.getDate()).padStart(2, '0')}`;


    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    useEffect(() => {
        updateApodContent()
    }, [])

    // REFRESH APOD DATA
    const updateApodContent = async () => {
        const inputDate = document.querySelector("#dateInput").value;
        setAPI_DATE(inputDate);

        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${inputDate}`
        );
        const apodData = await response.json();
        setApodData({
            date: apodData.date,
            title: apodData.title,
            url: apodData.url,
            explanation: apodData.explanation || "No explanation available."
        });
    };

    return (
        <div className="POD-container">
            <section className="main-section">
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
                    <img src={apodData.url} alt={apodData.title} />
                )}
                <div className="explanation">
                    <h1>{apodData.date} // {apodData.title}</h1>
                    <p>{apodData.explanation}</p>
                </div>
            </section>
            <div className="date-picker">
                <h2>Discover the past</h2>
                <input
                    type="date"
                    id="dateInput"
                    value={API_DATE}
                    min={formattedOldestDate}
                    onChange={updateApodContent}
                />
            </div>
        </div>
    );
}