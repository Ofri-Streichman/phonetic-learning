import React from 'react';

const HomePage = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const getRandomValue = () => (Math.random() - 0.5) * 100;
    const getRandomFraction = () => Math.random();
    const getRandomDegree = () => (Math.random() - 0.5) * 180;

    const randCircle = () => {
        if (Math.random()<0.5){
            return (Math.random()*20+10)
        }
        return (Math.random() * 20 + 70)
    }

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
                    <span key={index} style={{ '--x': getRandomValue(), '--y': getRandomValue(), '--init-x': getRandomCoordinates(), '--init-y': getRandomCoordinates(), '--turnDegree': getRandomDegree() }}>
                        {letter}
                    </span>
                ))}
            </div>
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Phonetic Alphabet Mastery</h1>
                    <p>Unlock the power of clear communication with letter-word pairs!</p>
                    <p>Discover the art of precise communication through the phonetic alphabet - an essential tool used across various industries.</p>
                    <button className="start-button-home"><a href="/study">Let's Start</a></button>
                    
                </div>
            </div>
            
        </div>
    );
};

export default HomePage;
