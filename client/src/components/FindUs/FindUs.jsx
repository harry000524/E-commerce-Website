import "./FindUs.css";
import image from "../../assets/open.png";

const FindUs = () => {
    return (
        <div className="findus" id="findus">
            <div className="findus-container">
                <div className="fndus-content">
                    <h1>Find Us</h1>
                    <p>P-3 , Jose Panganiban, Philippines, 4606</p>
                    <h3>Open Hours</h3>
                    <p>Mon - Sun : 8:00 am - 8:00 pm</p>
                    <h3>Happy Hours</h3>
                    <p>Tue - Sun: 8:00 pm - 2:00 am</p>
                </div>
                <div className="findus-img">
                    <img src={image} alt="img" />
                </div>
            </div>
        </div>
    );
};

export default FindUs;
