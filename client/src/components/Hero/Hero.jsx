import "./Hero.css";
import image from "../../assets/quezzomozzaclassic.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        //////////////////////////// HERO PAGE
        <div className="hero" id="home">
            {/************************* HERO CONTAINER */}
            <div className="hero-container">
                {/************************* HERO CONTENT */}
                <div className="hero-content">
                    <h1>Discover the joy of Eating at D&J Diner</h1>
                    <i>
                        Welcome to D&J Diner, where every meal is a celebration
                        of comforting and satisfying flavors. Our menu is filled
                        with classic dishes made with love and the freshest
                        ingredients. Whether you're in the mood for a hearty
                        breakfast, a delicious lunch, or a comforting dinner, we
                        have something for everyone. So sit back, relax, and let
                        us take care of the cooking. We look forward to serving
                        you!
                    </i>
                    <Link to="/products" className="btn">
                        Explore Menu
                    </Link>
                </div>
                {/************************* HERO IMAGE */}
                <div className="hero-img">
                    <img src={image} alt="mozzaclassic" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
