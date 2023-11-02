import React, { useEffect } from 'react';

const HomePage = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    useEffect(() => {
        const floatingLetters = document.querySelectorAll('.floating-letters span');

        const moveLetters = () => {
            floatingLetters.forEach(letter => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                letter.style.left = x + 'px';
                letter.style.top = y + 'px';
                moveElement(letter);
            });
        };

        const moveElement = (element) => {
            let stepX = Math.random() - 0.4;
            let stepY = Math.random() - 0.4;

            let x = parseFloat(element.style.left);
            let y = parseFloat(element.style.top);

            const maxX = window.innerWidth - element.clientWidth - document.getElementById("sidebar").clientWidth;
            const maxY = window.innerHeight - element.clientHeight - document.getElementById("sidebar").clientHeight;

            console.log("document.getElementById('sidebar').clientWidth ", document.getElementById("sidebar").clientWidth)
            const minX = document.getElementById("sidebar").clientWidth;
            const minY = document.getElementById("sidebar").clientWidth;

            const move = () => {
                x += stepX;
                y += stepY;

                if (x < minX || x > maxX) {
                    stepX *= -1;
                }
                if (y < minY || y > maxY) {
                    stepY *= -1;
                }

                element.style.left = x + 'px';
                element.style.top = y + 'px';

                requestAnimationFrame(move);
            };
            move();
        };

        moveLetters();

        return () => {
            // Cleanup
            floatingLetters.forEach(letter => {
                cancelAnimationFrame(moveElement);
            });
        };
    }, []);

    return (
        <div className="page">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Phonetic Alphabet Mastery</h1>
                    <p>Unlock the power of clear communication with letter-word pairs!</p>
                    <p>Discover the art of precise communication through the phonetic alphabet - an essential tool used across various industries.</p>
                    <a className="start-button-home" href='/study'>Let's Start</a>
                    <div className="floating-letters">
                        {letters.split('').map((letter, index) => (
                            <span key={index}>
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
