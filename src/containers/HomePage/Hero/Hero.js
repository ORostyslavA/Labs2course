import "./Hero.css";
import heroImage from "../../../components/images/header_photo.png";

function Hero() {
    return(
        <div className = "hero">
            <img className="hero_image" src={heroImage} alt="vouchers"/>
            <div className="hero_content">
                <h1>
                    Heading
                </h1>
                <p>
                    Discover Your Next Adventure: Find and Book the Perfect Vacation
                    Destination for an Unforgettable Journey!
                </p>
            </div>
        </div>
    )
};

export default Hero;