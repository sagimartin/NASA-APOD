import { useState, useEffect } from "react"

export default function PictureOfTheDay() {
    const [API_DATE, setAPI_DATE] = useState(new Date().toISOString().split("T"[0]))
    const [apodData, setApodData] = useState({
        title: "",
        url: "",
        explanation: ""
    });

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
                    <h1>{apodData.title}</h1>
                    <p>{apodData.explanation}</p>
                </div>
            </section>
            <div className="date-picker">
                <h2>OR simply choose a date</h2>
                <input
                    type="date"
                    id="dateInput"
                    value={API_DATE}
                    onChange={updateApodContent}
                />
            </div>
        </div>
    );
}