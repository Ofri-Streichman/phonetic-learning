import React, { useState } from 'react';
import Card from "../components/Practice-card"
import phonetic_alphabet from "../phonetic_alphabet.json";


function Practice() {
    let alphabet = phonetic_alphabet.dictionary;
    const [current, setCurrent] = useState(randLetter());
    const [score, setScore] = useState(0);
    const [visualQue, setVisualQue] = useState('waiting'); // 'waiting', 'correct' or 'incorrect'
    const [text, setText] = useState(current.letter);

    function randLetter() {
        return alphabet[~~(Math.random() * alphabet.length)]
    }

    async function checkInput(userInput) {
        console.log(userInput);
        console.log(current.word);

        if (userInput.toLowerCase() === current.word.toLowerCase()) {
            setVisualQue('correct');
            setScore(score + 10);
        } else {
            setVisualQue('incorrect');
        }
        setText(current.word)
        await new Promise(r => setTimeout(r, 700));
        newRound();
    }

    async function newRound() {
        let randLetter = alphabet[~~(Math.random() * alphabet.length)]
        setVisualQue('waiting')
        setCurrent(randLetter)
        setText(randLetter.letter)
    }


    return (
        <div id="practice-page" className="page">
            <h1>Practice What You Learned</h1>
            <h2>Your Score: {score}</h2>
            <div className='card-container'>
                <Card text={text} visualQue={visualQue} checkInput={checkInput} />
            </div>
        </div>
    )
}

export default Practice;