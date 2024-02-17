import "./Gallery.css";
import React from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

import mozzaClassic from "../../assets/mozzaclassic.jpg";
import buffaloWings from "../../assets/BUFFALOWINGS.jpg";
import sisig from "../../assets/SISIG.jpg";
import spaghetti from "../../assets/SPAGHETTI2.jpg";
import mangoGraham from "../../assets/MANGO GRAHAM.jpg";
import taro from "../../assets/TARO.jpg";
import chicksilog from "../../assets/CHICKSILOG.jpg";
import wintermelon from "../../assets/WINTERMELON.jpg";

const Gallery = () => {
    const scrollRef = React.useRef(null);

    const images = [
        mozzaClassic,
        buffaloWings,
        sisig,
        spaghetti,
        mangoGraham,
        taro,
        chicksilog,
        wintermelon,
    ];

    const scroll = (direction) => {
        const { current } = scrollRef;

        if (direction === "left") {
            current.scrollLeft -= 300;
        } else {
            current.scrollLeft += 300;
        }
    };

    return (
        <div className="gallery" id="gallery">
            <div className="gallery-container">
                {/********************* GALLERY CONTENT */}
                <div className="content">
                    <h1>Photo Gallery</h1>
                    <p>
                        Get a taste of what's on the menu at D&J Diner with our
                        photo gallery. From our classic Mozza dish to the
                        irresistible Buffalo Wings, we have something for every
                        taste preference. Satisfy your cravings with our
                        signature Sisig, or enjoy the comforting flavors of our
                        homemade Spaghetti. Indulge in a sweet treat with our
                        Mango Graham or Taro drinks, or start your day with a
                        delicious Chicksilog or Wintermelon. Every dish is
                        prepared with care and made from the freshest
                        ingredients. Browse our gallery and see for yourself why
                        D&J Diner is a popular dining destination.
                    </p>
                </div>
                {/********************* GALLERY IMAGES */}
                <div className="gallery-images">
                    <div className="galley-images-container" ref={scrollRef}>
                        {images.map((image, index) => {
                            return (
                                <div
                                    className="images-gallery-card"
                                    key={`gallery-image-${index + 1}`}
                                >
                                    <img src={image} alt="gallery" />
                                </div>
                            );
                        })}
                    </div>
                    {/********************* GALLERY ARROWS */}
                    <div className="gallery-images-arrows">
                        <BsArrowLeftShort
                            className="gallery-arrow-icon"
                            onClick={() => scroll("left")}
                        />
                        <BsArrowRightShort
                            className="gallery-arrow-icon"
                            onClick={() => scroll("right")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
