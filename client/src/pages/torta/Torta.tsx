import { useState } from "react";
import Header from "../../components/ui/HeaderComponent";
import Boton from "../../components/ui/ButtonComponent";
import NavBar from "../../components/ui/Navbar";
import "./Torta.css";
import HeartIcon from "/icons/heart.svg";
import SearchIcon from "/icons/search.svg";
import HomeIcon from "/icons/house.svg";
import UserRoundIcon from "/icons/user-round.svg";
import { parse, isValid } from "date-fns";

export default function Torta() {
    const [selectedMeat, setSelectedMeat] = useState<string>("Asada");
    const [selectedDays, setSelectedDays] = useState<string[]>(["M"]);
    const [timeRange, setTimeRange] = useState("08:30 - 16:00");
    const [isLiked, setIsLiked] = useState(false);

    const days = [
        { label: "L", value: "L" },
        { label: "M", value: "M" },
        { label: "X", value: "X" },
        { label: "J", value: "J" },
        { label: "V", value: "V" },
    ];

    const handleDayClick = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [startTime, endTime] = e.target.value.split(" - ");
        const isStartValid = isValid(parse(startTime, "HH:mm", new Date()));
        const isEndValid = isValid(parse(endTime, "HH:mm", new Date()));
        if (isStartValid && isEndValid) setTimeRange(e.target.value);
    };

    return (
        <div className="torta-container">
            <Header text="Hola ¿Qué compraras hoy?" />
            <div className="header-bar-overlap">
                <div className="header-actions">
                    <button className="sell-button">Vender</button>
                    <div className="search-box">
                        <input type="text" placeholder="Buscar" />
                        <img src={SearchIcon} alt="Search" />
                    </div>
                </div>
            </div>

            <div className="main-content">
                <img
                    className="product-image"
                    src="https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg"
                    alt="Torta"
                />
                <div className="product-info">
                    <div className="product-header">
                        <h2>Torta</h2>
                        <img
                            src={HeartIcon}
                            alt="Heart"
                            className={`heart-icon ${isLiked ? "liked" : ""}`}
                            onClick={() => setIsLiked(!isLiked)}
                        />
                    </div>

                    <p className="product-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices,
                        lorem ut dictum faucibus, tortor neque cursus arcu, at scelerisque
                        libero justo ut urna.
                    </p>

                    <div className="tags">
                        {["Jamón", "Asada", "Chorizo"].map((meat) => (
                            <span
                                key={meat}
                                className={`meat-tag ${selectedMeat === meat ? "selected" : ""}`}
                                onClick={() => setSelectedMeat(meat)}
                            >
                                {meat}
                            </span>
                        ))}
                    </div>

                    <div className="availability-box">
                        <span className="availability-title">Horario de disponibilidad</span>
                        <div className="availability-days">
                            {days.map((day) => (
                                <button
                                    key={day.value}
                                    className={`day-button ${selectedDays.includes(day.value) ? "active" : ""
                                        }`}
                                    onClick={() => handleDayClick(day.value)}
                                >
                                    {day.label}
                                </button>
                            ))}
                        </div>
                        <div className="availability-info">
                            <input
                                type="text"
                                value={timeRange}
                                onChange={handleTimeChange}
                                placeholder="HH:mm - HH:mm"
                                className="time-input"
                            />
                        </div>
                    </div>

                    <div className="price-contact">
                        <span className="price">$45</span>
                        <div className="button-wrapper">
                            <Boton 
                           
                            color="green"
                            text="Contactar con el vendedor" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-icons">
                <img src={HomeIcon} alt="Home" />
                <img src={HeartIcon} alt="Favorites" />
                <img src={UserRoundIcon} alt="User" />
            </div>

            <NavBar />
        </div>
    );
}
