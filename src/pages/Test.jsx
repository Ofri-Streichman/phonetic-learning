import React, { useState } from 'react';
import Card from "../components/Test-card";
import shortid, { generate } from 'shortid';


function Test(props) {
    let alphabet = props.alphabet;
    const shuffled = alphabet.sort(() => 0.5 - Math.random());

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
            setScore(score+10);
        } else {
            setVisualQue('incorrect');
        }
        setText(current.word)
        await new Promise(r => setTimeout(r, 1000));
        newRound();
    }

    async function newRound(){
        let randLetter = alphabet[~~(Math.random() * alphabet.length)]
        setVisualQue('waiting')
        setCurrent(randLetter)
        setText(randLetter.letter)
    }


    return (
        <div id="test-page">
            <h1>Test Yourself</h1>
            <div className="study-container">
                {shuffled.map((x) => <Card key={shortid.generate()} letter={x.letter} word={x.word} />)}
            </div>
        </div>
    )
}

export default Test;