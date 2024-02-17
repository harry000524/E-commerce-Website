import './About.css'
import image from '../../assets/laspatatas.jpg'
const About = () => {
    return (
        //////////////////////////// ABOUT PAGE
        <div className="about" id='about'>
            {/********************** ABOUT CONTAINER */}
            <div className="about-container">
            {/********************** ABOUT US */}
                <div className="about-us">
                    <h1>About Us</h1>
                    <p>D&J Diner is a family-owned restaurant that serves delicious home-style meals. We believe that eating is not just about sustenance, but also about creating memories. Our menu features classic comfort foods made with fresh ingredients and a warm, welcoming atmosphere. Join us for a satisfying meal and a taste of tradition.</p>
                </div>
        {/********************** ABOUT IMAGE */}
                <div className="img">
                    <img src={image} alt="" />
                </div>
        {/********************** ABOUT HISTORY */}
                <div className="history">
                    <h1>History</h1>
                    <p>Unnie Corndog & Lemon Rhyme started in April 18, 2022 and created a Facebook page on March 16th. We gained a following through word of mouth and social media and eventually relocated to a larger area and changed the name to D&J Diner on October 3, 2022, adding new menu items. We are grateful for the growth of our business and aim to continue improving.</p>
                </div>
            </div>
        </div>
    );
}
 
export default About;