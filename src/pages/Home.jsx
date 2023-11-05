import React, {useState, useEffect} from 'react';

const HomePage = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const getRandomValue = () => (Math.random() - 0.5) * 100;
    const getRandomFraction = () => Math.random();
    const getRandomDegree = () => (Math.random() - 0.5) * 180;

    // const [deviceType, setDeviceType] = useState("");

    // useEffect(() => {
    //     if (
    //         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
    //             navigator.userAgent
    //         )
    //     ) {
    //         setDeviceType("Mobile");
    //         Array.from(document.getElementsByClassName("floating-letter")).forEach((el) => {
    //             el.style.animation = 'float 10s infinite linear';
    //         });

    //     } else {
    //         setDeviceType("Desktop");
    //     }
    // }, []);


    function getRandomCoordinates() {
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const innerRadius = 40; // Inner radius of the ring
        const outerRadius = 50; // Outer radius of the ring

        // Generate coordinates for a ring
        const x = Math.cos(angle) * (innerRadius + Math.random() * (outerRadius - innerRadius));
        const y = Math.sin(angle) * (innerRadius + Math.random() * (outerRadius - innerRadius));

        // Adjust for rectangle positioning (100x100 size)
        const rectWidth = 100;
        const rectHeight = 100;

        const adjustedX = rectWidth / 2 + x;
        const adjustedY = rectHeight / 2 + y;

        return adjustedX;
    }

    return (
        <div className="home-page page">
            <div className="floating-letters">
                {letters.split('').map((letter, index) => (
                    <span key={index} style={{'--x': getRandomValue(), '--y': getRandomValue(), '--init-x': getRandomCoordinates(), '--init-y': getRandomCoordinates(), '--turnDegree': getRandomDegree() }}>
                        {letter}
                    </span>
                ))}
            </div>
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Phonetix!</h1>
                    <p>Discover the magic behind NATO's phonetic alphabet, transforming mundane letters into a symphony of words.</p>
                    <p>These aren't just letters; they're linguistic superheroes that add zest and clarity to communication.</p>
                    <button className="start-button-home"><a href="/study">Start Learning</a></button>

                </div>
            </div>

        </div>
    );
};

export default HomePage;
